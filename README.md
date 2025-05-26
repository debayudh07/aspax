# EduToken 🎓

**Blockchain-Powered Education Funding Platform**

EduToken revolutionizes education funding through tokenized Income-Share Agreements (ISAs) on the Stacks blockchain. Connect students with investors through transparent, secure, and automated smart contracts that create a fair education financing ecosystem.

## 🌟 Overview

Traditional education funding is broken. Students face crushing debt while investors lack access to education opportunities. EduToken solves this by creating a transparent marketplace where:

- **Students** get funded for education with no upfront costs
- **Investors** earn returns while making social impact
- **Smart contracts** automate fair, transparent repayment based on income

## 🚀 Key Features

### For Students
- **Zero Upfront Costs**: Start education immediately without tuition fees
- **Income-Based Repayment**: Pay only a percentage of income with built-in caps
- **Career Support**: Access to mentorship and job placement assistance
- **Protection Built-in**: Minimum income thresholds and payment caps

### For Investors
- **Expected Returns**: 10-15% annual returns on education investments
- **Liquid Marketplace**: Trade ISA tokens on secondary markets 24/7
- **Social Impact**: Fund the next generation while earning competitive returns
- **Transparent Tracking**: Real-time student progress and income monitoring

### Platform Benefits
- **Blockchain Security**: Immutable smart contracts ensure transparency
- **Automated Payments**: Smart contracts handle income tracking and distribution
- **Fractional Ownership**: Invest in portions of student ISAs
- **Community Driven**: Connect students with professional networks

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS, TypeScript
- **Blockchain**: Stacks blockchain with Clarity smart contracts
- **UI Components**: shadcn/ui with Radix primitives
- **Development**: Clarinet for contract development and testing

### Project Structure
```
├── client/                 # Next.js frontend application
│   ├── app/               # App router pages
│   ├── components/        # React components
│   └── lib/              # Utility functions
├── contracts/             # Stacks smart contracts
│   ├── contracts/        # Clarity contract files
│   ├── tests/           # Contract tests
│   └── settings/        # Network configurations
└── README.md             # Project documentation
```

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clarinet CLI for smart contract development

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Smart Contract Development
```bash
cd contracts
clarinet check      # Check contract syntax
clarinet test       # Run contract tests
clarinet console    # Interactive contract testing
```

### Available Scripts

**Frontend (client/)**
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Contracts (contracts/)**
- `clarinet check` - Validate contract syntax
- `clarinet test` - Execute contract tests
- `clarinet deploy` - Deploy contracts to network

## 📋 How It Works

### 1. Student Application
Students apply with academic profile, career goals, and funding needs. AI assessment creates personalized ISA terms.

### 2. ISA Tokenization  
Approved ISAs are tokenized on blockchain, creating fractional ownership opportunities with full transparency.

### 3. Automated Repayment
Smart contracts track graduate income and distribute repayments to token holders proportionally.

### Sample ISA Terms
- **Funding Amount**: $50,000
- **Income Share**: 8% for 10 years  
- **Minimum Income**: $30,000/year
- **Payment Cap**: $100,000 total
- **Protection**: Built-in income thresholds

## 🔒 Smart Contracts

The platform uses Clarity smart contracts on Stacks blockchain for:

- **ISA Creation**: Tokenizing income-share agreements
- **Payment Processing**: Automated income-based payments  
- **Token Management**: Fractional ownership and trading
- **Dispute Resolution**: Transparent conflict handling

## 🎯 Market Opportunity

- **$1.7T** - Total US student loan debt
- **45M** - Borrowers affected by student debt crisis
- **10-15%** - Expected annual returns on education investments
- **Growing** - Increasing demand for alternative education funding

## 🛣️ Roadmap

### Phase 1: MVP (Q2 2025)
- [ ] Core smart contracts deployment
- [ ] Basic frontend with ISA creation
- [ ] Investor onboarding flow
- [ ] Testnet deployment

### Phase 2: Platform Launch (Q3 2025)  
- [ ] Mainnet deployment
- [ ] Student application system
- [ ] Secondary market for ISA tokens
- [ ] Mobile app development

### Phase 3: Scale (Q4 2025)
- [ ] Institutional investor partnerships
- [ ] AI-powered risk assessment
- [ ] Multi-chain deployment
- [ ] Educational institution integrations

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable  
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use Clarity best practices for smart contracts
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [edutoken.app](https://edutoken.app) *(coming soon)*
- **Documentation**: [docs.edutoken.app](https://docs.edutoken.app) *(coming soon)*
- **Discord**: [Join our community](https://discord.gg/edutoken) *(coming soon)*
- **Twitter**: [@EduTokenApp](https://twitter.com/EduTokenApp) *(coming soon)*

## ⚠️ Disclaimer

This project is in active development. Smart contracts have not been audited. Use at your own risk. This is not financial advice.

---

**Building the future of education funding, one student at a time.** 🚀
