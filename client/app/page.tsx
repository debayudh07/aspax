"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  TrendingUp,
  Shield,
  Users,
  DollarSign,
  BookOpen,
  Zap,
  Lock,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hovering Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">EduToken</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#benefits" className="text-gray-300 hover:text-white transition-colors">
                Benefits
              </Link>
              <Link href="#investors" className="text-gray-300 hover:text-white transition-colors">
                For Investors
              </Link>
              <Link href="#students" className="text-gray-300 hover:text-white transition-colors">
                For Students
              </Link>
              <Button
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-6 py-2 text-sm font-semibold min-w-[120px]"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
                <Link href="#benefits" className="text-gray-300 hover:text-white transition-colors">
                  Benefits
                </Link>
                <Link href="#investors" className="text-gray-300 hover:text-white transition-colors">
                  For Investors
                </Link>
                <Link href="#students" className="text-gray-300 hover:text-white transition-colors">
                  For Students
                </Link>
                <Button
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black w-fit px-6 py-2 text-sm font-semibold min-w-[120px]"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-60 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-40 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-32 right-1/2 w-1 h-1 bg-blue-300 rounded-full animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Geometric Shapes */}
          <div
            className="absolute top-20 right-10 w-20 h-20 border border-blue-400/20 rotate-45 animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 border border-purple-400/20 rotate-12 animate-pulse"></div>
          <div
            className="absolute top-1/2 left-20 w-12 h-12 border border-green-400/20 rounded-full animate-ping"
            style={{ animationDelay: "3s" }}
          ></div>

          {/* Gradient Orbs */}
          <div
            className="absolute top-40 left-1/3 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-32 right-1/4 w-40 h-40 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>

          {/* Moving Lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
            <div
              className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-blue-900/30 text-blue-300 border-blue-400">
            Blockchain-Powered Education Funding
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Fund Your Education,
            <br />
            <span className="text-blue-400">Share Your Success</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Revolutionary tokenized Income-Share Agreements (ISAs) that connect students with investors. Get funded for
            your education and pay back a percentage of your future income through transparent blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold min-w-[200px] h-14"
            >
              Apply for Funding
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold min-w-[200px] h-14"
            >
              Become an Investor
              <TrendingUp className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Education Crisis</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional education funding is broken. Students face crushing debt while investors lack access to
              education opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-red-900/20 border-red-800">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <DollarSign className="mr-2 h-6 w-6" />
                  Student Debt Crisis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Average student debt: $37,000+</li>
                  <li>• 45 million borrowers affected</li>
                  <li>• Limited access to quality education</li>
                  <li>• High interest rates and rigid repayment</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/20 border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  Investment Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Education ROI: 10-15% annually</li>
                  <li>• Diversified human capital portfolio</li>
                  <li>• Social impact investing</li>
                  <li>• Transparent, liquid market needed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How EduToken Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our blockchain-powered platform creates a transparent, efficient marketplace for education funding
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-700 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle>1. Student Application</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Students apply with their academic profile, career goals, and funding needs. Our AI assesses potential
                  and creates personalized ISA terms.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle>2. ISA Tokenization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Approved ISAs are tokenized on blockchain, creating fractional ownership opportunities for investors
                  with full transparency and smart contract automation.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700 text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle>3. Automated Repayment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Smart contracts track graduate income and automatically distribute repayments to token holders
                  proportionally, ensuring fair and transparent returns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose EduToken?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-black border-gray-700 text-center">
              <CardHeader>
                <Shield className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-lg">Blockchain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Immutable smart contracts ensure transparent, secure, and automated transactions
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black border-gray-700 text-center">
              <CardHeader>
                <Lock className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-lg">Income Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Built-in income caps and minimum thresholds protect students from excessive payments
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black border-gray-700 text-center">
              <CardHeader>
                <TrendingUp className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-lg">Liquid Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Trade ISA tokens on secondary markets for portfolio flexibility and liquidity
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black border-gray-700 text-center">
              <CardHeader>
                <Users className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-lg">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Connect students with mentors and create lasting professional networks
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section id="students" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-900/30 text-green-300 border-green-400">For Students</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Focus on Learning,
                <br />
                Not Debt
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get the education you deserve without the crushing debt. Pay only when you succeed.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">No Upfront Costs</h4>
                    <p className="text-gray-300">Start your education immediately with zero tuition fees</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Income-Based Repayment</h4>
                    <p className="text-gray-300">Pay only a percentage of your income, capped at reasonable limits</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Career Support</h4>
                    <p className="text-gray-300">Access to mentorship and job placement assistance</p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg font-semibold min-w-[180px] h-14"
              >
                Apply for Funding
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Sample ISA Terms</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Funding Amount:</span>
                  <span className="font-semibold">$50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Income Share:</span>
                  <span className="font-semibold">8% for 10 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Minimum Income:</span>
                  <span className="font-semibold">$30,000/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Payment Cap:</span>
                  <span className="font-semibold">$100,000 total</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Protection:</span>
                    <span className="text-green-400">Built-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Investors */}
      <section id="investors" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Investment Opportunity</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">10-15%</div>
                  <div className="text-gray-300">Expected Annual Returns</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">$1,000</div>
                    <div className="text-sm text-gray-300">Minimum Investment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">24/7</div>
                    <div className="text-sm text-gray-300">Trading Available</div>
                  </div>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-400">Diversified Portfolio</div>
                    <div className="text-sm text-gray-300">Invest across multiple students and programs</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Badge className="mb-4 bg-blue-900/30 text-blue-300 border-blue-400">For Investors</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Invest in Human
                <br />
                Potential
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Generate returns while making a positive social impact. Diversify your portfolio with education-backed
                assets.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Transparent Returns</h4>
                    <p className="text-gray-300">Real-time tracking of student progress and income</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Liquid Marketplace</h4>
                    <p className="text-gray-300">Trade ISA tokens anytime on our secondary market</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Social Impact</h4>
                    <p className="text-gray-300">Fund the next generation while earning competitive returns</p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold min-w-[180px] h-14"
              >
                Start Investing
                <TrendingUp className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Education Funding?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students and investors already using EduToken to create a better future for education.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold min-w-[200px] h-14"
            >
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold min-w-[180px] h-14"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">EduToken</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing education funding through blockchain technology and tokenized ISAs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    For Students
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    For Investors
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduToken. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
