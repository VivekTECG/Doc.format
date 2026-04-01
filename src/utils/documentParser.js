import mammoth from 'mammoth';

export async function parseDocument(file) {
  const fileType = file.name.split('.').pop().toLowerCase();

  if (fileType === 'pdf') {
    return await parsePDF(file);
  } else if (fileType === 'doc' || fileType === 'docx') {
    return await parseWord(file);
  } else {
    throw new Error('Unsupported file format. Please upload PDF or Word document.');
  }
}

async function parsePDF(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        const text = await extractTextFromPDF(typedArray);
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

async function extractTextFromPDF(data) {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

async function parseWord(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function extractResumeData(text) {
  const data = {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: []
  };

  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

  const lines = text.split('\n').filter(line => line.trim());

  if (lines.length > 0) {
    data.name = lines[0].trim();
  }

  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    data.email = emailMatch[0];
  }

  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    data.phone = phoneMatch[0];
  }

  const sections = {
    experience: ['experience', 'work history', 'employment', 'professional experience'],
    education: ['education', 'academic', 'qualification'],
    skills: ['skills', 'technical skills', 'competencies'],
    summary: ['summary', 'profile', 'objective', 'about']
  };

  let currentSection = null;
  let sectionContent = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    let foundSection = false;

    for (const [section, keywords] of Object.entries(sections)) {
      if (keywords.some(keyword => line.includes(keyword))) {
        if (currentSection && sectionContent.length > 0) {
          processSection(data, currentSection, sectionContent);
          sectionContent = [];
        }
        currentSection = section;
        foundSection = true;
        break;
      }
    }

    if (!foundSection && currentSection) {
      sectionContent.push(lines[i]);
    }
  }

  if (currentSection && sectionContent.length > 0) {
    processSection(data, currentSection, sectionContent);
  }

  return data;
}

function processSection(data, section, content) {
  const text = content.join('\n').trim();

  if (section === 'summary') {
    data.summary = text;
  } else if (section === 'skills') {
    data.skills = text.split(/[,;\n]/).map(s => s.trim()).filter(s => s);
  } else if (section === 'experience') {
    data.experience.push({
      title: content[0] || '',
      company: content[1] || '',
      period: '',
      description: content.slice(2).join('\n')
    });
  } else if (section === 'education') {
    data.education.push({
      degree: content[0] || '',
      institution: content[1] || '',
      year: '',
      details: content.slice(2).join('\n')
    });
  }
}
