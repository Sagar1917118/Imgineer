import { useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Film, 
  File, 
  Music, 
  LogIn,
  ChevronRight,
  Shield,
  Zap,
  Code,
  Link,
  Sparkles,
} from 'lucide-react';
 import aws from "../icons/aws.png"
 import cloudfront from "../icons/cloudFront.png"
 import lambda from "../icons/lambda.png"
 import react from "../icons/react.png"
 import nodejs from "../icons/nodejs.png"
import { useNavigate } from 'react-router-dom';
import { useGoogleAuth } from "../Hooks/useGoogleAuth"

export default function HomePage({isAuthenticated}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
   const { loginWithGoogle, loading, error } = useGoogleAuth();
   const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-500">Imgineer</span>
              </div>
            </div>
            {
              isAuthenticated ? <button  className="h-11 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-colors" onClick={()=>{navigate("/dashboard")}}>Dashbaord</button>:
              (
                  <div className="flex items-center">
                  <button 
                  onClick={loginWithGoogle} disabled={loading}
                    className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-colors"
                  >
                    <LogIn size={18} className="mr-2" />
                    {loading ? "Signing in..." : "Sign in with Google"}
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Secure Cloud Storage for</span>
            <span className="block text-blue-500">All Your Digital Assets</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Upload, store, and manipulate your images, videos, audio, documents, and more with advanced features powered by AWS.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                Get Started
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#learn-more" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your digital assets
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform offers comprehensive solutions for storing and manipulating all types of digital files.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative bg-blue-50 p-4 rounded-md">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-400 text-white">
                    <Shield size={24} />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Cloud Storage</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Store all your files securely in the cloud with enterprise-grade encryption and access controls.
                </dd>
              </div>

              <div className="relative  bg-blue-50 p-4 rounded-md">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-400 text-white">
                    <Upload size={24} />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Multi-Format Support</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Upload and manage images, audio, video, PPT, email, documents, and text files all in one place.
                </dd>
              </div>

              <div className="relative  bg-blue-50 p-4 rounded-md">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-400 text-white">
                    <Zap size={24} />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">On-the-fly Image Manipulation</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Resize images, change formats, apply grayscale filters and more without additional software.
                </dd>
              </div>

              <div className="relative  bg-blue-50 p-4 rounded-md">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-400 text-white">
                    <Sparkles size={24} />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI-Powered Features</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Leverage AI prompts to transform and enhance your images with advanced capabilities.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="learn-more" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, powerful, and efficient
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 flex-shrink-0">
                  <div className="h-64 w-full bg-blue-100 rounded-lg flex items-center justify-center">
                    <Upload size={64} className="text-blue-400" />
                  </div>
                </div>
                <div className="md:w-1/2 md:ml-8 mt-4 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900">1. Upload Assets</h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Simply drag and drop or select files from your computer. Our platform supports various file types including images, audio, video, documents, and more.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 flex-shrink-0">
                  <div className="h-64 w-full bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code size={64} className="text-blue-400" />
                  </div>
                </div>
                <div className="md:w-1/2 md:mr-8 mt-4 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900">2. Access Advanced Features</h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Use our API or web interface to transform and manipulate your assets. Resize images, convert formats, apply filters, or use AI-driven enhancements.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 flex-shrink-0">
                  <div className="h-64 w-full bg-blue-100 rounded-lg flex items-center justify-center">
                    <Link size={64} className="text-blue-400" />
                  </div>
                </div>
                <div className="md:w-1/2 md:ml-8 mt-4 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900">3. Share and Use Anywhere</h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Access your transformed assets via secure URLs powered by AWS CloudFront for global delivery. Integrate with your applications using our robust API.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Technologies</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Built with modern cloud technology
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              <div className="col-span-1 flex justify-center items-center p-2 bg-blue-100 rounded-md">
                <div className="h-20 text-center">
                  <img src={aws} alt="AWS" className="h-12 mx-auto" />
                  <p className="text-sm font-medium text-gray-500 mt-2">AWS</p>
                </div>
              </div>
              <div className="col-span-1 flex justify-center items-center p-2 bg-blue-100 rounded-md">
                <div className="h-20 text-center">
                  <img src={lambda} alt="Lambda" className="h-12 mx-auto" />
                  <p className="text-sm font-medium text-gray-500 mt-2">Lambda</p>
                </div>
              </div>
              <div className="col-span-1 flex justify-center items-center p-2 bg-blue-100 rounded-md">
                <div className="h-20 text-center">
                  <img src={cloudfront} alt="CloudFront" className="h-12 mx-auto" />
                  <p className="text-sm font-medium text-gray-500 mt-2">CloudFront</p>
                </div>
              </div>
              <div className="col-span-1 flex justify-center items-center p-2 bg-blue-100 rounded-md">
                <div className="h-20 text-center">
                  <img src={nodejs} alt="Node.js" className="h-12 mx-auto" />
                  <p className="text-sm font-medium text-gray-500 mt-2">Node.js</p>
                </div>
              </div>
              <div className="col-span-1 flex justify-center items-center p-2 bg-blue-100 rounded-md">
                <div className="h-20 text-center">
                  <img src={react} alt="Node.js" className="h-12 mx-auto" />
                  <p className="text-sm font-medium text-gray-500 mt-2">React.js</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-white-200">Create your account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-white hover:bg-blue-50">
                Sign up
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <span className="text-2xl font-bold text-white">Imgineer</span>
              <p className="text-gray-300 text-base">
                The complete solution for managing and manipulating your digital assets in the cloud.
              </p>
              <div className="flex space-x-6">
                {/* Social links would go here */}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Product</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Features</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Pricing</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">API</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Documentation</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Help Center</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Contact Us</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Status</a></li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">About</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Blog</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Careers</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Terms</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white">Cookies</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 Imgineer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}