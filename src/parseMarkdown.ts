export interface DocSubsection {
  id: string;
  title: string;
  content: string;
}

export interface DocSection {
  id: string;
  title: string;
  content: string;
  subsections: DocSubsection[];
}

export function parseMarkdown(raw: string): DocSection[] {
  const lines = raw.split('\n');
  const sections: DocSection[] = [];
  let currentSection: DocSection | null = null;
  let currentSub: DocSubsection | null = null;
  let contentLines: string[] = [];

  const flushContent = () => {
    const text = contentLines.join('\n').trim();
    if (currentSub) {
      currentSub.content = text;
    } else if (currentSection) {
      currentSection.content = text;
    }
    contentLines = [];
  };

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);

    if (h2Match) {
      flushContent();
      if (currentSub && currentSection) {
        currentSection.subsections.push(currentSub);
        currentSub = null;
      }
      if (currentSection) sections.push(currentSection);
      const title = h2Match[1].trim();
      currentSection = {
        id: slugify(title),
        title,
        content: '',
        subsections: [],
      };
      currentSub = null;
    } else if (h3Match && currentSection) {
      flushContent();
      if (currentSub) {
        currentSection.subsections.push(currentSub);
      }
      const title = h3Match[1].trim();
      currentSub = {
        id: slugify(title),
        title,
        content: '',
      };
    } else {
      contentLines.push(line);
    }
  }

  flushContent();
  if (currentSub && currentSection) {
    currentSection.subsections.push(currentSub);
  }
  if (currentSection) sections.push(currentSection);

  return sections;
}
