import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, Download, Plus, CheckCircle2 } from 'lucide-react';
import AddPaymentMethodModal from './AddPaymentMethod';

const BillingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const plans = [
    {
      name: 'Basic',
      price: '$9',
      features: ['5 Projects', '10GB Storage', 'Basic Support'],
      id: 'basic'
    },
    {
      name: 'Pro',
      price: '$29',
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'API Access'],
      id: 'pro'
    },
    {
      name: 'Enterprise',
      price: '$99',
      features: ['Unlimited Everything', 'Dedicated Support', 'Custom Features', 'SLA Guarantee'],
      id: 'enterprise'
    }
  ];

  const transactions = [
    { date: '2024-02-15', amount: '$29.00', status: 'Paid', invoice: '#INV-2024-001' },
    { date: '2024-01-15', amount: '$29.00', status: 'Paid', invoice: '#INV-2024-002' },
    { date: '2023-12-15', amount: '$29.00', status: 'Paid', invoice: '#INV-2024-003' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-full flex flex-col gap-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Billing Settings</h2>
        <p className="text-gray-400">Manage your subscription and billing information</p>
      </motion.div>

      {/* Current Plan Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 border border-brandPrimary/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Current Plan</h3>
            <p className="text-cyan-400">Pro Plan - Monthly</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Cancel Plan
            </button>
            <button className="px-4 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Subscription Plans */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-xl border transition-all duration-300 ${selectedPlan === plan.id
              ? 'border-brandPrimary bg-brandPrimary/10'
              : 'border-gray-700 bg-gray-900/50 hover:border-brandPrimary/30'
              }`}
          >
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold text-cyan-400">{plan.price}</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <CheckCircle2 className="w-5 h-5 text-brandPrimary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full py-2 rounded-lg transition-colors ${selectedPlan === plan.id
                ? 'bg-brandPrimary text-black font-medium hover:bg-cyan-400'
                : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
            >
              {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </motion.div>

      {/* Payment Methods */}
      <motion.div variants={itemVariants} className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Method
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brandPrimary/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-brandPrimary" />
            </div>
            <div>
              <p className="text-white font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-400">Expires 12/25</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-brandPrimary/10 text-cyan-400 text-sm rounded-full">Default</span>
        </div>
      </motion.div>

      {/* Billing History */}
      <motion.div variants={itemVariants} className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4 text-gray-400 font-medium">Date</th>
                <th className="pb-4 text-gray-400 font-medium">Amount</th>
                <th className="pb-4 text-gray-400 font-medium">Status</th>
                <th className="pb-4 text-gray-400 font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="py-4 text-white">{transaction.date}</td>
                  <td className="py-4 text-white">{transaction.amount}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                      <Download className="w-4 h-4" />
                      {transaction.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default BillingSection;