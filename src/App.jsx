import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Globe, Phone, FileText, Activity, Shield, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Dashboard from './pages/Dashboard';
import Awareness from './pages/Awareness';
import Assessment from './pages/Assessment';
import Complaints from './pages/Complaints';
import Report from './pages/Report';
import StealthExitWrapper from './components/StealthExitWrapper';

const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  
  return (
    <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: 'white', borderBottom: '1px solid var(--surface-border)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
      {/* Zone 1: Utility & Trust */}
      <div style={{ background: 'var(--primary)', color: 'white', fontSize: '0.8rem', padding: '0.4rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Shield size={14} /> {t('header.ministry')}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Globe size={14} /> 
              <select 
                value={i18n.language.split('-')[0]} 
                onChange={changeLanguage}
                style={{ 
                  background: 'transparent', 
                  color: 'white', 
                  border: 'none', 
                  outline: 'none', 
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                <option value="en" style={{ color: 'black' }}>English</option>
                <option value="hi" style={{ color: 'black' }}>हिंदी</option>
                <option value="mr" style={{ color: 'black' }}>मराठी</option>
                <option value="bn" style={{ color: 'black' }}>বাংলা</option>
                <option value="ta" style={{ color: 'black' }}>தமிழ்</option>
                <option value="te" style={{ color: 'black' }}>తెలుగు</option>
              </select>
            </span>
          </div>
        </div>
      </div>

      {/* Zone 2: Main Brand & Nav */}
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <Link to="/" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '2.2rem', letterSpacing: '-0.04em' }}>{t('header.title')}</h1>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--secondary)' : 'var(--text-main)' }}>{t('header.home')}</Link>
          <Link to="/report" style={{ color: location.pathname === '/report' ? 'var(--danger)' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
             {t('header.fileComplaint')}
          </Link>
          <Link to="/assessment" style={{ color: location.pathname === '/assessment' ? 'var(--secondary)' : 'var(--text-main)' }}>{t('header.assessment')}</Link>
          <Link to="/awareness" style={{ color: location.pathname === '/awareness' ? 'var(--secondary)' : 'var(--text-main)' }}>{t('header.awareness')}</Link>
          <Link to="/complaints" style={{ color: location.pathname === '/complaints' ? 'var(--secondary)' : 'var(--text-main)' }}>{t('header.rights')}</Link>
          <a href="tel:1800111222" className="btn" style={{ background: 'var(--danger)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '99px', textDecoration: 'none' }}>
            <Phone size={16} /> {t('header.helpline')}
          </a>
        </nav>
      </div>

    </header>
  );
};

const AppContent = () => {
  return (
    <StealthExitWrapper>
      <Header />
      <div className="page-container animate-fade-in" style={{ paddingTop: '8rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/complaints" element={<Complaints />} />
        </Routes>
      </div>
    </StealthExitWrapper>
  );
};

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  );
}

export default App;
