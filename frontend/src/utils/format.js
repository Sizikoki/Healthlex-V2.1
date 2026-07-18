/**
 * Formats a medical term to ensure only the first letter is capitalized (Capsula articularis format).
 * 
 * Rules:
 * - If the input is null, undefined, not a string, or empty, it returns the input as-is.
 * - Strictly validates that the term contains only letters (Latin & Turkish, including accented ones),
 *   single spaces, or hyphens.
 * - If the term contains any "strange" characters (numbers, punctuation, symbols, tags, etc.) or has
 *   invalid formatting (double spaces, leading/trailing spaces, consecutive hyphens), it returns the input as-is.
 * - Otherwise, it capitalizes the first letter and lowercases all subsequent letters.
 * 
 * @param {any} term - The term to format
 * @returns {any} Formatted term or original value
 */
export function formatMedicalTerm(term) {
  if (term === null || term === undefined) {
    return term;
  }
  
  if (typeof term !== 'string') {
    return term;
  }
  
  if (term.trim() === '') {
    return term;
  }

  // Regex to validate medical term: only letters (Latin & Turkish, including accented ones like â, î, û), spaces, and hyphens.
  // Must start and end with a letter, and consist of word blocks separated by single spaces or hyphens.
  // This explicitly avoids numbers, punctuation, HTML, special symbols, etc.
  const termRegex = /^[a-zA-ZçğıöşüÇĞİÖŞÜâîûÂÎÛ]+(?:[\s-][a-zA-ZçğıöşüÇĞİÖŞÜâîûÂÎÛ]+)*$/;
  
  if (!termRegex.test(term)) {
    return term;
  }

  return term.charAt(0).toLocaleUpperCase('tr-TR') + term.slice(1).toLocaleLowerCase('tr-TR');
}
