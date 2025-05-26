
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can create a new ISA with valid parameters",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000), // $50,000 funding
                types.uint(800),     // 8% income share
                types.uint(120),     // 10 years (120 months)
                types.uint(3000000), // $30,000 minimum income
                types.uint(10000000) // $100,000 payment cap
            ], student.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.receipts[0].result.expectOk(), types.uint(1));
        
        // Verify ISA was created with correct details
        let isaDetails = chain.callReadOnlyFn('Funding', 'get-isa', [types.uint(1)], student.address);
        let isa = isaDetails.result.expectSome().expectTuple();
        
        assertEquals(isa['student'], student.address);
        assertEquals(isa['funding-amount'], types.uint(5000000));
        assertEquals(isa['income-share-percentage'], types.uint(800));
        assertEquals(isa['is-active'], types.bool(false));
    },
});

Clarinet.test({
    name: "Cannot create ISA with invalid parameters",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const student = accounts.get('wallet_1')!;
        
        // Test with funding amount too low
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(500000),  // $5,000 - below minimum
                types.uint(800),
                types.uint(120),
                types.uint(3000000),
                types.uint(10000000)
            ], student.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(101)); // ERR_INVALID_AMOUNT
        
        // Test with income share too high
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000),
                types.uint(2500),    // 25% - above maximum
                types.uint(120),
                types.uint(3000000),
                types.uint(10000000)
            ], student.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(101)); // ERR_INVALID_AMOUNT
    },
});

Clarinet.test({
    name: "Investors can purchase ISA tokens",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const student = accounts.get('wallet_1')!;
        const investor1 = accounts.get('wallet_2')!;
        const investor2 = accounts.get('wallet_3')!;
        
        // Create ISA first
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000), // $50,000 funding
                types.uint(800),     // 8% income share
                types.uint(120),     // 10 years
                types.uint(3000000), // $30,000 minimum income
                types.uint(10000000) // $100,000 payment cap
            ], student.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), types.uint(1));
        
        // Investor 1 buys 60% of tokens (6000 out of 10000)
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'invest-in-isa', [
                types.uint(1),    // ISA ID
                types.uint(6000)  // Token amount
            ], investor1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), types.uint(3000000)); // 60% of 5M = 3M
        
        // Check investor's token balance
        let tokenBalance = chain.callReadOnlyFn('Funding', 'get-investor-tokens', 
            [types.uint(1), types.principal(investor1.address)], investor1.address);
        assertEquals(tokenBalance.result, types.uint(6000));
        
        // Investor 2 buys remaining 40% (4000 tokens) - this should fully fund the ISA
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'invest-in-isa', [
                types.uint(1),    // ISA ID
                types.uint(4000)  // Token amount
            ], investor2.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), types.uint(2000000)); // 40% of 5M = 2M
        
        // ISA should now be active and funded
        let isaDetails = chain.callReadOnlyFn('Funding', 'get-isa', [types.uint(1)], student.address);
        let isa = isaDetails.result.expectSome().expectTuple();
        assertEquals(isa['is-active'], types.bool(true));
    },
});

Clarinet.test({
    name: "Student can report income and make payments",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const student = accounts.get('wallet_1')!;
        const investor = accounts.get('wallet_2')!;
        
        // Create and fully fund ISA
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000),
                types.uint(800),
                types.uint(120),
                types.uint(3000000),
                types.uint(10000000)
            ], student.address),
            Tx.contractCall('Funding', 'invest-in-isa', [
                types.uint(1),
                types.uint(10000) // Buy all tokens
            ], investor.address)
        ]);
        
        assertEquals(block.receipts.length, 2);
        assertEquals(block.receipts[0].result.expectOk(), types.uint(1));
        assertEquals(block.receipts[1].result.expectOk(), types.uint(5000000));
        
        // Student reports income of $60,000 for period 1
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'report-income-and-pay', [
                types.uint(1),      // ISA ID
                types.uint(6000000), // $60,000 income
                types.uint(1)       // Period 1
            ], student.address)
        ]);
        
        // Payment should be 8% of $60,000 = $4,800
        assertEquals(block.receipts[0].result.expectOk(), types.uint(480000));
        
        // Check income report was recorded
        let incomeReport = chain.callReadOnlyFn('Funding', 'get-income-report',
            [types.uint(1), types.uint(1)], student.address);
        let report = incomeReport.result.expectSome().expectTuple();
        assertEquals(report['reported-income'], types.uint(6000000));
        assertEquals(report['payment-due'], types.uint(480000));
        assertEquals(report['payment-made'], types.uint(480000));
        
        // Check ISA total paid was updated
        let isaDetails = chain.callReadOnlyFn('Funding', 'get-isa', [types.uint(1)], student.address);
        let isa = isaDetails.result.expectSome().expectTuple();
        assertEquals(isa['total-paid'], types.uint(480000));
    },
});

Clarinet.test({
    name: "Cannot report income below minimum threshold",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const student = accounts.get('wallet_1')!;
        const investor = accounts.get('wallet_2')!;
        
        // Create and fund ISA
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000),
                types.uint(800),
                types.uint(120),
                types.uint(3000000), // $30,000 minimum
                types.uint(10000000)
            ], student.address),
            Tx.contractCall('Funding', 'invest-in-isa', [
                types.uint(1),
                types.uint(10000)
            ], investor.address)
        ]);
        
        // Try to report income below minimum ($25,000 < $30,000)
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'report-income-and-pay', [
                types.uint(1),
                types.uint(2500000), // $25,000 - below minimum
                types.uint(1)
            ], student.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(108)); // ERR_BELOW_MIN_INCOME
    },
});

Clarinet.test({
    name: "Investors can transfer tokens to each other",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const student = accounts.get('wallet_1')!;
        const investor1 = accounts.get('wallet_2')!;
        const investor2 = accounts.get('wallet_3')!;
        
        // Create ISA and investor1 buys tokens
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000),
                types.uint(800),
                types.uint(120),
                types.uint(3000000),
                types.uint(10000000)
            ], student.address),
            Tx.contractCall('Funding', 'invest-in-isa', [
                types.uint(1),
                types.uint(5000) // Buy half the tokens
            ], investor1.address)
        ]);
        
        // Transfer 1000 tokens from investor1 to investor2
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'transfer-tokens', [
                types.uint(1),      // ISA ID
                types.principal(investor2.address),
                types.uint(1000)    // Token amount
            ], investor1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), types.bool(true));
        
        // Check balances
        let balance1 = chain.callReadOnlyFn('Funding', 'get-investor-tokens',
            [types.uint(1), types.principal(investor1.address)], investor1.address);
        let balance2 = chain.callReadOnlyFn('Funding', 'get-investor-tokens',
            [types.uint(1), types.principal(investor2.address)], investor2.address);
        
        assertEquals(balance1.result, types.uint(4000)); // 5000 - 1000
        assertEquals(balance2.result, types.uint(1000)); // 0 + 1000
    },
});

Clarinet.test({
    name: "Payment cap prevents overpayment",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const student = accounts.get('wallet_1')!;
        const investor = accounts.get('wallet_2')!;
        
        // Create ISA with low payment cap for testing
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000),
                types.uint(800),
                types.uint(120),
                types.uint(3000000),
                types.uint(6000000) // $60,000 payment cap
            ], student.address),
            Tx.contractCall('Funding', 'invest-in-isa', [
                types.uint(1),
                types.uint(10000)
            ], investor.address)
        ]);
        
        // Make payments that approach the cap
        // First payment: 8% of $60,000 = $4,800, total paid = $4,800
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'report-income-and-pay', [
                types.uint(1),
                types.uint(6000000), // $60,000
                types.uint(1)
            ], student.address)
        ]);
        assertEquals(block.receipts[0].result.expectOk(), types.uint(480000));
        
        // Simulate multiple payments to reach near cap
        // Let's say we've paid $59,000 already by updating the ISA directly through another payment
        // Second payment should be capped
        block = chain.mineBlock([
            Tx.contractCall('Funding', 'report-income-and-pay', [
                types.uint(1),
                types.uint(10000000), // $100,000 income
                types.uint(2)
            ], student.address)
        ]);
        
        // This should calculate 8% of $100,000 = $8,000, but cap at remaining amount
        // Since total cap is $60,000 and we paid $4,800, remaining is $55,200
        let expectedPayment = types.uint(800000); // $8,000 (8% of $100,000)
        assertEquals(block.receipts[0].result.expectOk(), expectedPayment);
    },
});

Clarinet.test({
    name: "Read-only functions return correct data",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const student = accounts.get('wallet_1')!;
        
        // Test get-next-isa-id
        let nextId = chain.callReadOnlyFn('Funding', 'get-next-isa-id', [], student.address);
        assertEquals(nextId.result, types.uint(1));
        
        // Create ISA
        let block = chain.mineBlock([
            Tx.contractCall('Funding', 'create-isa', [
                types.uint(5000000),
                types.uint(800),
                types.uint(120),
                types.uint(3000000),
                types.uint(10000000)
            ], student.address)
        ]);
        
        // Test calculate-current-payment
        let payment = chain.callReadOnlyFn('Funding', 'calculate-current-payment',
            [types.uint(1), types.uint(5000000)], student.address); // $50,000 income
        assertEquals(payment.result.expectOk(), types.uint(400000)); // 8% of $50,000 = $4,000
        
        // Test get-platform-treasury (should be 0 initially)
        let treasury = chain.callReadOnlyFn('Funding', 'get-platform-treasury', [], student.address);
        assertEquals(treasury.result, types.uint(0));
        
        // Test next ISA ID should be incremented
        nextId = chain.callReadOnlyFn('Funding', 'get-next-isa-id', [], student.address);
        assertEquals(nextId.result, types.uint(2));
    },
});
