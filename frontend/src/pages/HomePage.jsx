function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-brown-100">
        <div className="max-w-7xl mx-auto px-16 py-12">
          <h1 className="text-title-h1 text-brown-900">
            CUME App
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-16 py-32">
        {/* Hero Section */}
        <section className="mb-48">
          <h2 className="text-title-h2 text-amber-700 mb-16">
            Bem-vindo ao CUME App
          </h2>
          <p className="text-body-lg-regular text-brown-600 mb-12 max-w-2xl">
            Este é o início do seu projeto. Comece a desenvolver suas páginas e componentes aqui.
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white text-body-md-medium px-24 py-8 rounded-lg transition duration-200 flex items-center gap-8">
            <i className="fas fa-rocket"></i>
            Começar
          </button>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-24">
          <div className="bg-white border border-brown-100 rounded-lg p-16">
            <div className="mb-12">
              <i className="fas fa-star text-amber-500 text-4xl"></i>
            </div>
            <h3 className="text-title-h3 text-brown-800 mb-8">
              Feature 1
            </h3>
            <p className="text-body-md-regular text-gray-700">
              Descrição da primeira feature do seu projeto.
            </p>
          </div>

          <div className="bg-white border border-brown-100 rounded-lg p-16">
            <div className="mb-12">
              <i className="fas fa-heart text-amber-500 text-4xl"></i>
            </div>
            <h3 className="text-title-h3 text-brown-800 mb-8">
              Feature 2
            </h3>
            <p className="text-body-md-regular text-gray-700">
              Descrição da segunda feature do seu projeto.
            </p>
          </div>

          <div className="bg-white border border-brown-100 rounded-lg p-16">
            <div className="mb-12">
              <i className="fas fa-shield-alt text-amber-500 text-4xl"></i>
            </div>
            <h3 className="text-title-h3 text-brown-800 mb-8">
              Feature 3
            </h3>
            <p className="text-body-md-regular text-gray-700">
              Descrição da terceira feature do seu projeto.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-50 border-t border-brown-100 mt-48">
        <div className="max-w-7xl mx-auto px-16 py-24">
          <p className="text-body-md-regular text-brown-600 text-center">
            © 2024 CUME App. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

