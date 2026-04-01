// resumeValidator.js

function validateResume(resume) {
    const errors = [];
    const skillsSet = new Set();
    const bulletRegex = /^\s*[-•]\s*(.+?)$/;

    // Check for consistent formatting
    if (!resume.name || !resume.contact || !resume.experience || !resume.education) {
        errors.push('Missing required fields: name, contact, experience, or education.');
    }

    // Ensure no duplicate skills
    resume.skills.forEach(skill => {
        if (skillsSet.has(skill)) {
            errors.push(`Duplicate skill found: ${skill}`);
        } else {
            skillsSet.add(skill);
        }
    });

    // Validate ATS compliance
    const atsKeywords = ['skills', 'experience', 'education', 'certifications'];
    atsKeywords.forEach(keyword => {
        if (!resume[keyword]) {
            errors.push(`Missing obligatory ATS keyword: ${keyword}`);
        }
    });

    // Bullet point rules
    if (resume.experience) {
        resume.experience.forEach(job => {
            if (job.bullets) {
                job.bullets.forEach(bullet => {
                    const match = bullet.match(bulletRegex);
                    if (match && match[1].split(' ').length < 10 || match[1].split(' ').length > 16) {
                        errors.push(`Bullet point too long or too short: ${bullet}`);
                    }
                });
            }
        });
    }

    return errors.length === 0 ? 'Resume is valid!' : errors;
}

module.exports = validateResume;