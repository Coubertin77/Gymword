/**
 * Parse bulk student input (CSV paste, file, or one name per line).
 * Supports: comma, semicolon, tab separators, or space-separated names.
 */
export function parseStudentLines(text, columnOrder = 'first-last') {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const results = [];
  let startIndex = 0;

  if (lines.length && isHeaderLine(lines[0])) startIndex = 1;

  for (let i = startIndex; i < lines.length; i++) {
    const parsed = parseOneLine(lines[i], columnOrder);
    if (parsed) results.push(parsed);
  }
  return results;
}

function isHeaderLine(line) {
  const lower = line.toLowerCase().replace(/"/g, '');
  const headerWords = ['prénom', 'prenom', 'firstname', 'first name', 'nom', 'lastname', 'last name', 'name', 'élève', 'eleve', 'student'];
  const parts = lower.split(/[,;\t]/).map(p => p.trim());
  if (parts.length >= 2 && parts.every(p => headerWords.some(h => p.includes(h)))) return true;
  return /^"?pr[ée]nom"?\s*[,;\t]/i.test(line) || /^"?nom"?\s*[,;\t]/i.test(line);
}

function parseOneLine(line, columnOrder) {
  const cleaned = line.replace(/^\uFEFF/, '').trim();
  if (!cleaned) return null;

  const sep = detectSeparator(cleaned);
  if (sep) {
    const parts = cleaned.split(sep).map(p => p.trim().replace(/^"|"$/g, ''));
    if (parts.length >= 2) {
      const a = parts[0];
      const b = parts[1];
      if (columnOrder === 'last-first') return { firstName: b, lastName: a };
      return { firstName: a, lastName: b };
    }
  }

  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    if (columnOrder === 'last-first') {
      return { firstName: words.slice(1).join(' '), lastName: words[0] };
    }
    return { firstName: words.slice(0, -1).join(' '), lastName: words[words.length - 1] };
  }

  return null;
}

function detectSeparator(line) {
  if (line.includes(';')) return ';';
  if (line.includes('\t')) return '\t';
  if (line.includes(',')) return ',';
  return null;
}

export function readCsvFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, 'UTF-8');
  });
}
