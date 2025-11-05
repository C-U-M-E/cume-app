import React, { useState } from 'react';
import viaVector from '../../assets/images/via-vector.svg';
import confirmationVector from '../../assets/images/confirmation-vector.svg';

function RegisterAttendance() {
  // Estado da presença - futuramente virá do backend
  const [attendanceStatus] = useState('waitingAttendanceConfirmation'); // 'waitingAttendanceConfirmation' ou 'attendanceConfirmed'
  
  // TODO: Quando o estado mudar de 'waitingAttendanceConfirmation' para 'attendanceConfirmed',
  // adicionar um toaster/notificação para informar o usuário da mudança de estado

  // Gera um QR Code aleatório (mock)
  const generateQRCode = () => {
    // QR Code mock - futuramente será gerado pelo backend
    return 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + 
           encodeURIComponent(`attendance-${Date.now()}`);
  };

  const qrCodeUrl = generateQRCode();

  // Estado: Aguardando confirmação do QR Code
  if (attendanceStatus === 'waitingAttendanceConfirmation') {
    return (
      <div className="h-full bg-white flex flex-col gap-32 px-24 pb-24 overflow-x-hidden">
        {/* Content - área scrollável */}
        <div className="flex-1 flex flex-col gap-56 items-start w-full min-h-0 overflow-y-auto pb-0">
          {/* Seção Superior: Registrar presença */}
          <div className="flex gap-8 items-center px-8 py-0 w-full shrink-0">
            {/* Texto */}
            <div className="flex flex-col gap-8 grow items-start">
              <h2 className="text-title-h2 text-brown-900 leading-[1.4]">
                Registrar presença
              </h2>
              <p className="text-body-md-regular text-gray-600 leading-[1.5]">
                Mostre o QR Code gerado para um dos administradores
              </p>
            </div>
            
            {/* Imagem Vetorial */}
            <div className="h-[105px] relative shrink-0 w-[91.765px]">
              <img 
                src={viaVector} 
                alt="Via" 
                className="block max-w-none size-full"
              />
            </div>
          </div>

          {/* QR Code */}
          <div className="aspect-square relative shrink-0 w-full">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="block max-w-none size-full opacity-80"
            />
          </div>
        </div>
      </div>
    );
  }

  // Estado: Presença confirmada
  return (
    <div className="h-full bg-white flex flex-col gap-32 items-center px-24 pb-24 overflow-x-hidden">
      {/* Scrollable Content Area */}
      <div className="flex-1 flex flex-col gap-32 items-center justify-center w-full overflow-y-auto pt-0 pb-0 min-h-0">
        {/* Empty State Illustration */}
        <div className="h-[256px] relative shrink-0 w-[240px]">
          <img 
            src={confirmationVector} 
            alt="Confirmação"
            className="block max-w-none size-full"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-12 items-start text-center w-full">
          <p className="text-title-h3 text-brown-900 leading-[1.4] w-full">
            Presença do dia registrada!
          </p>
          <p className="text-body-md-regular text-gray-600 leading-[1.5] w-full">
            Agora você pode usar as sapatilhas e escalar no reservatório!
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterAttendance;
