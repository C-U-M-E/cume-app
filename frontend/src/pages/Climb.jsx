import React from 'react';
import ButtonOptions from '../components/ButtonOptions';
import climbVector from '../assets/images/climb-vector.svg';

function Climb() {
  return (
    <div className="h-full bg-white flex flex-col gap-40 px-24 py-0">
      {/* Content */}
      <div className="flex flex-col gap-48 items-start w-full">
        {/* Seção Superior: Se desafie nas escaladas */}
        <div className="flex flex-col gap-32 items-start w-full">
          {/* Top: Título + Imagem */}
          <div className="flex gap-8 items-center px-8 py-0 w-full">
            {/* Texto */}
            <div className="flex flex-col gap-8 grow items-start">
              <h2 className="text-title-h2 text-brown-900 leading-[1.4]">
                Se desafie nas escaladas!
              </h2>
              <p className="text-body-md-regular text-gray-600 leading-[1.5]">
                Descubra até onde você chega
              </p>
            </div>
            
            {/* Imagem Vetorial */}
            <div className="h-[134px] relative shrink-0 w-[103px]">
              <img 
                src={climbVector} 
                alt="Escalada" 
                className="block max-w-none size-full"
              />
            </div>
          </div>

          {/* Options: Lista de vias */}
          <div className="flex flex-col gap-16 items-start w-full">
            {/* Via Normal */}
            <ButtonOptions
              title="Via Normal"
              description="Ideal para iniciantes"
              iconType="img"
              img="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=100&h=100&fit=crop"
              onClick={() => console.log('Clique em Via Normal')}
            />

            {/* Via Abaolada */}
            <ButtonOptions
              title="Via Abaolada"
              description="Ideal para iniciantes"
              iconType="img"
              img="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=100&h=100&fit=crop"
              onClick={() => console.log('Clique em Via Abaolada')}
            />

            {/* Via Resumo */}
            <ButtonOptions
              title="Via Resumo"
              description="Ideal para intermediários"
              iconType="img"
              img="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=100&h=100&fit=crop"
              onClick={() => console.log('Clique em Via Resumo')}
            />

            {/* Via Reglete */}
            <ButtonOptions
              title="Via Reglete"
              description="Ideal para avançados"
              iconType="img"
              img="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=100&h=100&fit=crop"
              onClick={() => console.log('Clique em Via Reglete')}
            />
          </div>
        </div>

        {/* Seção Inferior: Para escalar no reservatório */}
        <div className="flex flex-col gap-24 items-start w-full">
          {/* Texto */}
          <div className="flex flex-col justify-center w-full">
            <p className="text-body-md-regular text-gray-600 leading-[1.5]">
              Para escalar no reservatório
            </p>
          </div>

          {/* Options: Registrar presença */}
          <div className="flex flex-col gap-16 items-start w-full">
            <ButtonOptions
              title="Registrar presença"
              description="Necessário para usar sapatilha"
              iconType="img"
              img="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=100&h=100&fit=crop"
              onClick={() => console.log('Clique em Registrar presença')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Climb;
