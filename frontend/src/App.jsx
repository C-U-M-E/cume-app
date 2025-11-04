import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full border border-brown-100">
        <h1 className="text-title-h1 text-brown-900 mb-6 text-center">
          CUME App
        </h1>
        <div className="text-center">
          <p className="text-body-md-regular text-gray-700 mb-4">
            Bem-vindo ao seu projeto React!
          </p>
          <div className="mb-6">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-amber-500 hover:bg-amber-600 text-white text-body-md-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Contador: {count}
            </button>
          </div>
          <p className="text-body-sm-regular text-gray-600">
            Comece a editar <code className="bg-brown-50 px-2 py-1 rounded text-brown-700">src/App.jsx</code>
          </p>
          
          {/* Exemplos de estilos */}
          <div className="mt-8 space-y-4 text-left">
            <h2 className="text-title-h2 text-brown-800">Estilos Disponíveis</h2>
            <h3 className="text-title-h3 text-amber-700">Títulos</h3>
            <p className="text-body-lg-regular text-gray-700">Body Large Regular</p>
            <p className="text-body-md-medium text-brown-600">Body Medium Medium</p>
            <p className="text-body-sm-regular text-gray-600">Body Small Regular</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
