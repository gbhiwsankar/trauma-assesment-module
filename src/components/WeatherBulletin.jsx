import React from 'react';

const WeatherBulletin = () => {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 999999 }}>
      <header style={{ background: '#1e3a8a', color: 'white', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://mausam.imd.gov.in/imd_latest/contents/img/imd_logo.png" alt="IMD Logo" style={{ width: '40px' }} onError={(e) => e.target.style.display = 'none'} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'sans-serif', color: 'white' }}>India Meteorological Department</h1>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Ministry of Earth Sciences, Government of India</p>
        </div>
      </header>
      <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
        <h2 style={{ borderBottom: '2px solid #1e3a8a', paddingBottom: '0.5rem', color: '#1e3a8a' }}>National Weather Bulletin</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#334155' }}>Current Satellite Imagery</h3>
            <div style={{ width: '100%', height: '200px', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              Loading Satellite Data...
            </div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#334155' }}>Regional Forecast</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', lineHeight: '1.8' }}>
              <li><strong>North West India:</strong> Dry weather very likely.</li>
              <li><strong>Central India:</strong> Thunderstorms expected in isolated places.</li>
              <li><strong>South Peninsula:</strong> Heavy rainfall warning issued.</li>
              <li><strong>East India:</strong> Generally cloudy sky.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherBulletin;
