import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FocusKubePage from './pages/FocusKubePage';
import ProductsPage from './pages/Products';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';

function useScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);
}

export default function App() {
  useScrollToTop();
  useGoogleAnalytics();

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/focuskube" element={<FocusKubePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
