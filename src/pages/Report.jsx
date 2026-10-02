import React, { useState } from 'react';
import { Send, Lock, FileCheck, UploadCloud, EyeOff } from 'lucide-react';

const Report = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate secure submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-4">
        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--danger)', marginBottom: '1rem', display: 'block' }}>
          Official Reporting Portal
        </span>
        <h1 style={{ marginBottom: '1rem' }}>File a Secure Complaint</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Securely report mental torture, harassment, or emotional abuse under the SC/ST Act. Your data is end-to-end encrypted and protected by witness protection laws.
        </p>
      </div>

      <div className="glass-panel" style={{ background: 'white' }}>
        {submitted ? (
          <div className="text-center py-4 animate-fade-in">
            <FileCheck size={64} className="text-success mx-auto mb-3" style={{ margin: '0 auto' }} />
            <h2 className="mb-2">Complaint Successfully Registered</h2>
            <p className="text-muted mb-4">
              Your report has been securely transmitted to the Integrated Portal. 
              {isAnonymous ? " You have submitted this anonymously." : " An investigator will review your case and contact you securely."}
            </p>
            <div className="p-3" style={{ background: 'var(--surface-color)', borderRadius: '8px', display: 'inline-block' }}>
              <p className="text-main mb-1"><strong>Reference ID:</strong> ID-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Please write down this ID for tracking purposes.</p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                File Another Report
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-fade-in">
            <div style={{ background: 'rgba(12, 56, 41, 0.05)', border: '1px solid var(--primary)', borderRadius: '8px', padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Lock className="text-primary" size={24} style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: 'var(--primary)' }}>End-to-End Encrypted</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>This form bypasses local servers and connects directly to the central database. Your identity is concealed.</p>
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label" style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>Reporting Mode</label>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="radio" name="anon" checked={isAnonymous} onChange={() => setIsAnonymous(true)} style={{ transform: 'scale(1.2)' }} />
                  Anonymous Report
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="radio" name="anon" checked={!isAnonymous} onChange={() => setIsAnonymous(false)} style={{ transform: 'scale(1.2)' }} />
                  Confidential (Provide Contact)
                </label>
              </div>
            </div>

            {!isAnonymous && (
              <div className="grid-2 mb-4">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your full legal name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Secure Phone Number</label>
                  <input type="tel" className="form-control" placeholder="To receive secure updates" required />
                </div>
              </div>
            )}

            <div className="form-group mb-4">
              <label className="form-label">Incident Description & Evidence</label>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Describe the harassment, abuse, or torture in as much detail as you can. Include dates, times, and specific individuals if known.</p>
              <textarea 
                className="form-control" 
                placeholder="What happened? Be as detailed as you feel comfortable."
                required
                style={{ minHeight: '180px' }}
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Evidentiary Attachments (Optional)</label>
              <div 
                className="form-control" 
                style={{ 
                  border: '2px dashed var(--surface-border)', 
                  textAlign: 'center', 
                  padding: '2rem 1rem',
                  cursor: 'pointer',
                  background: 'var(--surface-color)',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--surface-color)'}
              >
                <UploadCloud size={32} color="var(--primary)" style={{ margin: '0 auto 0.5rem auto' }} />
                <p style={{ fontWeight: 600, color: 'var(--primary)', margin: '0 0 0.25rem 0' }}>Click to upload files or drag and drop</p>
                <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>Screenshots, audio logs, or documents (PDF, JPG, PNG)</p>
              </div>
            </div>

            <div className="form-group mt-5">
              <button type="submit" className="btn btn-danger" style={{ width: '100%', fontSize: '1.2rem', padding: '1.25rem' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Processing Encryption...</>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Formal Complaint
                  </>
                )}
              </button>
              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <EyeOff size={14} /> You can use the Quick Stealth Exit (ESC) at any time.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Report;
