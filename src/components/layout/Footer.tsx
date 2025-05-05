import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-teal-400" />
              <span className="mr-2 text-xl font-bold">محسن</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">
              منصة التعلم الإلكتروني الرائدة في المنطقة العربية، توفر تجربة تعليمية متكاملة للمعلمين والطلاب.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="/auth" className="text-gray-400 hover:text-white transition-colors">تسجيل الدخول</a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">لوحة التحكم</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">البريد الإلكتروني: info@taelim.com</li>
              <li className="text-gray-400">الهاتف: +966 12 345 6789</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} منصة تعليم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;