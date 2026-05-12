import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportPdf(elementId: string, filename: string) {
  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element #${elementId} not found`);

  // Force light styling for the capture window
  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) document.documentElement.classList.remove('dark');

  await new Promise(r => requestAnimationFrame(() => r(null)));

  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
  });

  if (wasDark) document.documentElement.classList.add('dark');

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 24;
  const imgWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= pageHeight - margin * 2) {
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
  } else {
    const pageCanvasHeight = ((pageHeight - margin * 2) / imgWidth) * canvas.width;
    let sY = 0;
    while (sY < canvas.height) {
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.min(pageCanvasHeight, canvas.height - sY);
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(
        canvas,
        0,
        sY,
        canvas.width,
        sliceCanvas.height,
        0,
        0,
        canvas.width,
        sliceCanvas.height
      );
      const sliceData = sliceCanvas.toDataURL('image/png');
      const sliceHeightPt = (sliceCanvas.height * imgWidth) / canvas.width;
      if (sY > 0) pdf.addPage();
      pdf.addImage(sliceData, 'PNG', margin, margin, imgWidth, sliceHeightPt);
      sY += sliceCanvas.height;
    }
  }

  pdf.save(filename);
}
