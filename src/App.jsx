import { useState } from 'react';
import ResumeEditor from './components/ResumeEditor';
import { parseDocument, extractResumeData } from './utils/documentParser';
import { formatResume, exportToWord } from './utils/resumeFormatter';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await parseDocument(file);
      const data = extractResumeData(text);
      setResumeData(data);
    } catch (err) {
      setError('Error parsing document: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!resumeData) return;

    try {
      const doc = formatResume(resumeData);
      await exportToWord(doc, 'formatted_resume.docx');
    } catch (err) {
      setError('Error exporting document: ' + err.message);
      console.error(err);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResumeData(null);
    setError(null);
  };

  const handleDataChange = (newData) => {
    setResumeData(newData);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Resume Formatter Engine</h1>
        <p>Upload your resume and format it professionally</p>
      </header>

      <main className="main">
        {!resumeData ? (
          <div className="upload-section">
            <div className="upload-card">
              <div className="upload-icon">📄</div>
              <h2>Upload Your Resume</h2>
              <p>Support for PDF and Word documents</p>

              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="file-input"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                  {file ? file.name : 'Choose File'}
                </label>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="primary-btn"
              >
                {loading ? 'Processing...' : 'Process Resume'}
              </button>

              <div className="info-box">
                <h3>How it works:</h3>
                <ol>
                  <li>Upload your resume (PDF or Word format)</li>
                  <li>Review and edit the extracted information</li>
                  <li>Export as a professionally formatted document</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="editor-section">
            <div className="toolbar">
              <button onClick={handleReset} className="secondary-btn">
                ← Upload New Resume
              </button>
              <button onClick={handleExport} className="primary-btn">
                💾 Export Formatted Resume
              </button>
            </div>

            <ResumeEditor data={resumeData} onChange={handleDataChange} />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Free Resume Formatter Engine - No paid subscriptions required</p>
      </footer>
    </div>
  );
}

export default App;
