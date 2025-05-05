
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma implementação real, aqui seria feita a autenticação
    // Por enquanto, vamos apenas navegar para o dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-minhagrana-primary-dark to-minhagrana-primary">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          
          <h1 className="text-xl font-bold text-center mb-2">Sistema Financeiro</h1>
          <p className="text-center text-gray-500 mb-8">Faça login para gerenciar suas finanças</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <a href="#" className="text-xs text-minhagrana-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-minhagrana-primary hover:bg-minhagrana-primary-dark"
            >
              Acessar minha conta
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">ou</p>
            <Button 
              variant="outline" 
              className="w-full mt-3"
              onClick={() => navigate('/register')}
            >
              Criar uma nova conta
            </Button>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center space-x-1">
            <span className="inline-block h-4 w-4 text-minhagrana-primary">
              🔒
            </span>
            <span>Autenticação segura com proteção contra bots</span>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-minhagrana-primary to-minhagrana-primary-dark items-center justify-center p-8">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6">Organize suas finanças com facilidade</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Acompanhe suas receitas e despesas</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Crie orçamentos e metas financeiras</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Visualize relatórios personalizados</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Acesse de qualquer dispositivo</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
