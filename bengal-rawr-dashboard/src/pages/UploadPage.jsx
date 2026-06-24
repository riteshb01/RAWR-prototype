import React from 'react';
import { Link } from 'react-router-dom';
import UploadPanel from '../dashboard/components/UploadPanel';

const UploadPage = () => {
  return (
    <div className="page">
      <Link to="/" className="page-back">← Back</Link>

      <div style={{ marginBottom: '2.5rem' }}>
        <p className="page-eyebrow">Syllabus</p>
        <h1 className="page-title">Upload</h1>
        <p className="page-subtitle">
          Drop in a PDF, DOCX, or TXT syllabus and we'll extract every deadline, exam, and project automatically.
        </p>
      </div>

      <div style={{ maxWidth: '640px' }}>
        <div className="card">
          <UploadPanel />
        </div>

        {/* How it works */}
        <div style={{ marginTop: '2rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>How it works</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { step: '01', title: 'Upload your syllabus', body: 'Drag a PDF, Word document, or plain text file into the drop zone.' },
              { step: '02', title: 'We extract the events', body: 'Our NLP engine reads every line and identifies exams, assignments, quizzes, and projects.' },
              { step: '03', title: 'Conflicts are flagged', body: 'We calculate your weekly workload and highlight weeks where you\'re overloaded.' },
              { step: '04', title: 'Your dashboard updates', body: 'The heatmap, charts, and deadline list refresh instantly with the new data.' },
            ].map(item => (
              <div key={item.step} className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', color: 'var(--ink-4)', lineHeight: 1, flexShrink: 0, minWidth: '2rem' }}>
                  {item.step}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--ink)' }}>{item.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)', lineHeight: 1.5 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
