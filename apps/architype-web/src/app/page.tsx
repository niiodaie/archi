import Link from 'next/link'
import { ArrowRight, Building2, Smartphone, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">VNX-Architype</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Architectural Design
            <span className="text-indigo-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            VNX-Architype is the all-in-one architectural super-app for homeowners and building professionals. 
            Plan rooms in AR, draft 2D/3D layouts, collaborate, and generate estimates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/demo" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need to design and build
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Smartphone className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AR Planning</h3>
              <p className="text-gray-600">
                Scan, measure, and place objects in augmented reality. Visualize your designs in real space.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Building2 className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2D/3D Design</h3>
              <p className="text-gray-600">
                Create professional layouts with our intuitive 2D editor and immersive 3D viewer.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                Work together with your team, share projects, and track progress in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24 bg-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your design process?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of architects, designers, and homeowners who trust VNX-Architype.
          </p>
          <Link 
            href="/auth/signup" 
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Start Your Free Trial
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 VNX-Architype. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

