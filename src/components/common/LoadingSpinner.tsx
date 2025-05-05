import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-t-teal-600 border-r-transparent border-b-teal-600 border-l-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;