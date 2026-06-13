import PDFDocument from 'pdfkit';

export async function generatePdf(
  report: any,
): Promise<Buffer> {
  const doc = new PDFDocument();

  const buffers: Buffer[] = [];

  doc.on(
    'data',
    buffers.push.bind(buffers),
  );

  doc.fontSize(22);
  doc.text('NAYANK');

  doc.moveDown();

  doc.fontSize(18);
  doc.text('Investigation Report');

  doc.moveDown();

  doc.fontSize(12);

  doc.text(
    `Case Title: ${report.caseTitle}`,
  );

  doc.text(
    `Evidence Count: ${report.evidenceCount}`,
  );

  doc.text(
    `Interview Count: ${report.interviewCount}`,
  );

  doc.moveDown();

  doc.text('Final Report');

  doc.moveDown();

  doc.text(
    report.finalReport ||
      'No report available',
  );

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}