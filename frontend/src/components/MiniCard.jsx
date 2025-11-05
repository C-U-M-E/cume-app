import React from 'react';
import Button from './Button';
import CardVector from './CardVector';

/**
 * Componente MiniCard - Card de carteirinha com diferentes estados e tamanhos
 * 
 * @param {Object} props
 * @param {"nao-emitida" | "vencida" | "active"} props.type - Tipo/estado da carteirinha (padrão: "active")
 * @param {"small" | "large"} props.size - Tamanho do card (padrão: "small")
 * @param {string} props.name - Nome do usuário
 * @param {string} props.avatar - URL do avatar/foto do usuário
 * @param {string} props.birthDate - Data de nascimento (formato: DD/MM/YYYY)
 * @param {string} props.rg - RG do usuário (será mascarado)
 * @param {string} props.cpf - CPF do usuário (será mascarado)
 * @param {string} props.issueDate - Data de emissão (formato: DD/MM/YYYY)
 * @param {string} props.expiryDate - Data de validade (formato: DD/MM/YYYY)
 * @param {Function} props.onButtonClick - Callback ao clicar no botão
 * @param {string} props.className - Classes adicionais do Tailwind
 */
const MiniCard = ({
  type = "active",
  size = "small",
  name = "Gabriel Filho",
  avatar,
  birthDate = "05/01/2003",
  rg = "23******23",
  cpf = "440******12",
  issueDate,
  expiryDate,
  onButtonClick,
  className = ''
}) => {
  // Mascara o RG e CPF
  const maskRG = (value) => {
    if (!value) return '';
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return value; // Muito curto para mascarar
    if (numbers.length <= 8) {
      // Para RG até 8 dígitos: mostra 2 primeiros, mascara o meio, mantém os últimos
      const first = numbers.substring(0, 2);
      const last = numbers.substring(numbers.length - 2);
      return `${first}*****${last}`;
    }
    // Para RG com mais de 8 dígitos: mostra 2 primeiros, mascara o meio, mantém 2 últimos
    const first = numbers.substring(0, 2);
    const last = numbers.substring(numbers.length - 2);
    return `${first}*****${last}`;
  };

  const maskCPF = (value) => {
    if (!value) return '';
    if (value.length <= 9) return value.replace(/(\d{3})(\d{6})/, '$1******$2');
    return value.replace(/(\d{3})(\d{6})(\d{2})/, '$1******$3');
  };

  // Configurações baseadas no type
  const getTypeConfig = () => {
    switch (type) {
      case 'nao-emitida':
        return {
          bgColor: 'bg-brown-50',
          borderColor: 'border-2 #F5F2F0',
          shadow: 'shadow-[0px_0px_24px_0px_rgba(62,39,35,0.15)]',
          badgeBg: 'bg-brown-100',
          badgeText: 'Não emitida',
          iconBg: 'bg-brown-100',
          icon: 'exclamation',
          title: 'Sem carteirinha',
          description: 'Envie seus documentos para poder escalar',
          buttonText: 'Emitir carteirinha',
        };
      case 'vencida':
        return {
          bgColor: 'bg-amber-700',
          borderColor: 'border-2 border-amber-200',
          shadow: '',
          badgeBg: 'bg-amber-900',
          badgeText: 'Vencida',
          iconBg: 'bg-amber-900',
          icon: 'exclamation',
          title: 'Carteirinha vencida',
          description: 'Renove seu termo de responsabilidade',
          buttonText: 'Renovar carteirinha',
        };
      case 'active':
      default:
        return {
          bgColor: 'bg-amber-600',
          borderColor: 'border-2 border-amber-200',
          shadow: '',
          badgeBg: 'bg-amber-800',
          badgeText: 'Ativa',
          iconBg: 'bg-amber-800',
          icon: 'check',
          title: 'Carteirinha ativa',
          description: 'Está tudo certo, você pode escalar!',
          buttonText: 'Acessar carteirinha',
        };
    }
  };

  const config = getTypeConfig();
  const displayRG = maskRG(rg);
  const displayCPF = maskCPF(cpf);

  // SMALL SIZE
  if (size === 'small') {
    return (
      <div className={`backdrop-blur-md backdrop-filter ${config.bgColor} ${config.borderColor} ${config.shadow} rounded-[15px] p-24 relative overflow-hidden w-full ${className}`}>
        {/* Decorative vectors */}
        <div 
          className="absolute h-[150px] right-0 top-0 w-[150px] pointer-events-none opacity-80"
        >
          <CardVector position="top-right" type={type} />
        </div>
        <div 
          className="absolute bottom-0 left-0 h-[147px] w-[205px] pointer-events-none opacity-80"
        >
          <CardVector position="bottom-left" type={type} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-24 relative z-10">
          {/* Status section */}
          <div className="flex gap-12 items-top pl-0 pr-12 py-4 rounded-8 w-full">
            <div className={`${config.iconBg || ''} flex items-center justify-center rounded-full shrink-0 size-48 p-4`}>
              {config.icon === 'exclamation' ? (
                <i className="fas fa-exclamation text-brown-900 text-[20px]" />
              ) : (
                <i className="fas fa-check text-brown-900 text-[20px]" />
              )}
            </div>
            <div className="flex flex-col grow items-start justify-center min-w-0">
              <p className="text-title-h3 text-brown-900 leading-[1.4] w-full">
                {config.title}
              </p>
              <p className="text-body-md-regular text-brown-800 leading-[1.5] w-full">
                {config.description}
              </p>
            </div>
          </div>

          {/* Button */}
          <Button
            variant="primary"
            style="brown"
            showIconLeft={true}
            iconType="specific-icon"
            specificIcon="carteirinha-white"
            textButton={config.buttonText}
            onClick={onButtonClick}
            className="w-full"
          />
        </div>
      </div>
    );
  }

  // LARGE SIZE
  return (
    <div className={`flex flex-col gap-48 items-start w-full max-w-[400px] ${className}`}>
      <div className={`backdrop-blur-md backdrop-filter ${config.bgColor} ${config.borderColor} ${config.shadow} rounded-[15px] p-16 relative overflow-hidden w-full`}>
        {/* Decorative vectors */}
        <div 
          className="absolute h-[150px] right-0 top-0 w-[150px] pointer-events-none opacity-80"
        >
          <CardVector position="top-right" type={type} />
        </div>
        <div 
          className="absolute bottom-0 left-0 h-[147px] w-[205px] pointer-events-none opacity-80"
        >
          <CardVector position="bottom-left" type={type} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-16 relative z-10">
          {/* Top section: Photo + Info */}
          <div className="flex gap-16 items-start rounded-8 w-full">
            {/* Photo */}
            <div className="h-[120px] relative rounded-12 shrink-0 w-96 overflow-hidden">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt={name}
                  className="w-full h-full object-cover rounded-12"
                />
              ) : (
                <div className="w-full h-full bg-amber-300 rounded-12 flex items-center justify-center">
                  <i className="fas fa-user text-brown-900 text-[48px]" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-16 grow items-start justify-center min-w-0">
              {/* Name and birth date */}
              <div className="flex flex-col gap-4 items-start leading-[0] text-brown-900 w-full">
                <p className="text-title-h3 text-brown-900 leading-[1.4]">
                  {name}
                </p>
                <p className="text-body-md-regular text-brown-900 leading-[1.5]">
                  {birthDate}
                </p>
              </div>

              {/* Badge */}
              <div className={`${config.badgeBg} flex gap-10 items-center justify-center px-16 py-4 rounded-8 shrink-0`}>
                <p className="text-body-lg-medium text-brown-900 whitespace-nowrap leading-[1.5]">
                  {config.badgeText}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom section: RG, CPF, Emissão, Validade */}
          <div className="flex gap-8 items-center justify-center px-8 py-0 shrink-0 w-full">
            {/* RG */}
            <div className="flex flex-col grow justify-center leading-[1.5] min-w-0 text-brown-900">
              <p className="text-body-md-medium mb-0">RG </p>
              <p className="text-body-sm-regular">{displayRG}</p>
            </div>

            {/* CPF */}
            <div className="flex flex-col grow justify-center leading-[1.5] min-w-0 text-brown-900">
              <p className="text-body-md-medium mb-0">CPF </p>
              <p className="text-body-sm-regular">{displayCPF}</p>
            </div>

            {/* Emissão e Validade */}
            <div className="flex flex-col gap-2 items-start leading-[0] text-brown-900 shrink-0 w-[96.667px]">
              <div className="flex flex-col justify-center shrink-0 w-full">
                <p className="text-body-sm-regular leading-[1.5]">
                  <span className="text-body-md-medium">EMI</span> {issueDate || '-'}
                </p>
              </div>
              <div className="flex flex-col justify-center shrink-0 w-full">
                <p className="text-body-sm-regular leading-[1.5]">
                  <span className="text-body-md-medium">VAL</span> {expiryDate || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCard;

