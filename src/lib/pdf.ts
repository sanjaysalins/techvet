import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export type PdfProgress =
  | { stage: 'capturing' }
  | { stage: 'rendering'; page: number; total: number }
  | { stage: 'saving' }
  | { stage: 'done'; bytes: number };

export async function exportPdf(
  elementId: string,
  filename: string,
  onProgress?: (p: PdfProgress) => void
) {
  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element #${elementId} not found`);

  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) document.documentElement.classList.remove('dark');
  await new Promise(r => requestAnimationFrame(() => r(null)));

  onProgress?.({ stage: 'capturing' });
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
  });
  if (wasDark) document.documentElement.classList.add('dark');

  const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 24;
  const imgWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const fits = imgHeight <= pageHeight - margin * 2;

  if (fits) {
    onProgress?.({ stage: 'rendering', page: 1, total: 1 });
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, margin, imgWidth, imgHeight);
  } else {
    const pageCanvasHeight = ((pageHeight - margin * 2) / imgWidth) * canvas.width;
    const total = Math.ceil(canvas.height / pageCanvasHeight);
    let page = 0;
    let sY = 0;
    while (sY < canvas.height) {
      page += 1;
      onProgress?.({ stage: 'rendering', page, total });
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.min(pageCanvasHeight, canvas.height - sY);
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(canvas, 0, sY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
      const sliceHeightPt = (sliceCanvas.height * imgWidth) / canvas.width;
      if (sY > 0) pdf.addPage();
      pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', margin, margin, imgWidth, sliceHeightPt);
      sY += sliceCanvas.height;
    }
  }

  onProgress?.({ stage: 'saving' });
  const blob = pdf.output('blob');
  triggerDownload(blob, filename);
  onProgress?.({ stage: 'done', bytes: blob.size });
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.style.position = 'fixed';
  a.style.left = '-9999px';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}
