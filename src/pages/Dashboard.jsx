import React from 'react';
import { ArrowRight, Activity, Shield, Heart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      {/* Editorial Hero Banner */}
      <div className="glass-panel" style={{ padding: '5rem 2rem', marginBottom: '3rem', textAlign: 'center', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--danger)', marginBottom: '1.5rem', display: 'block' }}>
          {t('dashboard.guideLabel')}
        </span>
        <h2 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--primary)', maxWidth: '900px' }}>
          {t('dashboard.heroTitle')}
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '800px' }}>
          {t('dashboard.heroDesc')}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link to="/report" className="btn btn-danger" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            <Shield size={20} /> {t('dashboard.btnComplaint')}
          </Link>
          <Link to="/assessment" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            {t('dashboard.btnScreener')}
          </Link>
        </div>
      </div>

      {/* Editor's Picks Grid */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h3 style={{ margin: 0, fontSize: '2rem' }}>{t('dashboard.editorsPicks')}</h3>
        <Link to="/awareness" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>{t('dashboard.viewAll')} <ArrowRight size={16}/></Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* Card 1 */}
        <Link to="/assessment" className="glass-panel" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', textDecoration: 'none', background: 'white' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '12px', background: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={48} color="var(--primary)" opacity={0.8} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase' }}>{t('dashboard.tool1Label')}</span>
            <h4 style={{ margin: '0.5rem 0', fontSize: '1.3rem' }}>{t('dashboard.tool1Title')}</h4>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('dashboard.tool1Desc')}</p>
          </div>
        </Link>

        {/* Card 2 */}
        <Link to="/awareness" className="glass-panel" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', textDecoration: 'none', background: 'white' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '12px', background: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={48} color="var(--primary)" opacity={0.8} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase' }}>{t('dashboard.tool2Label')}</span>
            <h4 style={{ margin: '0.5rem 0', fontSize: '1.3rem' }}>{t('dashboard.tool2Title')}</h4>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('dashboard.tool2Desc')}</p>
          </div>
        </Link>

        {/* Card 3 */}
        <Link to="/complaints" className="glass-panel" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', textDecoration: 'none', background: 'white' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '12px', background: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={48} color="var(--primary)" opacity={0.8} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase' }}>{t('dashboard.tool3Label')}</span>
            <h4 style={{ margin: '0.5rem 0', fontSize: '1.3rem' }}>{t('dashboard.tool3Title')}</h4>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('dashboard.tool3Desc')}</p>
          </div>
        </Link>

        {/* Card 4 */}
        <Link to="/report" className="glass-panel" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', textDecoration: 'none', background: 'white' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '12px', background: 'rgba(216, 66, 66, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={48} color="var(--danger)" opacity={0.8} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase' }}>{t('dashboard.tool4Label')}</span>
            <h4 style={{ margin: '0.5rem 0', fontSize: '1.3rem', color: 'var(--text-main)' }}>{t('dashboard.tool4Title')}</h4>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('dashboard.tool4Desc')}</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Dashboard;
