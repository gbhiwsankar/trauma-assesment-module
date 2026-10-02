import React, { useState, useEffect } from 'react';
import { Activity, Printer, CheckCircle, ShieldAlert, HeartPulse } from 'lucide-react';

const questions = [
  { id: 'q1', domain: 'Intrusive Shock & Flashbacks', text: 'In the past month, have you had repeated, disturbing, and unwanted memories of the stressful experience?' },
  { id: 'q2', domain: 'Avoidance of Triggers & Emotional Numbness', text: 'Have you avoided memories, thoughts, or feelings related to the stressful experience?' },
  { id: 'q3', domain: 'Hypervigilance & Startle Reflex', text: 'Have you felt super alert or watchful, or been easily startled?' },
  { id: 'q4', domain: 'Sleep Disturbance & Night Terrors', text: 'Have you had trouble falling or staying asleep?' },
  { id: 'q5', domain: 'Fear of Retaliation & Safety Threat', text: 'Do you feel a constant threat to your physical safety or fear retaliation?' }
];

const Assessment = () => {
  const [answers, setAnswers] = useState({});
  const [narrative, setNarrative] = useState('');
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const totalSelected = Object.values(answers).filter(val => val > 0).reduce((a, b) => a + b, 0);
    const maxPossible = questions.length * 4;
    setScore(Math.round((totalSelected / maxPossible) * 100));
  }, [answers]);

  const handleSelect = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setSubmitted(true);
    }, 2500); // Simulate Gemini 3.8 Flash AI synthesis delay
  };

  const getRiskCategory = () => {
    if (score < 25) return { label: 'Mild Situational Stress', color: 'var(--success)' };
    if (score < 50) return { label: 'Moderate Stress', color: 'var(--warning)' };
    if (score < 75) return { label: 'High Distress (Probable Trauma/PTSD)', color: 'var(--danger)' };
    return { label: 'Acute Crisis', color: 'var(--danger)' };
  };

  const risk = getRiskCategory();

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <div className="text-center mb-4">
        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--danger)', marginBottom: '1rem', display: 'block' }}>
          Clinical Trauma Screener (Adapted from PCL-5)
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Live Neuro-Stress Assessment</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          This secure, non-diagnostic tool helps us understand your distress levels to provide tailored grounding exercises and connect you with the right institutional support.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left: Questionnaire */}
        <div className="glass-panel" style={{ background: 'white' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {questions.map((q, idx) => (
                <div key={q.id} style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', opacity: 0.7, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Domain {idx + 1}: {q.domain}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{q.text}</h4>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {['Not at all (0)', 'A little bit (1)', 'Moderately (2)', 'Quite a bit (3)', 'Extremely (4)'].map((opt, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => handleSelect(q.id, i)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: `1px solid ${answers[q.id] === i ? 'var(--primary)' : 'var(--surface-border)'}`,
                          background: answers[q.id] === i ? 'rgba(12, 56, 41, 0.05)' : 'white',
                          color: answers[q.id] === i ? 'var(--primary)' : 'var(--text-muted)',
                          fontWeight: answers[q.id] === i ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="form-group" style={{ marginTop: '2rem' }}>
                <label className="form-label">Complainant Narrative (Optional)</label>
                <textarea 
                  className="form-control" 
                  placeholder="Share any specific bodily sensations, fears, or details you want the AI counselor to know."
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} disabled={analyzing}>
                {analyzing ? (
                  <>
                    <Activity className="animate-spin" size={20} /> Synthesizing via Gemini 3.8 Flash AI...
                  </>
                ) : (
                  'Generate Clinical Insight & Safety Plan'
                )}
              </button>
            </form>
          ) : (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
                <h3 style={{ margin: 0 }}>Official Assessment Docket</h3>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  <Printer size={18} /> Print Docket
                </button>
              </div>

              <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <HeartPulse size={20}/> Gemini 3.8 AI Empathy Synthesis
                </h4>
                <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "I hear you, and I want to validate that the intrusive memories and fear you are experiencing are completely understandable natural responses to trauma. You are not to blame for this distress. Your symptoms indicate elevated hypervigilance and sleep disruption, which means your nervous system is stuck in a protective state."
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Immediate Grounding Directives</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ background: 'white', border: '1px solid var(--surface-border)', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={20} color="var(--success)" style={{ marginTop: '2px' }} />
                    <div>
                      <strong>4-7-8 Parasympathetic Pacing</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Breathe in for 4, hold for 7, exhale for 8 to signal safety to your brain stem.</p>
                    </div>
                  </li>
                  <li style={{ background: 'white', border: '1px solid var(--surface-border)', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={20} color="var(--success)" style={{ marginTop: '2px' }} />
                    <div>
                      <strong>5-4-3-2-1 Sensory Anchor</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Name 5 things you can see, 4 you can feel, 3 you can hear right now.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 style={{ marginBottom: '1rem' }}>Recommended Institutional Steps</h4>
                <div style={{ background: 'rgba(216, 66, 66, 0.05)', border: '1px solid rgba(216, 66, 66, 0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                  <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.8 }}>
                    <li><strong>Invoke Section 15A:</strong> Request witness protection immediately via the DLSA.</li>
                    <li><strong>Register Formal Complaint:</strong> Use the secure portal to file an encrypted report.</li>
                    <li><strong>Access Rule 12 Relief:</strong> You are entitled to mandatory relief compensation (₹1,00,000 to ₹8,25,000).</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Real-time Gauge */}
        <div style={{ position: 'sticky', top: '12rem' }}>
          <div className="glass-panel" style={{ textAlign: 'center', background: 'white' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Real-Time Live Neuro-Stress
            </span>
            <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: risk.color, lineHeight: 1, margin: '1rem 0' }}>
              {score}%
            </div>
            
            <div className="meter-container" style={{ marginBottom: '1rem', background: 'var(--surface-color)' }}>
              <div 
                className="meter-fill" 
                style={{ 
                  width: `${score}%`, 
                  backgroundColor: risk.color
                }} 
              />
            </div>
            
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: risk.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} /> {risk.label}
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Sanjeevani AI Intake Desk</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Need to talk? Our empathetic trauma counselor bot is available to guide you.
            </p>
            <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }}>
              Start Secure Chat
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Assessment;
