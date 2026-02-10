import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { initialResumeState } from './data';
import Resume from './components/Resume';
import Editor from './components/Editor';
import './components/Resume.css'; // Global styles if needed

function App() {
  const [data, setData] = useState(initialResumeState);
  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: 'Resume',
  });

  return (
    <div style={{ display: 'flex', background: '#e9ecef', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Editor
        data={data}
        onChange={setData}
        onDownload={handlePrint}
      />
      <div style={{ flex: 1, padding: '40px', display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
        <Resume data={data} ref={resumeRef} />
      </div>
    </div>
  );
}

export default App;
