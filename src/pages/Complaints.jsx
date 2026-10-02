import React, { useState } from 'react';
import { Scale, FileText, Phone, MapPin, Building, ChevronRight } from 'lucide-react';

const Complaints = () => {
  const [search, setSearch] = useState('');

  const contacts = [
    { district: 'Delhi NCR', officer: 'Dr. Ramesh Kumar', role: 'District Social Welfare Officer', phone: '011-2338-9001' },
    { district: 'Mumbai Suburbs', officer: 'Ms. Sunita Patil', role: 'DLSA Legal Aid Panel', phone: '022-2200-8772' },
    { district: 'Bangalore Urban', officer: 'Mr. Vivek Rao', role: 'Special Public Prosecutor (PoA)', phone: '080-2559-3321' },
  ];

  const filtered = contacts.filter(c => c.district.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <div className="text-center mb-4">
        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--danger)', marginBottom: '1rem', display: 'block' }}>
          Statutory Rights Desk
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Protective Justice Sanctuary</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Clear, accessible breakdowns of your rights under the SC/ST (Prevention of Atrocities) Act. You are entitled to immediate protection and mandatory relief.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Statutory Rights Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ background: 'white' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--surface-color)', padding: '0.75rem', borderRadius: '12px' }}>
                <Scale size={24} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Section 15A Witness Protection</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 600 }}>IMMEDIATE RIGHT</span>
              </div>
            </div>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              The State must protect victims, their dependents, and witnesses against any kind of intimidation, coercion, or violence. You have the right to demand concealment of your identity and secure video-recorded proceedings.
            </p>
          </div>



          <div className="glass-panel" style={{ background: 'white' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--surface-color)', padding: '0.75rem', borderRadius: '12px' }}>
                <Building size={24} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>60-Day Investigation Mandate</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>LEGAL TIMELINE</span>
              </div>
            </div>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              Special Courts must be established to ensure the trial is completed within two months. You have the right to be informed about the status of the investigation at every stage.
            </p>
          </div>
        </div>

      </div>

      {/* District Directory */}
      <div className="glass-panel" style={{ background: 'white' }}>
        <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MapPin size={28} /> DLSA Legal Aid & District Directory
        </h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>
          Find direct contacts for District Social Welfare Officers and free DLSA legal advocates in your area.
        </p>

        <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by District, City, or State..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: '1rem', padding: '1rem' }}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          {filtered.length > 0 ? (
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filtered.map((c, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--primary)', fontSize: '1.1rem' }}>{c.district}</h4>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: 600 }}>{c.officer}</p>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.role}</p>
                  </div>
                  <a href={`tel:${c.phone}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <Phone size={16} /> {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No specific district found. Please call the central DLSA helpline at 15100.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Complaints;
