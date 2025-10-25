import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isPublicPage = ['/home', '/about', '/features', '/services', '/gallery', '/careers', '/contact'].includes(location.pathname);
  const showSidebar = isAuthenticated && !isAuthPage && !isPublicPage;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAuthPage && <Navbar />}

      <div className="flex flex-1">
        {showSidebar && <Sidebar />}

        <main className={`flex-1 ${showSidebar ? 'ml-64' : ''} ${!isAuthPage ? 'pt-16' : ''}`}>
          <div className={`${!isAuthPage && !isPublicPage ? 'p-6' : ''}`}>
            <AppRoutes />
          </div>
        </main>
      </div>

      {!isAuthPage && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
