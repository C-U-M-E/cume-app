import ButtonOptions from '../components/ButtonOptions';

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

        {/* ButtonOptions Examples Section */}
        <section className="mb-48">
          <h2 className="text-title-h2 text-amber-700 mb-16">
            Exemplos de ButtonOptions
          </h2>
          <div className="flex flex-col gap-12 max-w-md">
            {/* Exemplo com imagem (type="img") */}
            <ButtonOptions
              title="Escalar Montanha"
              description="14 de março, 2024"
              img="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=200&h=200&fit=crop"
              onClick={() => console.log('Clique em Escalar Montanha')}
            />
            
            {/* Exemplo com ícone específico do projeto (type="specific-icon") */}
            <ButtonOptions
              title="Home"
              description="Acesse a página inicial"
              iconType="specific-icon"
              specificIcon="home"
              onClick={() => console.log('Clique em Home')}
            />
            
            {/* Exemplo com outro ícone específico */}
            <ButtonOptions
              title="Carteira"
              description="Gerencie suas carteiras"
              iconType="specific-icon"
              specificIcon="carteira"
              onClick={() => console.log('Clique em Carteira')}
            />
            
            {/* Exemplo com ícone FontAwesome (type="icon") */}
            <ButtonOptions
              title="Usuário"
              description="Perfil do usuário"
              iconType="icon"
              icon="fas fa-user"
              onClick={() => console.log('Clique em Usuário')}
            />
            
            {/* Exemplo com outro ícone FontAwesome */}
            <ButtonOptions
              title="Configurações"
              description="Ajuste as configurações"
              iconType="icon"
              icon="fas fa-cog"
              onClick={() => console.log('Clique em Configurações')}
            />
            
            {/* Exemplo com ícone FontAwesome com cor customizada */}
            <ButtonOptions
              title="Cor Customizada"
              description="Ícone com cor amber-500"
              iconType="icon"
              icon="fas fa-star"
              iconColor="text-amber-500"
              onClick={() => console.log('Clique em Cor Customizada')}
            />
            
            {/* Exemplo com ícone FontAwesome com tamanho customizado */}
            <ButtonOptions
              title="Tamanho Customizado"
              description="Ícone com tamanho 28px"
              iconType="icon"
              icon="fas fa-heart"
              iconSize="28px"
              onClick={() => console.log('Clique em Tamanho Customizado')}
            />
            
            {/* Exemplo com ícone FontAwesome com cor e tamanho customizados */}
            <ButtonOptions
              title="Cor e Tamanho Customizados"
              description="Ícone brown-700 com 32px"
              iconType="icon"
              icon="fas fa-bell"
              iconColor="text-brown-700"
              iconSize="32px"
              onClick={() => console.log('Clique em Cor e Tamanho Customizados')}
            />
            
            {/* Exemplo com ícone escalar (specific-icon) */}
            <ButtonOptions
              title="Escalar"
              description="Atividades de escalada"
              iconType="specific-icon"
              specificIcon="escalar"
              onClick={() => console.log('Clique em Escalar')}
            />
            
            {/* Exemplo sem ícone */}
            <ButtonOptions
              title="Sem Ícone"
              description="Exemplo sem ícone"
              onClick={() => console.log('Clique em Sem Ícone')}
            />
          </div>
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

