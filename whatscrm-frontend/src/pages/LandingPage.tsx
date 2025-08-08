import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
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
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  WhatsEra
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#product" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Product</a>
              <a href="#usecase" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Use Case</a>
              <a href="#comparison" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Comparison</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</a>
              <a href="#casestudies" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Case Studies</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About us</a>
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 font-medium transition-colors"
              >
                Login
              </button>
              <button
                className="text-gray-600 hover:text-gray-900 px-4 py-2 font-medium transition-colors"
              >
                Contact Sales
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
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
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
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
