# Resume Formatter Engine

A free, desktop-based tool to format your resume professionally. No paid subscriptions required!

## Features

- **Upload PDF or Word Documents**: Parse your existing resume from PDF or DOCX files
- **Automatic Data Extraction**: Intelligent parsing of resume content including:
  - Personal information (name, email, phone, location)
  - Professional summary
  - Work experience
  - Education
  - Skills
  - Certifications
- **Interactive Editor**: Review and edit all extracted information
- **Professional Formatting**: Export to a clean, professionally formatted Word document
- **100% Free**: No subscriptions, no hidden costs, use it anytime

## Getting Started

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown (typically `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` folder. You can serve them using any static file server.

## How to Use

1. **Upload Your Resume**: Click "Choose File" and select your PDF or Word document
2. **Process**: Click "Process Resume" to extract the information
3. **Review & Edit**: Review the extracted data and make any necessary edits
4. **Export**: Click "Export Formatted Resume" to download your professionally formatted document

## Supported File Formats

- PDF (.pdf)
- Microsoft Word (.doc, .docx)

## Technology Stack

- React - UI framework
- Vite - Build tool
- PDF.js - PDF parsing
- Mammoth - Word document parsing
- docx - Word document generation

## Privacy

All processing happens in your browser. Your resume data is never uploaded to any server, ensuring complete privacy and security.

## License

Free to use for personal and commercial purposes.
