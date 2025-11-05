import Button from '../components/Button';
import MiniCard from '../components/MiniCard';
import Comment from '../components/Comment';
import Wave from '../components/Wave';

function HomePage() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Content Section */}
      <div className="flex flex-col grow items-center w-full z-[1]">
        {/* Top Section: MiniCard + Buttons */}
        <div className="bg-white flex flex-col items-center justify-center w-full z-[3]">
          <div className="bg-white flex flex-col gap-32 items-center justify-center max-w-[800px] px-24 py-32 w-full">
            {/* MiniCard */}
            <MiniCard
              type="active"
              size="small"
              name="Gabriel Filho"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              birthDate="05/01/2003"
              rg="234567890"
              cpf="44012345678"
              issueDate="02/05/2025"
              expiryDate="02/11/2025"
              onButtonClick={() => console.log('Acessar carteirinha')}
            />

            {/* Bottom Buttons */}
            <div className="flex gap-16 items-start w-full">
              {/* Button Escalar */}
              <Button
                textButton="Escalar"
                variant="secondary"
                showIconLeft={true}
                showIconRight={false}
                iconType="specific-icon"
                specificIcon="escalar"
                onClick={() => console.log('Clique em Escalar')}
                className="grow"
              />

              {/* Button Documentos */}
              <Button
                textButton="Documentos"
                variant="secondary"
                showIconLeft={true}
                showIconRight={false}
                iconType="specific-icon"
                specificIcon="carteira"
                onClick={() => console.log('Clique em Documentos')}
                className="grow"
              />
            </div>
          </div>
        </div>

        {/* Wave Decorativo */}
        <Wave />

        {/* Bottom Section: Últimos avisos */}
        <div className="bg-amber-50 flex flex-col gap-32 items-start pb-80 pt-16 px-32 w-full z-[1]">
          {/* Título */}
          <p className="text-body-lg-medium text-brown-900 whitespace-nowrap">
            Últimos avisos
          </p>

          {/* Comentários */}
          <div className="flex flex-col gap-24 items-start w-full">
            <Comment
              text="Quem precisa de carona para a UFSCAR no horário da aula, me chama no WhatsApp!"
              name="Ana Paula"
              data="19/09/2025"
              hour="15:06"
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            />

            <Comment
              text="Gente, hoje não vamos ter aula por conta da chuva. Passamos nossa aula para semana que vem. Abraços!"
              name="Eduardo da Silva"
              data="10/07/2025"
              hour="12:34"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            />

            <Comment
              text="Amanhã vamos focar em técnicas de segurança. Aguardem as aulas!"
              name="Lucas Moreira"
              data="14/05/2025"
              hour="13:06"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            />

            <Comment
              text="Quem precisa de carona para a UFSCAR no horário da aula, me chama no WhatsApp!"
              name="Ana Paula"
              data="19/09/2025"
              hour="15:06"
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            />

            <Comment
              text="Gente, hoje não vamos ter aula por conta da chuva. Passamos nossa aula para semana que vem. Abraços!"
              name="Eduardo da Silva"
              data="10/07/2025"
              hour="12:34"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            />

            <Comment
              text="Amanhã vamos focar em técnicas de segurança. Aguardem as aulas!"
              name="Lucas Moreira"
              data="14/05/2025"
              hour="13:06"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage

