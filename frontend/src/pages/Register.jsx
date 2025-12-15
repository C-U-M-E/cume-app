import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    birthDate: '',
    rg: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    birthDate: '',
    rg: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', tone: 'neutral' });

  const validators = useMemo(() => ({
    name: (value) => {
      if (!value.trim()) {
        return 'Informe seu nome completo.';
      }

      if (value.trim().length < 3) {
        return 'Use ao menos 3 caracteres.';
      }

      return '';
    },
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
    birthDate: (value) => {
      if (!value) return '';

      const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(value)) {
        return 'Use o formato DD/MM/AAAA.';
      }

      return '';
    },
    rg: (value) => {
      if (!value) {
        return 'Informe o RG.';
      }

      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length < 7 || numericValue.length > 12) {
        return 'RG deve ter entre 7 e 12 dígitos.';
      }

      return '';
    },
    cpf: (value) => {
      if (!value) {
        return 'Informe o CPF.';
      }

      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length !== 11) {
        return 'CPF deve ter 11 dígitos.';
      }

      return '';
    },
    password: (value) => {
      if (!value) {
        return 'Crie uma senha.';
      }

      if (value.length < 8) {
        return 'A senha deve ter pelo menos 8 caracteres.';
      }

      if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
        return 'Use letras maiúsculas, minúsculas e números.';
      }

      return '';
    },
    confirmPassword: (value, formValues) => {
      if (!value) {
        return 'Repita a senha.';
      }

      if (value !== formValues.password) {
        return 'As senhas precisam ser iguais.';
      }

      return '';
    },
  }), []);

  const runValidation = (field, value, formValues = values) => {
    const validator = validators[field];
    if (!validator) return '';
    return validator(value, formValues);
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    setValues((prev) => {
      const nextValues = {
        ...prev,
        [field]: value,
      };

      if (touched[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: runValidation(field, value, nextValues),
        }));
      }

      if (field === 'password' && touched.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: runValidation('confirmPassword', nextValues.confirmPassword, nextValues),
        }));
      }

      return nextValues;
    });
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

    const nameError = runValidation('name', values.name);
    const emailError = runValidation('email', values.email);
    const birthDateError = runValidation('birthDate', values.birthDate);
    const rgError = runValidation('rg', values.rg);
    const cpfError = runValidation('cpf', values.cpf);
    const passwordError = runValidation('password', values.password);
    const confirmPasswordError = runValidation('confirmPassword', values.confirmPassword);

    setTouched({
      name: true,
      email: true,
      birthDate: true,
      rg: true,
      cpf: true,
      password: true,
      confirmPassword: true,
    });

    setErrors({
      name: nameError,
      email: emailError,
      birthDate: birthDateError,
      rg: rgError,
      cpf: cpfError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (nameError || emailError || birthDateError || rgError || cpfError || passwordError || confirmPasswordError) {
      setFeedback({ message: 'Revise os campos destacados para continuar.', tone: 'error' });
      return;
    }

    try {
      setFeedback({ message: 'Enviando dados...', tone: 'neutral' });

      const [day, month, year] = values.birthDate.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        birthDate: formattedDate,
        rg: values.rg.replace(/\D/g, ''),
        cpf: values.cpf.replace(/\D/g, ''),
      };

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          message: 'Cadastro realizado com sucesso! Redirecionando...',
          tone: 'success',
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setFeedback({
          message: data.error || 'Erro ao realizar cadastro.',
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
    <div className="min-h-screen bg-white lg:bg-amber-50">
      <div className="mx-auto flex min-h-screen w-full flex-col items-stretch lg:max-w-[560px] lg:py-32 lg:px-0">
        <div className="flex flex-1 flex-col bg-white lg:overflow-hidden lg:rounded-24 lg:shadow-[0px_12px_32px_rgba(62,39,35,0.12)]">
          <header className="flex items-center gap-12 px-24 pt-48 pb-0 lg:px-32 lg:pt-32">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex size-[40px] items-center justify-center rounded-8 text-brown-900 transition-colors hover:text-brown-700"
            >
              <i className="fas fa-chevron-left text-[20px]" />
            </button>
            <h1 className="text-title-h3 text-brown-900">Formulário de cadastro</h1>
          </header>

          <form className="mt-32 flex flex-1 flex-col lg:mt-24" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-1 flex-col gap-24 px-24 pb-32 overflow-y-auto lg:px-32 lg:pb-40">
              <Input
                label="Nome completo"
                name="name"
                placeholder="Como quer ser chamado"
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name ? errors.name : ''}
                required
              />

              <Input
                label="E-mail"
                type="email"
                name="email"
                placeholder="seuemail@email.com"
                autoComplete="email"
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
                autoComplete="new-password"
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

              <Input
                label="Repita sua senha"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="********"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : ''}
                required
                rightSlot={(
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-body-sm-medium text-brown-900 transition-colors hover:text-brown-700"
                  >
                    {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                )}
              />

              <Input
                label="Data de nascimento"
                name="birthDate"
                placeholder="DD/MM/AAAA"
                value={values.birthDate}
                onChange={handleChange('birthDate')}
                onBlur={handleBlur('birthDate')}
                error={touched.birthDate ? errors.birthDate : ''}
              />

              <Input
                label="RG"
                name="rg"
                placeholder="Somente números"
                value={values.rg}
                onChange={handleChange('rg')}
                onBlur={handleBlur('rg')}
                error={touched.rg ? errors.rg : ''}
                required
              />

              <Input
                label="CPF"
                name="cpf"
                placeholder="Somente números"
                value={values.cpf}
                onChange={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                error={touched.cpf ? errors.cpf : ''}
                required
              />

              {feedback.message && (
                <p className={`text-body-sm-regular ${feedbackClassName}`}>
                  {feedback.message}
                </p>
              )}

              <p className="text-body-sm-regular text-gray-700 text-center">
                Já tem conta?{' '}
                <Link to="/login" className="text-body-sm-medium text-amber-700 underline transition-colors hover:text-amber-800">
                  Entrar
                </Link>
              </p>
            </div>

            <div className="sticky bottom-0 left-0 right-0 px-24 py-16 bg-amber-50 shadow-[0_-8px_24px_rgba(62,39,35,0.08)] lg:bottom-0 lg:rounded-b-24 lg:px-32 lg:py-16 lg:shadow-none">
              <Button
                textButton="Finalizar cadastro"
                variant="primary"
                style="amber"
                showIconLeft={false}
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

