import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1
        className="text-6xl font-bold text-gray-800 mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-2xl text-gray-600 mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        الصفحة غير موجودة
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/"
          className="btn btn-primary flex items-center"
        >
          <Home className="ml-2 h-5 w-5" />
          العودة للصفحة الرئيسية
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;