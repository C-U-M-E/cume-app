import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          CUME App
        </h1>
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Bem-vindo ao seu projeto React!
          </p>
          <div className="mb-6">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Contador: {count}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Comece a editar <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

