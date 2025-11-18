import React from 'react';
import Button from '../../components/Button';
import emptyStateTerms from '../../assets/images/empty-state-terms.svg';

function DisclaimerPage() {
  const handleSignDisclaimer = () => {
    console.log('Assinar termo de responsabilidade');
    // Aqui será implementada a lógica de assinatura do termo
  };

  return (
    <div className="h-full bg-white flex flex-col items-center px-24">
      {/* Scrollable Content Area */}
      <div className="flex-1 flex flex-col gap-32 items-center justify-center max-w-[480px] w-full overflow-y-auto pt-0 pb-32">
        {/* Empty State Illustration */}
        <div className="h-[331px] relative shrink-0 w-[275px]">
          <img 
            src={emptyStateTerms} 
            alt="Imagem vetorial de um termo de responsabilidade"
            className="block max-w-none size-full"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-12 items-start text-center w-full">
          <p className="text-body-lg-medium text-brown-900 leading-[1.5] w-full">
            Documento para poder emitir a carteirinha e escalar
          </p>
          <p className="text-body-md-regular text-gray-600 leading-[1.5] w-full">
            Este documento é válido por 6 meses
          </p>
        </div>
      </div>

      {/* Fixed Button at Bottom */}
      <div className="w-full max-w-[480px] pb-24 shrink-0">
        <Button
          variant="primary"
          style="amber"
          textButton="Assinar termo"
          showIconLeft={false}
          showIconRight={false}
          onClick={handleSignDisclaimer}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default DisclaimerPage;
