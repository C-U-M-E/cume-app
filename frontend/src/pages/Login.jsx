import React, { useMemo, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext'; 
import Button from '../components/Button';
import Input from '../components/Input';
import logoImage from '../assets/images/logo-image.svg';
import logoText from '../assets/images/cume-text-logo.svg';

function Login() {
const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', tone: 'neutral' });

  const validators = useMemo(() => ({
    email: (value) => {
      if (!value) {
        return 'Informe um e-mail.';
      }

      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
      if (!emailRegex.test(value)) {
        return 'Digite um e-mail válido.';
      }

      return '';
    },
    password: (value) => {
      if (!value) {
        return 'Informe uma senha.';
      }

      if (value.length < 8) {
        return 'A senha deve ter pelo menos 8 caracteres.';
      }

      if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
        return 'Use letras maiúsculas, minúsculas e números.';
      }

      return '';
    },
  }), []);

  const runValidation = (field, value) => {
    const validator = validators[field];
    if (!validator) return '';
    return validator(value);
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: runValidation(field, value),
      }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: runValidation(field, values[field]),
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = runValidation('email', values.email);
    const passwordError = runValidation('password', values.password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      setFeedback({
        message: 'Revise os campos destacados para continuar.',
        tone: 'error',
      });
      return;
    }

    try {
      setFeedback({ message: 'Entrando...', tone: 'neutral' });

      // 1. Chamada ao Backend
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Sucesso: Backend retornou { user, token }
        login(data.user, data.token);

        setFeedback({
          message: 'Login realizado com sucesso!',
          tone: 'success',
        });

        // 3. Redirecionar para a Home
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        // Erro (Senha errada, usuário não existe)
        setFeedback({
          message: data.error || 'E-mail ou senha incorretos.',
          tone: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      setFeedback({
        message: 'Erro de conexão com o servidor.',
        tone: 'error',
      });
    }
  };

  const feedbackClassName = useMemo(() => {
    if (!feedback.message) return 'text-gray-700';
    if (feedback.tone === 'error') return 'text-danger';
    if (feedback.tone === 'success') return 'text-amber-700';
    return 'text-gray-700';
  }, [feedback]);
  
  return (
    <div className="min-h-screen bg-white lg:bg-amber-50 flex items-center justify-center px-24 py-64">
      <div className="flex w-full max-w-[416px] flex-col items-center gap-56 lg:rounded-24 lg:bg-white lg:px-40 lg:py-64 lg:shadow-[0px_12px_32px_rgba(62,39,35,0.12)]">
        <div className="flex flex-col items-center gap-24">
          <div className="relative size-[120px] rounded-full bg-brown-900 shadow-[0px_16px_32px_rgba(62,39,35,0.2)] overflow-hidden">
            <img
              src={logoImage}
              alt="Logo do CUME - Centro Universitário de Montanhismo e Excursionismo"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <img src={logoText} alt="CUME - Centro Universitário de Montanhismo e Excursionismo" className="h-[20px] w-auto" />
        </div>

        <form className="flex w-full flex-col gap-24" onSubmit={handleSubmit} noValidate>
          <Input
            label="E-mail"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="seuemail@email.com"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email ? errors.email : ''}
            required
          />

          <Input
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            placeholder="********"
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password ? errors.password : ''}
            required
            rightSlot={(
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-body-sm-medium text-brown-900 transition-colors hover:text-brown-700"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            )}
          />

          <button
            type="button"
            onClick={() => setFeedback({ message: 'Função em desenvolvimento. Entre em contato com um administrador para recuperar sua senha.', tone: 'neutral' })}
            className="self-end text-body-sm-medium text-amber-700 underline transition-colors hover:text-amber-800"
          >
            Esqueci minha senha
          </button>

          {feedback.message && (
            <p className={`text-body-sm-regular ${feedbackClassName}`}>
              {feedback.message}
            </p>
          )}

          <Button
            textButton="Entrar"
            variant="primary"
            style="amber"
            showIconLeft={false}
            className="w-full"
          />

          <p className="text-body-sm-regular text-brown-900 text-center">
            Ainda não possui conta?{' '}
            <Link
              to="/register"
              className="text-body-sm-medium text-amber-700 underline transition-colors hover:text-amber-800"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

