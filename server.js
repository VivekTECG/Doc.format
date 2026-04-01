'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { validationResult, check } = require('express-validator');
const pdf = require('html-pdf');

const app = express();
app.use(bodyParser.json());

let resumes = {};

// Validation middleware
const validateResume = [
    check('name').isString().notEmpty(),
    check('email').isEmail(),
    check('phone').isString().notEmpty(),
];

// POST: Create/Format Resume
app.post('/resume', validateResume, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = Date.now(); // Unique ID for the resume
    resumes[id] = req.body;
    res.status(201).json({ id, ...req.body });
});

// GET: Retrieve Resume Data
app.get('/resume/:id', (req, res) => {
    const { id } = req.params;
    const resume = resumes[id];
    if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
});

// PUT: Update Resume
app.put('/resume/:id', validateResume, (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!resumes[id]) {
        return res.status(404).json({ message: 'Resume not found' });
    }
    resumes[id] = req.body;
    res.json({ id, ...req.body });
});

// PDF Export functionality
app.get('/resume/:id/pdf', (req, res) => {
    const { id } = req.params;
    const resume = resumes[id];
    if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
    }
    const html = `<h1>${resume.name}</h1><p>${resume.email}</p><p>${resume.phone}</p>`; // Adjust as necessary
    pdf.create(html).toStream((err, stream) => {
        if (err) return res.status(500).json({ message: 'Error creating PDF' });
        res.setHeader('Content-Type', 'application/pdf');
        stream.pipe(res);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
