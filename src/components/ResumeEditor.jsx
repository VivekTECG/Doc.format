import { useState } from 'react';

export default function ResumeEditor({ data, onChange }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  const handleArrayChange = (field, index, key, value) => {
    const updated = { ...formData };
    updated[field][index][key] = value;
    setFormData(updated);
    onChange(updated);
  };

  const addItem = (field, template) => {
    const updated = { ...formData };
    updated[field].push(template);
    setFormData(updated);
    onChange(updated);
  };

  const removeItem = (field, index) => {
    const updated = { ...formData };
    updated[field].splice(index, 1);
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className="resume-editor">
      <div className="section">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="section">
        <h2>Professional Summary</h2>
        <div className="form-group">
          <textarea
            value={formData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Write a brief professional summary..."
            rows="4"
          />
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Experience</h2>
          <button
            onClick={() => addItem('experience', { title: '', company: '', period: '', description: '' })}
            className="add-btn"
          >
            + Add Experience
          </button>
        </div>
        {formData.experience.map((exp, index) => (
          <div key={index} className="item-card">
            <button
              onClick={() => removeItem('experience', index)}
              className="remove-btn"
            >
              ×
            </button>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="form-group">
              <label>Period</label>
              <input
                type="text"
                value={exp.period}
                onChange={(e) => handleArrayChange('experience', index, 'period', e.target.value)}
                placeholder="Jan 2020 - Present"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                rows="3"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Education</h2>
          <button
            onClick={() => addItem('education', { degree: '', institution: '', year: '', details: '' })}
            className="add-btn"
          >
            + Add Education
          </button>
        </div>
        {formData.education.map((edu, index) => (
          <div key={index} className="item-card">
            <button
              onClick={() => removeItem('education', index)}
              className="remove-btn"
            >
              ×
            </button>
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                placeholder="University Name"
              />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                placeholder="2015 - 2019"
              />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea
                value={edu.details}
                onChange={(e) => handleArrayChange('education', index, 'details', e.target.value)}
                placeholder="Additional details, honors, etc."
                rows="2"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Skills</h2>
        <div className="form-group">
          <textarea
            value={formData.skills.join(', ')}
            onChange={(e) => handleChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Enter skills separated by commas (e.g., JavaScript, Python, React)"
            rows="3"
          />
        </div>
      </div>

      <div className="section">
        <h2>Certifications</h2>
        <div className="form-group">
          <textarea
            value={formData.certifications.join('\n')}
            onChange={(e) => handleChange('certifications', e.target.value.split('\n').filter(Boolean))}
            placeholder="Enter certifications (one per line)"
            rows="3"
          />
        </div>
      </div>
    </div>
  );
}
