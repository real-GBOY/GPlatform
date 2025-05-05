import { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

type AuthTab = 'login' | 'register';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');

  return (
    <motion.div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="mt-2 text-gray-600">
            {activeTab === 'login'
              ? 'قم بتسجيل الدخول للوصول إلى حسابك'
              : 'قم بإنشاء حساب جديد للبدء في رحلة التعلم'
            }
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'login'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-teal-500'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'register'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-teal-500'
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthPage;