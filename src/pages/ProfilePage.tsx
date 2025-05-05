
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Lock, CreditCard } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.user_metadata?.username || '',
    email: user?.email || '',
    phone: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [lastAccess] = useState(new Date().toLocaleString('pt-BR'));
  const [registrationDate] = useState('23/04/2025 18:41');
  const [plan] = useState('Free');

  const userInitials = profile.fullName
    ? profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : 'U';

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          username: profile.fullName,
          phone: profile.phone
        }
      });

      if (error) throw error;

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: error.message || "Não foi possível atualizar o perfil",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Senhas não coincidem",
        description: "A nova senha e a confirmação devem ser iguais",
      });
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso",
      });
      
      // Clear password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao alterar senha",
        description: error.message || "Não foi possível alterar a senha",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações da Conta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={18} />
              Informações da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-2xl bg-minhagrana-primary text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="text-xl font-medium">{profile.fullName}</h3>
            <p className="text-muted-foreground">{profile.email}</p>
            
            <div className="w-full mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Celular:</span>
                <span>{profile.phone || '557193998011'}</span>
              </div>
              <div className="flex justify-between">
                <span>Data de cadastro:</span>
                <span>{registrationDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Último acesso:</span>
                <span>{lastAccess}</span>
              </div>
              <div className="flex justify-between">
                <span>Plano:</span>
                <span>{plan}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Atualizar Informações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={18} />
              Atualizar Informações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Nome completo
                  </label>
                  <Input 
                    id="fullName" 
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    E-mail
                  </label>
                  <Input 
                    id="email" 
                    value={profile.email}
                    readOnly
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Celular
                    <span className="ml-1 text-muted-foreground text-xs">(opcional)</span>
                  </label>
                  <div className="relative">
                    <Input 
                      id="phone" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      placeholder="557193998011"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-2 bg-green-500 hover:bg-green-600"
                  disabled={loading}
                >
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Alterar Senha */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={18} />
              Alterar Senha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                    Senha atual
                  </label>
                  <Input 
                    id="currentPassword" 
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                    Nova senha
                  </label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirmar nova senha
                  </label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  Alterar Senha
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Faturamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard size={18} />
              Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Plano atual:</span>
              <span className="font-medium">{plan}</span>
            </div>
            
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600"
            >
              Adquirir Plano Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
