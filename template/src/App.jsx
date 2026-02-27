import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { initialResumeState } from './data';
import Resume from './components/Resume';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import ResumeUploadModal from './components/ResumeUploadModal';
import { calculateATSScore } from './services/ats/atsEngine';
import './components/Resume.css';

function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'editor'
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        return {
          ...initialResumeState,
          ...parsed,
          header: { ...initialResumeState.header, ...(parsed.header || {}) },
          skills: { ...initialResumeState.skills, ...(parsed.skills || {}) },
          experience: Array.isArray(parsed.experience) ? parsed.experience : initialResumeState.experience,
          projects: Array.isArray(parsed.projects) ? parsed.projects : initialResumeState.projects,
          certifications: Array.isArray(parsed.certifications) ? parsed.certifications : initialResumeState.certifications,
          achievements: Array.isArray(parsed.achievements) ? parsed.achievements : initialResumeState.achievements,
          education: Array.isArray(parsed.education) ? parsed.education : initialResumeState.education,
        };
      }
    } catch (e) {
      console.error("Error loading resume data:", e);
    }
    return initialResumeState;
  });

  const [atsScore, setAtsScore] = useState(() => calculateATSScore(data));

  React.useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
    setLastSaved(new Date().toLocaleTimeString());
    setAtsScore(calculateATSScore(data));
  }, [data]);

  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: 'Resume',
  });

  if (view === 'dashboard') {
    return (
      <>
        <Dashboard
          data={data}
          lastSaved={lastSaved}
          onEdit={() => setView('editor')}
          onUpload={() => setIsUploadOpen(true)}
          onNew={() => {
            if (window.confirm("Create new resume? This will overwrite your current draft.")) {
              setData(initialResumeState);
              setView('editor');
            }
          }}
        />
        <ResumeUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUpload={(uploadedData) => {
            setData(uploadedData);
            setView('dashboard');
          }}
        />
      </>
    );
  }

  return (
    <div style={{ display: 'flex', background: '#e9ecef', minHeight: '100vh', fontFamily: 'sans-serif', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <span style={{ fontSize: '12px', color: '#666', background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '4px' }}>
          Saved: {lastSaved}
        </span>
        <button
          onClick={() => setView('dashboard')}
          style={{
            padding: '8px 20px',
            fontSize: '13px',
            background: '#004AAD',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 10px rgba(0, 74, 173, 0.2)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#003a8c'}
          onMouseOut={(e) => e.target.style.background = '#004AAD'}
        >
          ← Dashboard
        </button>
      </div>
      <Editor
        data={data}
        onChange={setData}
        onDownload={handlePrint}
        onReset={() => {
          if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
            setData(initialResumeState);
          }
        }}
      />
      <div style={{ flex: 1, padding: '40px', display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
        <Resume data={data} ref={resumeRef} />
      </div>
    </div>
  );
}

export default App;
