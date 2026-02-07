<!DOCTYPE html>
<html lang="kn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOB Chadachan BC App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', 'Noto Sans Kannada', sans-serif;
        }
    </style>
<script type="importmap">
{
  "imports": {
    "react/": "https://esm.sh/react@^19.2.4/",
    "react": "https://esm.sh/react@^19.2.4",
    "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
    "@google/genai": "https://esm.sh/@google/genai@^1.40.0"
  }
}
</script>
</head>
<body class="bg-gray-50">
    <div id="root"></div>
</body>
</html>
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ServiceGrid from './components/ServiceGrid';
import TransactionForm from './components/TransactionForm';
import GeminiAssistant from './components/GeminiAssistant';
import { ServiceType, Transaction } from './types';
import { TRANSLATIONS, COLORS } from './constants';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleTransactionSubmit = (data: { aadhaar: string; amount: number }) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedService!,
      amount: data.amount,
      aadhaarNumber: data.aadhaar.replace(/.(?=.{4})/g, 'x'), // Masking
      timestamp: new Date(),
      status: 'SUCCESS',
    };

    setTransactions([newTransaction, ...transactions]);
    setSelectedService(null);
    setNotification({ 
      message: `${TRANSLATIONS[selectedService!]} ${TRANSLATIONS.SUCCESS}!`, 
      type: 'success' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full p-4">
        {notification && (
          <div 
            className={`mb-4 p-4 rounded-xl text-white font-bold flex items-center gap-2 animate-bounce ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notification.type === 'success' ? '✅' : '❌'} {notification.message}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">{TRANSLATIONS.WELCOME}</h2>
          <ServiceGrid onSelectService={setSelectedService} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <GeminiAssistant />
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">{TRANSLATIONS.RECENT_ACTIVITY}</h3>
                <span className="text-xs text-gray-400">View All</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
                {transactions.length === 0 ? (
                  <div className="p-10 text-center text-gray-400 italic">
                    ಇನ್ನೂ ಯಾವುದೇ ವಹಿವಾಟುಗಳಿಲ್ಲ. (No transactions yet)
                  </div>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 font-bold">
                          {tx.type[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{TRANSLATIONS[tx.type]}</p>
                          <p className="text-xs text-gray-500">{tx.aadhaarNumber} • {tx.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                          {tx.amount > 0 ? `₹${tx.amount}` : '-'}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-blue-900 text-white p-6 rounded-3xl shadow-lg">
                <p className="text-sm opacity-80 mb-1">Total Limit</p>
                <h4 className="text-3xl font-bold mb-4">₹ 4,50,000</h4>
                <div className="h-2 bg-blue-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[65%]"></div>
                </div>
                <p className="text-[10px] mt-2 opacity-60 italic">Updated: Real-time from Chadachan Node</p>
             </div>

             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
               <h4 className="font-bold text-gray-800 mb-4">Quick Actions</h4>
               <div className="space-y-2">
                 {['ಬ್ಯಾಂಕ್ ವರದಿ', 'ಸೆಟಲ್ಮೆಂಟ್', 'ಸಹಾಯ'].map((item) => (
                   <button key={item} className="w-full text-left p-3 rounded-xl hover:bg-orange-50 text-gray-600 text-sm font-medium transition-colors border border-transparent hover:border-orange-100">
                     {item} →
                   </button>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </main>

      {selectedService && (
        <TransactionForm 
          serviceType={selectedService}
          onSubmit={handleTransactionSubmit}
          onCancel={() => setSelectedService(null)}
        />
      )}

      {/* Persistent Bottom Bar for Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around sm:hidden">
        <button className="flex flex-col items-center gap-1 text-orange-600">
          <span className="text-xl">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">📋</span>
          <span className="text-[10px]">Reports</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">👤</span>
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
