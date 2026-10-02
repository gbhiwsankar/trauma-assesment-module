import React, { useState, useEffect } from 'react';
import { Wind, Eye, Leaf, Headphones } from 'lucide-react';

const Awareness = () => {
  const [breathPhase, setBreathPhase] = useState('Wait');
  const [isBreathing, setIsBreathing] = useState(false);
  const [breatheMode, setBreatheMode] = useState('4-4-4-4'); // '4-4-4-4' or '4-7-8'

  useEffect(() => {
    let interval;
    if (isBreathing) {
      if (breatheMode === '4-4-4-4') {
        let step = 0;
        const phases = ['Inhale (4s)', 'Hold (4s)', 'Exhale (4s)', 'Rest (4s)'];
        setBreathPhase(phases[step]);
        interval = setInterval(() => {
          step = (step + 1) % 4;
          setBreathPhase(phases[step]);
        }, 4000);
      } else {
        // 4-7-8 logic
        let step = 0;
        const phases = [
          { text: 'Inhale (4s)', time: 4000 },
          { text: 'Hold (7s)', time: 7000 },
          { text: 'Exhale (8s)', time: 8000 }
        ];
        
        const runPhase = () => {
          setBreathPhase(phases[step].text);
          interval = setTimeout(() => {
            step = (step + 1) % 3;
            runPhase();
          }, phases[step].time);
        };
        runPhase();
      }
    } else {
      setBreathPhase('Start');
    }
    return () => {
      if (breatheMode === '4-4-4-4') clearInterval(interval);
      else clearTimeout(interval);
    };
  }, [isBreathing, breatheMode]);

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <div className="text-center mb-4">
        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--danger)', marginBottom: '1rem', display: 'block' }}>
          Regulation Suite
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Somatic Grounding Tools</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Interactive tools designed to stimulate your parasympathetic nervous system, lowering heart rate and rapidly reducing panic.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Breathing Pacer */}
        <div className="glass-panel" style={{ textAlign: 'center', background: 'white' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Wind size={24} color="var(--primary)" /> Parasympathetic Pacer
          </h3>
          <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
            Follow the animated orb. Try 4-7-8 for deep relaxation or 4-4-4-4 for immediate centering.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => { setBreatheMode('4-4-4-4'); setIsBreathing(false); }}
              style={{ background: breatheMode === '4-4-4-4' ? 'var(--primary)' : 'transparent', color: breatheMode === '4-4-4-4' ? 'white' : 'var(--text-muted)', border: '1px solid var(--primary)', padding: '0.4rem 1rem', borderRadius: '99px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Box Breathing (4-4-4-4)
            </button>
            <button 
              onClick={() => { setBreatheMode('4-7-8'); setIsBreathing(false); }}
              style={{ background: breatheMode === '4-7-8' ? 'var(--primary)' : 'transparent', color: breatheMode === '4-7-8' ? 'white' : 'var(--text-muted)', border: '1px solid var(--primary)', padding: '0.4rem 1rem', borderRadius: '99px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Deep Relaxation (4-7-8)
            </button>
          </div>

          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(243, 183, 44, 0.2)',
              border: '2px solid var(--secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: isBreathing ? (breatheMode === '4-4-4-4' ? 'all 4s ease-in-out' : 'all 3s ease-in-out') : 'all 0.5s ease',
              transform: isBreathing && (breathPhase.includes('Inhale') || breathPhase.includes('Hold')) ? 'scale(1.5)' : 'scale(1)',
              boxShadow: isBreathing && breathPhase.includes('Inhale') ? '0 0 30px rgba(243, 183, 44, 0.5)' : 'none'
            }}>
              <span style={{ fontWeight: 700, color: 'var(--primary)', zIndex: 10, fontSize: '0.9rem' }}>{breathPhase}</span>
            </div>
          </div>
          
          <button className="btn btn-primary" onClick={() => setIsBreathing(!isBreathing)} style={{ marginTop: '2rem' }}>
            {isBreathing ? 'Stop Exercise' : 'Start Pacer'}
          </button>
        </div>

        {/* 5-4-3-2-1 Tool */}
        <div className="glass-panel" style={{ background: 'white' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Eye size={24} color="var(--primary)" /> 5-4-3-2-1 Sensory Anchor
          </h3>
          <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
            Look around your room and physically interact with your environment to interrupt flashbacks.
          </p>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <strong>5 Things you can SEE</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>Notice colors, shadows, or shapes around you.</p>
            </li>
            <li style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <strong>4 Things you can FEEL</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>The texture of your shirt, the ground under your feet.</p>
            </li>
            <li style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <strong>3 Things you can HEAR</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>Traffic outside, a clock ticking, your own breathing.</p>
            </li>
            <li style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <strong>2 Things you can SMELL</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>A nearby object, fresh air, or your own skin.</p>
            </li>
            <li style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <strong>1 Positive AFFIRMATION</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>"I am safe in this present moment."</p>
            </li>
          </ul>
        </div>
      </div>


    </div>
  );
};

export default Awareness;
