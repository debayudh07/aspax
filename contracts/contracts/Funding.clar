
;; EduToken Funding Contract
;; Blockchain-powered education funding through tokenized Income-Share Agreements (ISAs)

;; ===== CONSTANTS =====

;; Error codes
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_INVALID_AMOUNT (err u101))
(define-constant ERR_ISA_NOT_FOUND (err u102))
(define-constant ERR_ISA_ALREADY_EXISTS (err u103))
(define-constant ERR_INSUFFICIENT_BALANCE (err u104))
(define-constant ERR_INVALID_PERCENTAGE (err u105))
(define-constant ERR_PAYMENT_FAILED (err u106))
(define-constant ERR_ISA_COMPLETED (err u107))
(define-constant ERR_BELOW_MIN_INCOME (err u108))
(define-constant ERR_INVALID_DURATION (err u109))
(define-constant ERR_NOT_TOKEN_HOLDER (err u110))

;; Contract constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant PLATFORM_FEE_PERCENTAGE u300) ;; 3% platform fee (300 basis points)
(define-constant MIN_FUNDING_AMOUNT u1000000) ;; $10,000 in micro-STX
(define-constant MAX_FUNDING_AMOUNT u10000000) ;; $100,000 in micro-STX
(define-constant MIN_INCOME_SHARE u200) ;; 2% minimum income share (200 basis points)
(define-constant MAX_INCOME_SHARE u2000) ;; 20% maximum income share (2000 basis points)
(define-constant MIN_DURATION u12) ;; 12 months minimum
(define-constant MAX_DURATION u240) ;; 20 years maximum

;; ===== DATA STRUCTURES =====

;; ISA (Income-Share Agreement) structure
(define-map ISAs
  { isa-id: uint }
  {
    student: principal,
    funding-amount: uint,
    income-share-percentage: uint, ;; in basis points (100 = 1%)
    duration-months: uint,
    minimum-income-threshold: uint,
    payment-cap: uint,
    total-paid: uint,
    is-active: bool,
    created-at: uint,
    funded-at: (optional uint)
  }
)

;; Token ownership for ISA fractionalization
(define-map ISATokens
  { isa-id: uint, investor: principal }
  { tokens: uint }
)

;; Total tokens per ISA
(define-map ISATotalTokens
  { isa-id: uint }
  { total-tokens: uint, tokens-sold: uint }
)

;; Student income reports
(define-map IncomeReports
  { isa-id: uint, period: uint }
  { 
    reported-income: uint,
    payment-due: uint,
    payment-made: uint,
    reported-at: uint,
    verified: bool
  }
)

;; Platform treasury
(define-data-var platform-treasury uint u0)

;; ISA counter
(define-data-var next-isa-id uint u1)

;; ===== PRIVATE FUNCTIONS =====

;; Calculate payment based on income and ISA terms
(define-private (calculate-payment (income uint) (percentage uint) (payment-cap uint) (total-paid uint))
  (let ((raw-payment (/ (* income percentage) u10000)))
    (if (> (+ total-paid raw-payment) payment-cap)
        (- payment-cap total-paid)
        raw-payment
    )
  )
)

;; Distribute payment to token holders proportionally
(define-private (distribute-payment (isa-id uint) (payment-amount uint))
  (let (
    (isa-tokens (unwrap! (map-get? ISATotalTokens { isa-id: isa-id }) ERR_ISA_NOT_FOUND))
    (platform-fee (/ (* payment-amount PLATFORM_FEE_PERCENTAGE) u10000))
    (investor-amount (- payment-amount platform-fee))
  )
    ;; Add platform fee to treasury
    (var-set platform-treasury (+ (var-get platform-treasury) platform-fee))
    
    ;; Note: In a full implementation, we would iterate through all token holders
    ;; and distribute proportionally. For now, we'll use a simplified approach.
    (ok investor-amount)
  )
)

;; Validate ISA parameters
(define-private (validate-isa-params (amount uint) (percentage uint) (duration uint))
  (and
    (>= amount MIN_FUNDING_AMOUNT)
    (<= amount MAX_FUNDING_AMOUNT)
    (>= percentage MIN_INCOME_SHARE)
    (<= percentage MAX_INCOME_SHARE)
    (>= duration MIN_DURATION)
    (<= duration MAX_DURATION)
  )
)

;; ===== PUBLIC FUNCTIONS =====

;; Create a new ISA request
(define-public (create-isa 
  (funding-amount uint)
  (income-share-percentage uint)
  (duration-months uint)
  (minimum-income-threshold uint)
  (payment-cap uint)
)
  (let ((isa-id (var-get next-isa-id)))
    (asserts! (validate-isa-params funding-amount income-share-percentage duration-months) ERR_INVALID_AMOUNT)
    (asserts! (is-none (map-get? ISAs { isa-id: isa-id })) ERR_ISA_ALREADY_EXISTS)
    
    ;; Create the ISA
    (map-set ISAs
      { isa-id: isa-id }
      {
        student: tx-sender,
        funding-amount: funding-amount,
        income-share-percentage: income-share-percentage,
        duration-months: duration-months,
        minimum-income-threshold: minimum-income-threshold,
        payment-cap: payment-cap,
        total-paid: u0,
        is-active: false,
        created-at: block-height,
        funded-at: none
      }
    )
    
    ;; Initialize tokenization (10,000 tokens per ISA for easy fractionalization)
    (map-set ISATotalTokens
      { isa-id: isa-id }
      { total-tokens: u10000, tokens-sold: u0 }
    )
    
    ;; Increment ISA counter
    (var-set next-isa-id (+ isa-id u1))
    
    (ok isa-id)
  )
)

;; Invest in an ISA by purchasing tokens
(define-public (invest-in-isa (isa-id uint) (token-amount uint))
  (let (
    (isa (unwrap! (map-get? ISAs { isa-id: isa-id }) ERR_ISA_NOT_FOUND))
    (isa-tokens (unwrap! (map-get? ISATotalTokens { isa-id: isa-id }) ERR_ISA_NOT_FOUND))
    (investment-amount (/ (* (get funding-amount isa) token-amount) (get total-tokens isa-tokens)))
    (current-tokens (default-to u0 (get tokens (map-get? ISATokens { isa-id: isa-id, investor: tx-sender }))))
    (new-tokens-sold (+ (get tokens-sold isa-tokens) token-amount))
  )
    (asserts! (> token-amount u0) ERR_INVALID_AMOUNT)
    (asserts! (<= new-tokens-sold (get total-tokens isa-tokens)) ERR_INSUFFICIENT_BALANCE)
    
    ;; Transfer STX from investor
    (try! (stx-transfer? investment-amount tx-sender (as-contract tx-sender)))
    
    ;; Update investor's token holdings
    (map-set ISATokens
      { isa-id: isa-id, investor: tx-sender }
      { tokens: (+ current-tokens token-amount) }
    )
    
    ;; Update total tokens sold
    (map-set ISATotalTokens
      { isa-id: isa-id }
      { 
        total-tokens: (get total-tokens isa-tokens),
        tokens-sold: new-tokens-sold
      }
    )
    
    ;; If fully funded, activate the ISA and transfer funds to student
    (if (is-eq new-tokens-sold (get total-tokens isa-tokens))
      (begin
        (try! (as-contract (stx-transfer? (get funding-amount isa) tx-sender (get student isa))))
        (map-set ISAs
          { isa-id: isa-id }
          (merge isa { is-active: true, funded-at: (some block-height) })
        )
        (ok investment-amount)
      )
      (ok investment-amount)
    )
  )
)

;; Report income and make payment (called by student)
(define-public (report-income-and-pay (isa-id uint) (reported-income uint) (period uint))
  (let (
    (isa (unwrap! (map-get? ISAs { isa-id: isa-id }) ERR_ISA_NOT_FOUND))
    (payment-due (calculate-payment 
      reported-income 
      (get income-share-percentage isa)
      (get payment-cap isa)
      (get total-paid isa)
    ))
  )
    (asserts! (is-eq tx-sender (get student isa)) ERR_UNAUTHORIZED)
    (asserts! (get is-active isa) ERR_ISA_NOT_FOUND)
    (asserts! (>= reported-income (get minimum-income-threshold isa)) ERR_BELOW_MIN_INCOME)
    (asserts! (< (get total-paid isa) (get payment-cap isa)) ERR_ISA_COMPLETED)
    
    ;; Record the income report
    (map-set IncomeReports
      { isa-id: isa-id, period: period }
      {
        reported-income: reported-income,
        payment-due: payment-due,
        payment-made: u0,
        reported-at: block-height,
        verified: false
      }
    )
    
    ;; If there's a payment due, process it
    (if (> payment-due u0)
      (begin
        (try! (stx-transfer? payment-due tx-sender (as-contract tx-sender)))
        (try! (distribute-payment isa-id payment-due))
        
        ;; Update ISA with new total paid
        (map-set ISAs
          { isa-id: isa-id }
          (merge isa { total-paid: (+ (get total-paid isa) payment-due) })
        )
        
        ;; Update income report with payment made
        (map-set IncomeReports
          { isa-id: isa-id, period: period }
          {
            reported-income: reported-income,
            payment-due: payment-due,
            payment-made: payment-due,
            reported-at: block-height,
            verified: false
          }
        )
      )
      true
    )
    
    (ok payment-due)
  )
)

;; Transfer ISA tokens between investors
(define-public (transfer-tokens (isa-id uint) (recipient principal) (token-amount uint))
  (let (
    (sender-tokens (default-to u0 (get tokens (map-get? ISATokens { isa-id: isa-id, investor: tx-sender }))))
    (recipient-tokens (default-to u0 (get tokens (map-get? ISATokens { isa-id: isa-id, investor: recipient }))))
  )
    (asserts! (>= sender-tokens token-amount) ERR_INSUFFICIENT_BALANCE)
    (asserts! (> token-amount u0) ERR_INVALID_AMOUNT)
    
    ;; Update sender's tokens
    (if (is-eq sender-tokens token-amount)
      (map-delete ISATokens { isa-id: isa-id, investor: tx-sender })
      (map-set ISATokens
        { isa-id: isa-id, investor: tx-sender }
        { tokens: (- sender-tokens token-amount) }
      )
    )
    
    ;; Update recipient's tokens
    (map-set ISATokens
      { isa-id: isa-id, investor: recipient }
      { tokens: (+ recipient-tokens token-amount) }
    )
    
    (ok true)
  )
)

;; ===== READ-ONLY FUNCTIONS =====

;; Get ISA details
(define-read-only (get-isa (isa-id uint))
  (map-get? ISAs { isa-id: isa-id })
)

;; Get investor's token holdings for an ISA
(define-read-only (get-investor-tokens (isa-id uint) (investor principal))
  (default-to u0 (get tokens (map-get? ISATokens { isa-id: isa-id, investor: investor })))
)

;; Get ISA token information
(define-read-only (get-isa-tokens (isa-id uint))
  (map-get? ISATotalTokens { isa-id: isa-id })
)

;; Get income report for a specific period
(define-read-only (get-income-report (isa-id uint) (period uint))
  (map-get? IncomeReports { isa-id: isa-id, period: period })
)

;; Get platform treasury balance
(define-read-only (get-platform-treasury)
  (var-get platform-treasury)
)

;; Get next ISA ID
(define-read-only (get-next-isa-id)
  (var-get next-isa-id)
)

;; Calculate current payment due for an ISA
(define-read-only (calculate-current-payment (isa-id uint) (current-income uint))
  (match (map-get? ISAs { isa-id: isa-id })
    isa (ok (calculate-payment 
      current-income 
      (get income-share-percentage isa)
      (get payment-cap isa)
      (get total-paid isa)
    ))
    ERR_ISA_NOT_FOUND
  )
)
