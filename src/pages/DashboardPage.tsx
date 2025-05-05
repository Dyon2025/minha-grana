
import React, { useState } from 'react';
import { CircleChart } from '@/components/CircleChart';
import { MonthSelector } from '@/components/MonthSelector';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionItem } from '@/components/TransactionItem';
import { TrendingUp, TrendingDown, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const DashboardPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentView, setCurrentView] = useState<"day" | "week" | "month">("month");

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Dados de exemplo para o gráfico
  const chartData = [
    { name: "Receitas", value: 30, color: "#27ae60" },
    { name: "Despesas", value: 0, color: "#EB5757" },
  ];

  // Transações de exemplo
  const transactions = [
    {
      id: 1,
      title: "Serviço de streaming",
      amount: 30,
      date: new Date(),
      type: "income" as const,
      category: "IPTV",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <MonthSelector
          currentMonth={currentMonth}
          currentYear={currentYear}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onSelectView={setCurrentView}
          currentView={currentView}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Receitas do Mês"
          amount="R$ 30,00"
          subtitle="Total de receitas do Mês"
          icon={<TrendingUp className="w-6 h-6" />}
          variant="income"
        />
        
        <SummaryCard
          title="Despesas do Mês"
          amount="R$ 0,00"
          subtitle="Total de despesas do Mês"
          icon={<TrendingDown className="w-6 h-6" />}
          variant="expense"
        />
        
        <SummaryCard
          title="Saldo do Mês"
          amount="R$ 30,00"
          subtitle={`${format(new Date(currentYear, currentMonth), 'MMMM yyyy')}`}
          icon={<Wallet className="w-6 h-6" />}
          variant="balance"
        />
        
        <SummaryCard
          title="Despesas/Receitas"
          amount="0%"
          subtitle="Despesas menores que receitas"
          icon={<TrendingDown className="w-6 h-6" />}
          variant="ratio"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-md shadow-sm p-6">
          <h2 className="font-medium mb-4">Receitas x Despesas</h2>
          <p className="text-sm text-gray-500">1 de maio - 31 de maio</p>
          
          <div className="my-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-minhagrana-primary rounded-full mr-2"></div>
                <span className="text-sm">Receitas</span>
              </div>
              <span className="text-sm font-medium">R$ 30,00</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-minhagrana-primary h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="my-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-minhagrana-danger rounded-full mr-2"></div>
                <span className="text-sm">Despesas</span>
              </div>
              <span className="text-sm font-medium">R$ 0,00</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-minhagrana-danger h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Saldo do período</span>
              <span className="text-sm font-bold text-minhagrana-primary">R$ 30,00</span>
            </div>
            <p className="text-sm text-gray-500">Suas receitas superaram as despesas em R$ 30,00</p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <CircleChart data={chartData} />
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-white rounded-md shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-medium">Últimos Registros</h2>
            <Button variant="ghost" className="text-minhagrana-primary hover:text-minhagrana-primary-dark p-0 h-auto">
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex mb-4">
            <Input
              placeholder="Buscar..."
              className="mr-2"
            />
            <Button variant="outline">Todas</Button>
          </div>
          
          <div className="mt-4 max-h-[320px] overflow-y-auto">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                date={transaction.date}
                type={transaction.type}
                category={transaction.category}
              />
            ))}
            
            {transactions.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                Nenhuma transação registrada
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
