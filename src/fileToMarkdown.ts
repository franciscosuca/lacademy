import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorker;

function markdownFromPdfText(text: string, page: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return '';
  }

  return `## Page ${page}\n\n${normalized}`;
}

async function pdfToMarkdown(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: buffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map(item => ('str' in item ? item.str : ''))
      .join(' ');
    const pageMarkdown = markdownFromPdfText(pageText, i);
    if (pageMarkdown) {
      pages.push(pageMarkdown);
    }
  }

  return pages.join('\n\n');
}

export async function fileToMarkdown(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith('.md')) {
    return file.text();
  }

  if (fileName.endsWith('.pdf')) {
    return pdfToMarkdown(file);
  }

  throw new Error('Please upload a .md or .pdf file.');
}
