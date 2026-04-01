import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from 'docx';

export function formatResume(data) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: data.name || 'Name',
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: [data.email, data.phone, data.location].filter(Boolean).join(' | '),
              size: 20
            })
          ],
          spacing: { after: 400 }
        }),

        ...(data.summary ? [
          new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          new Paragraph({
            text: data.summary,
            spacing: { after: 400 }
          })
        ] : []),

        ...(data.experience && data.experience.length > 0 ? [
          new Paragraph({
            text: 'PROFESSIONAL EXPERIENCE',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          ...data.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.title || 'Job Title',
                  bold: true,
                  size: 24
                })
              ],
              spacing: { before: 200, after: 100 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.company || 'Company Name',
                  italics: true
                }),
                new TextRun({
                  text: exp.period ? ` | ${exp.period}` : ''
                })
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              text: exp.description || '',
              spacing: { after: 300 }
            })
          ])
        ] : []),

        ...(data.education && data.education.length > 0 ? [
          new Paragraph({
            text: 'EDUCATION',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          ...data.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree || 'Degree',
                  bold: true,
                  size: 24
                })
              ],
              spacing: { before: 200, after: 100 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.institution || 'Institution',
                  italics: true
                }),
                new TextRun({
                  text: edu.year ? ` | ${edu.year}` : ''
                })
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              text: edu.details || '',
              spacing: { after: 300 }
            })
          ])
        ] : []),

        ...(data.skills && data.skills.length > 0 ? [
          new Paragraph({
            text: 'SKILLS',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          new Paragraph({
            text: data.skills.join(' • '),
            spacing: { after: 400 }
          })
        ] : []),

        ...(data.certifications && data.certifications.length > 0 ? [
          new Paragraph({
            text: 'CERTIFICATIONS',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: '000000',
                space: 1,
                style: 'single',
                size: 6
              }
            }
          }),
          ...data.certifications.map(cert =>
            new Paragraph({
              text: `• ${cert}`,
              spacing: { after: 100 }
            })
          )
        ] : [])
      ]
    }]
  });

  return doc;
}

export async function exportToWord(doc, filename = 'formatted_resume.docx') {
  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}
