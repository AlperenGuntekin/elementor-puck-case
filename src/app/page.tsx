import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎨 Elementor to Puck Converter
          </h1>
          
          <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
            Convert Elementor JSON data to Puck Editor format and back with seamless bidirectional mapping
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with Next.js 15, Puck Editor 0.19.1, TypeScript, and Tailwind CSS v4
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">✨ Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h3 className="font-bold text-xl mb-4 text-blue-900 flex items-center">
                🧩 Widget Support
              </h3>
              <ul className="text-gray-700 space-y-3 text-lg">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>HeadingBlock</strong> - Configurable headings (H1-H6)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>TextBlock</strong> - Rich text editor with HTML support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>ButtonBlock</strong> - Interactive buttons with variants
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>IconBlock</strong> - Font Awesome icons
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <h3 className="font-bold text-xl mb-4 text-green-900 flex items-center">
                🔄 Conversion
              </h3>
              <ul className="text-gray-700 space-y-3 text-lg">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Elementor JSON</strong> → Puck format
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Puck format</strong> → Elementor JSON
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Bidirectional</strong> mapping
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Real-time</strong> preview
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <Link
            href="/test-converter"
            className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              🧪 Test Converter
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
          <Link
            href="/editor"
            className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              ✏️ Editor
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
          <a
            href="https://puckeditor.com/docs/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-gray-600 to-gray-700 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              📚 Documentation
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">🚀 Quick Start</h3>
          <p className="text-gray-700 mb-4">
            Click on "Test Converter" to see the conversion process in action, or use "Editor" for a more interactive experience.
          </p>
          <div className="text-sm text-gray-600">
            <p>✅ Elementor JSON → Puck format conversion</p>
            <p>✅ Real-time component rendering</p>
            <p>✅ Bidirectional data mapping</p>
            <p>✅ Modern, responsive UI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
