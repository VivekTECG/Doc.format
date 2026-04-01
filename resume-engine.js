// Resume Formatter Engine
// This engine formats resume data, performs validation, and converts it into different export formats.

// JSON Structure Example:
// { 
//   "name": "John Doe", 
//   "email": "john@example.com", 
//   "education": [
//     { "degree": "BSc in Computer Science", "institution": "XYZ University", "year": 2020 },
//     { "degree": "MSc in Computer Science", "institution": "XYZ University", "year": 2022 }
//   ], 
//   "workExperience": [
//     { "jobTitle": "Software Engineer", "company": "Tech Corp", "duration": "2022 - Present" }
//   ]
// }

class ResumeFormatter {
    constructor(resumeData) {
        this.resumeData = resumeData;
    }
    
    // Validation method to ensure data integrity
    validate() {
        const { name, email, education, workExperience } = this.resumeData;
        if (!name || !email) {
            throw new Error('Name and Email are required.');
        }
        if (!Array.isArray(education) || !Array.isArray(workExperience)) {
            throw new Error('Education and Work Experience should be arrays.');
        }
        // Additional validation checks can be added here.
    }
    
    // Formatting method that formats the resume
    format() {
        this.validate();
        // Formatting logic here.
        return `\nResume\n====\nName: ${this.resumeData.name}\nEmail: ${this.resumeData.email}`;
    }
    
    // JSON Export capability
    exportToJSON() {
        return JSON.stringify(this.resumeData, null, 2);
    }
}

// Example Usage:
const resumeData = {
    name: "John Doe",
    email: "john@example.com",
    education: [
        { degree: "BSc in Computer Science", institution: "XYZ University", year: 2020 },
        { degree: "MSc in Computer Science", institution: "XYZ University", year: 2022 }
    ],
    workExperience: [
        { jobTitle: "Software Engineer", company: "Tech Corp", duration: "2022 - Present" }
    ]
};

const formatter = new ResumeFormatter(resumeData);
console.log(formatter.format()); // Outputs formatted resume
console.log(formatter.exportToJSON()); // Outputs JSON string for the resume
