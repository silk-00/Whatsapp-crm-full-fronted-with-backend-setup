import { useNavigate } from 'react-router-dom';
import {
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Target,
  Menu,
  X,
  Inbox,
  MessageSquare,
  Layers,
  PieChart,
  UserPlus,
  Mail,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Code,
  Quote,
  Headset,
  Bot
} from 'lucide-react';
import { useState } from 'react';

// Core features for the main features section
const coreFeatures = [
  {
    icon: Inbox,
    title: 'Inbox',
    description: 'Unified message management'
  },
  {
    icon: Bot,
    title: 'AI Chatbot',
    description: 'Automated customer support'
  },
  {
    icon: Zap,
    title: 'Quick Replies',
    description: 'Pre-built response templates'
  },
  {
    icon: Layers,
    title: 'Integrations',
    description: 'Connect with your tools'
  },
  {
    icon: MessageSquare,
    title: 'Web Chat',
    description: 'Website chat widget'
  },
  {
    icon: Mail,
    title: 'Newsletters',
    description: 'Email campaigns'
  },
  {
    icon: PieChart,
    title: 'Analytics',
    description: 'Performance insights'
  },
  {
    icon: Users,
    title: 'Team Chat',
    description: 'Internal collaboration'
  },
  {
    icon: UserPlus,
    title: 'CRM',
    description: 'Customer management'
  }
];

// Industry solutions
const industries = [
  {
    icon: Code,
    title: 'Technology',
    subtitle: 'AI Chatbot Integration',
    description: 'Streamline customer support with intelligent automation and seamless integration capabilities.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Utensils,
    title: 'Hospitality',
    subtitle: 'Event Ticketing Solution',
    description: 'Manage bookings, payments, and customer communication through WhatsApp seamlessly.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: ShoppingBag,
    title: 'Retail',
    subtitle: 'Real-time Analytics Dashboard',
    description: 'Track customer behavior, sales metrics, and engagement rates in real-time.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    subtitle: 'Lead Generation Funnel',
    description: 'Convert prospects into students with automated follow-ups and personalized messaging.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    subtitle: 'Customer Support Optimization',
    description: 'Provide 24/7 patient support with HIPAA-compliant messaging and appointment scheduling.',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: TrendingUp,
    title: 'Marketing',
    subtitle: 'Automated Messaging Campaign',
    description: 'Create targeted campaigns with personalized messages and automated follow-up sequences.',
    color: 'from-pink-500 to-pink-600'
  }
];

const stats = [
  { number: '20+', label: 'Companies Trust Us' },
  { number: '10M+', label: 'Messages Processed' },
  { number: '99.9%', label: 'Uptime Guarantee' },
  { number: '24/7', label: 'Expert Support' }
];

const testimonials = [
  {
    name: 'Harsh Patel',
    role: 'Associate Founder',
    company: 'Savitri SociaLabs',
    content: 'We used WhatsEra for ticketing at our \'Be Here Now\' event, and it was a game-changer! Attendees could book tickets via WhatsApp seamlessly, making payments and accessing event details with ease.',
    rating: 5
  },
  {
    name: 'Jigar Patel',
    role: '3D Designer & Musician',
    company: 'Independent Artist',
    content: 'As a musician, WhatsEra made event management effortless. I didn\'t have to worry about ticketing or data collection-I could focus entirely on my performance.',
    rating: 5
  },
  {
    name: 'Vrushal Makwana',
    role: 'Event Organizer',
    company: 'Vadodara Fun Fiesta',
    content: 'WhatsEra made ticketing and attendee management seamless! Guests easily booked tickets via WhatsApp, accessed event details, and stayed updated.',
    rating: 5
  },
  {
    name: 'Shubham Sharma',
    role: 'Founder',
    company: 'TrainWithShubham',
    content: 'Absolutely loving the help and support I am getting from the team. The product is amazing, team is hardworking and overall experience is fantastic.',
    rating: 5
  }
];

// Team-specific features
const teamFeatures = {
  sales: {
    title: 'Sales',
    subtitle: 'More deals. Less effort.',
    description: 'Turn conversations into conversions with WhatsApp Business. Close deals faster, wow your customers, and build lasting relationships effortlessly.',
    features: [
      'Boost conversions with interactive WhatsApp templates',
      '24/7 AI-powered automatic follow-ups',
      'One inbox for all customer conversations',
      'Chatbots for instant lead qualification',
      'Interactive templates that sell',
      'Internal notes and @mentions for teamwork',
      'WhatsApp Newsletters for tailored offers',
      'Seamless CRM integration'
    ],
    icon: TrendingUp
  },
  support: {
    title: 'Support',
    subtitle: 'Efficient communication for better retention',
    description: 'Boost collaboration, streamline workflows, and organize communication. Foster customer loyalty, drive revenue, and achieve sustainable growth effortlessly.',
    features: [
      'Multi-channel support integration',
      'Automated ticket routing',
      'Knowledge base integration',
      'Customer satisfaction tracking',
      'Response time analytics',
      'Team collaboration tools'
    ],
    icon: Headset
  },
  marketing: {
    title: 'Marketing',
    subtitle: 'Automated campaigns that convert',
    description: 'Create personalized marketing campaigns that engage customers and drive results through intelligent automation.',
    features: [
      'Broadcast messaging campaigns',
      'Customer segmentation',
      'A/B testing capabilities',
      'Campaign performance analytics',
      'Drip campaign automation',
      'Lead nurturing workflows'
    ],
    icon: Target
  }
};





export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTeam, setActiveTeam] = useState<'sales' | 'support' | 'marketing'>('sales');
  const [selectedPlan, setSelectedPlan] = useState<'growth' | 'starter' | 'business'>('growth');

  const handleGetStarted = (): void => {
    navigate('/signup');
  };

  const handleLogin = (): void => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo - Fixed width */}
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* Large eye-catching logo that doesn't affect layout */}
                  <img
                    src="/logo.png?v=9"
                    alt="WhatsEra Logo"
                    className="w-8 h-8 relative z-10 transform hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  WhatsEra
                </span>
              </div>
            </div>

            {/* Center Navigation - Flexible */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                <a href="#product" className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Product</a>
                <a href="#usecase" className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Use Case</a>
                <a href="#comparison" className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Comparison</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Pricing</a>
                <a href="#casestudies" className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Case Studies</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">About us</a>
              </div>
            </nav>

            {/* Right side buttons - Fixed width */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                onClick={handleLogin}
                className="hidden md:block bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Login
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Try for free
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <a href="#product" className="block text-gray-600 hover:text-gray-900 font-medium">Product</a>
              <a href="#usecase" className="block text-gray-600 hover:text-gray-900 font-medium">Use Case</a>
              <a href="#comparison" className="block text-gray-600 hover:text-gray-900 font-medium">Comparison</a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <a href="#casestudies" className="block text-gray-600 hover:text-gray-900 font-medium">Case Studies</a>
              <a href="#about" className="block text-gray-600 hover:text-gray-900 font-medium">About us</a>
              <div className="pt-4 space-y-2">
                <button
                  onClick={handleLogin}
                  className="w-full text-left text-gray-600 hover:text-gray-900 px-4 py-2 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Try for free
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Smart AI for sales and support on
              <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                WhatsApp
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Smarter Customer Support, Powered by AI. With WhatsEra, engage customers instantly across all channels — securely and effortlessly.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <button
                onClick={handleGetStarted}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-gray-500 font-medium">20+ companies already trust us</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-6 w-6 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Enterprise Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Secure & Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Global Scale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="product" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Select features and get started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage customer relationships and grow your business through WhatsApp
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-300 cursor-pointer group">
                <div className="w-16 h-16 bg-gray-100 group-hover:bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <feature.icon className="h-8 w-8 text-gray-600 group-hover:text-green-600 transition-colors" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</div>
                <div className="text-sm text-gray-500">{feature.description}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleGetStarted}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
            >
              Try for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section id="usecase" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A solution, perfect for every industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WhatsEra optimizes customer communication for businesses of any size and industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className={`w-12 h-12 bg-gradient-to-r ${industry.color} rounded-lg flex items-center justify-center mb-4`}>
                  <industry.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.title}</h3>
                <h4 className="text-sm font-medium text-gray-600 mb-3">{industry.subtitle}</h4>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The perfect solution for every team
            </h2>
          </div>

          {/* Team tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              {Object.keys(teamFeatures).map((team) => (
                <button
                  key={team}
                  onClick={() => setActiveTeam(team as 'sales' | 'support' | 'marketing')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTeam === team
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {teamFeatures[team as keyof typeof teamFeatures].title}
                </button>
              ))}
            </div>
          </div>

          {/* Active team content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  {activeTeam === 'sales' && <TrendingUp className="h-6 w-6 text-green-600" />}
                  {activeTeam === 'support' && <Headset className="h-6 w-6 text-green-600" />}
                  {activeTeam === 'marketing' && <Target className="h-6 w-6 text-green-600" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{teamFeatures[activeTeam].subtitle}</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">{teamFeatures[activeTeam].description}</p>

              <div className="space-y-4">
                {teamFeatures[activeTeam].features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleGetStarted}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Use this Solution
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">JD</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">Customer</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">2:30 PM</div>
                </div>

                <div className="space-y-4">
                  <div className="flex">
                    <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                      <p className="text-sm text-gray-800">Hello. I wanted to ask about the status of my order.</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-green-500 text-white p-3 rounded-lg max-w-xs">
                      <p className="text-sm">🤖 Hi Tom. One moment, I'll take a look.</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
                      <p className="text-sm">🔎 AI is writing...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business. Start free and scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div
              onClick={() => setSelectedPlan('starter')}
              className={`bg-white rounded-xl shadow-lg p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedPlan === 'starter'
                  ? 'border-green-500 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for small businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹1,099</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <button
                  onClick={handleGetStarted}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors mb-6 ${
                    selectedPlan === 'starter'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Up to 1,000 contacts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  5,000 messages/month
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic AI responses
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email support
                </li>
              </ul>
            </div>

            {/* Growth Plan */}
            <div
              onClick={() => setSelectedPlan('growth')}
              className={`bg-white rounded-xl shadow-lg p-8 border-2 relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedPlan === 'growth'
                  ? 'border-green-500 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                  selectedPlan === 'growth'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Growth</h3>
                <p className="text-gray-600 mb-6">Best for growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹4,099</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <button
                  onClick={handleGetStarted}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors mb-6 ${
                    selectedPlan === 'growth'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Up to 10,000 contacts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  25,000 messages/month
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced AI & automation
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Analytics & reports
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
            </div>

            {/* Business Plan */}
            <div
              onClick={() => setSelectedPlan('business')}
              className={`bg-white rounded-xl shadow-lg p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedPlan === 'business'
                  ? 'border-green-500 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
                <p className="text-gray-600 mb-6">For large organizations</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹7,399</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <button
                  onClick={handleGetStarted}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors mb-6 ${
                    selectedPlan === 'business'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited contacts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited messages
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom AI training
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API access
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated support
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h4>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
                <p className="text-gray-600">Yes, we offer a 14-day free trial for all plans. No credit card required to get started.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600">We accept all major credit cards, UPI, net banking, and bank transfers for annual plans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why choose WhatsEra?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how WhatsEra compares to traditional customer support solutions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">WhatsEra</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Traditional CRM</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Email Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">AI-Powered Responses</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">WhatsApp Integration</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-yellow-500 text-sm">Limited</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Real-time Analytics</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-yellow-500 text-sm">Basic</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Setup Time</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">5 minutes</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">2-4 weeks</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">1-2 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="casestudies" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how businesses like yours are growing with WhatsEra
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Case Study 1 - Abandoned Cart Recovery */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl shadow-lg p-8 border border-red-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Abandoned Cart Recovery</h3>
                  <p className="text-gray-600">Fashion E-commerce Store</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-red-600 mb-2">The Challenge</h4>
                  <p className="text-sm text-gray-700">68% cart abandonment rate with only 20% email open rates</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-500">21%</div>
                    <div className="text-xs text-gray-600">Cart Recovery</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-500">82%</div>
                    <div className="text-xs text-gray-600">Open Rate</div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-700">₹4.8L</div>
                  <div className="text-xs text-green-600">Revenue Boost in 60 days</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-700 italic">
                  "Hi Priya, your red maxi dress is still in your cart – only 3 left in stock! Get 5% off if you complete your purchase in 24 hours."
                </p>
              </div>
            </div>

            {/* Case Study 2 - Post-Purchase Engagement */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Post-Purchase Engagement</h3>
                  <p className="text-gray-600">Electronics Store</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-600 mb-2">The Challenge</h4>
                  <p className="text-sm text-gray-700">Only 12% repeat purchases & 8% review collection rate</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-500">27%</div>
                    <div className="text-xs text-gray-600">Repeat Purchases</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-500">4x</div>
                    <div className="text-xs text-gray-600">More Reviews</div>
                  </div>
                </div>

                <div className="bg-blue-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-700">&lt;1hr</div>
                  <div className="text-xs text-blue-600">Query Resolution Time</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-700 italic">
                  "You bought wireless earbuds – here are matching cases & chargers that other customers loved!"
                </p>
              </div>
            </div>

            {/* Case Study 3 - Booking & No-Shows */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Reducing No-Shows</h3>
                  <p className="text-gray-600">Luxury Salon & Spa Chain</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-purple-600 mb-2">The Challenge</h4>
                  <p className="text-sm text-gray-700">35% no-show rate & 2+ hours daily manual follow-ups</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-500">15%</div>
                    <div className="text-xs text-gray-600">No-Show Rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-500">28%</div>
                    <div className="text-xs text-gray-600">More Bookings</div>
                  </div>
                </div>

                <div className="bg-purple-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-700">3x</div>
                  <div className="text-xs text-purple-600">More Reviews Collected</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-700 italic">
                  "20% off Spa Therapy this Tuesday – Book Now with one tap! Confirm/Reschedule your appointment."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About WhatsEra
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize customer communication through AI-powered WhatsApp solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
              <p className="text-gray-700 mb-6">
                The inspiration for WhatsEase came from recognizing a fundamental gap between how people prefer to communicate and how businesses operate.
              </p>
              <p className="text-gray-700 mb-6">
                While organizing a major tech conference, Founder & CEO faced enormous challenges managing registrations, sending reminders, and coordinating with attendees. Despite spending thousands on fancy tools, most communication ended up happening over WhatsApp anyway – but in a chaotic, manual way that consumed hours of valuable time.
              </p>
              <p className="text-gray-700 mb-6">
                WhatsApp is where people already spend their time – with over 2 billion users globally, it's the world's most popular messaging app. Yet most businesses struggle to leverage it effectively for operations. This realization sparked our vision to build a platform that would transform WhatsApp from a simple chat app into a powerful business automation tool.
              </p>
              <p className="text-gray-700 mb-0">
                This idea evolved into WhatsEase – a comprehensive no-code platform that empowers businesses to automate customer interactions through WhatsApp. Our mission is to help brands create seamless, personalized customer experiences at scale, without writing a single line of code.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Customer First</h4>
                    <p className="text-gray-600 text-sm">Every feature we build starts with understanding customer needs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Innovation</h4>
                    <p className="text-gray-600 text-sm">We leverage cutting-edge AI to solve real business problems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Simplicity</h4>
                    <p className="text-gray-600 text-sm">Complex technology should be simple to use and understand</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Reliability</h4>
                    <p className="text-gray-600 text-sm">We build robust solutions that businesses can depend on 24/7</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Transparency</h4>
                    <p className="text-gray-600 text-sm">Clear communication and honest pricing with no hidden costs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Growth Mindset</h4>
                    <p className="text-gray-600 text-sm">We continuously learn and adapt to help our customers succeed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              You are in good company
            </h2>
            <p className="text-xl text-gray-600">
              Read what our customers say about us and see for yourself!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  <Quote className="h-6 w-6 text-gray-400 mb-2" />
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/logo.png?v=9"
                alt="WhatsEra Logo"
                className="w-8 h-8 mr-3"
              />
              <span className="text-xl font-bold text-gray-900">
                WhatsEra
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Smart AI for sales and support on WhatsApp
            </p>
            <div className="text-sm text-gray-500">
              &copy; 2024 WhatsEra. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
