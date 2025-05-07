
import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, PenLine, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

interface Goal {
  id: number;
  descricao: string;
  valor_meta: number;
  valor_atual: number;
  data_inicio: string;
  data_fim: string;
  usuario_id: number;
}

const GoalsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('metas')
        .select('*')
        .order('data_fim', { ascending: true });

      if (error) throw error;
      setGoals(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar metas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (atual: number, meta: number) => {
    return Math.min(Math.round((atual / meta) * 100), 100);
  };

  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const filteredGoals = goals.filter(goal =>
    goal.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Metas Financeiras</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Button className="bg-minhagrana-primary">
            <Plus className="mr-2 h-4 w-4" /> Nova Meta
          </Button>

          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar metas..."
                className="pl-10 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Carregando metas...</div>
        ) : filteredGoals.length === 0 ? (
          <div className="text-center py-10">
            <div className="flex justify-center mb-4">
              <Target size={48} className="text-gray-300" />
            </div>
            <p className="text-gray-500">Nenhuma meta encontrada</p>
            <p className="text-gray-400 mb-4">Crie metas para acompanhar seu progresso financeiro</p>
            <Button className="bg-minhagrana-primary">
              <Plus className="mr-2 h-4 w-4" /> Criar Primeira Meta
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metas de exemplo */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Fundo de Emergência</CardTitle>
                <CardDescription>
                  R$ 5.000,00 de R$ 10.000,00
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <Progress value={50} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  50% concluído • 120 dias restantes
                </p>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between items-center w-full">
                  <div className="text-xs text-gray-500">
                    Início: {format(new Date(), 'dd/MM/yyyy')}
                    <br />
                    Fim: {format(new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy')}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title="Editar">
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Excluir">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Viagem de Férias</CardTitle>
                <CardDescription>
                  R$ 2.000,00 de R$ 5.000,00
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <Progress value={40} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  40% concluído • 60 dias restantes
                </p>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between items-center w-full">
                  <div className="text-xs text-gray-500">
                    Início: {format(new Date(), 'dd/MM/yyyy')}
                    <br />
                    Fim: {format(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy')}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title="Editar">
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Excluir">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Novo Notebook</CardTitle>
                <CardDescription>
                  R$ 3.500,00 de R$ 4.500,00
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <Progress value={78} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  78% concluído • 30 dias restantes
                </p>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between items-center w-full">
                  <div className="text-xs text-gray-500">
                    Início: {format(new Date(), 'dd/MM/yyyy')}
                    <br />
                    Fim: {format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy')}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title="Editar">
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Excluir">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
