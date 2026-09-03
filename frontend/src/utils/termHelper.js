import { getAllTerms, categories, bodySystems, subcategoriesBySystem } from '@/data/medicalTerms';
import { findMorphemeBySlug, getAllMorphemes } from '@/utils/morphemeHelper';

/**
 * Converts a medical term string (e.g. "Os Frontale") into an SEO-friendly URL slug (e.g. "os-frontale").
 */
export function getTermSlug(term) {
  if (!term) return '';
  const text = typeof term === 'string' ? term : term.term || '';
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Finds a medical term by its slug or ID.
 */
export function findTermBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
  const all = getAllTerms();

  // 1. Direct slug match
  let found = all.find(t => getTermSlug(t.term) === cleanSlug);
  if (found) return found;

  // 2. ID match fallback (if URL is /study/65)
  found = all.find(t => String(t.id) === cleanSlug);
  if (found) return found;

  return null;
}

/**
 * Parses a term's roots string (e.g. "os (kemik) + frons (alın)") into an array of objects:
 * [
 *   { raw: "os (kemik)", root: "os", meaning: "kemik", morphemeSlug: "os" },
 *   { raw: "frons (alın)", root: "frons", meaning: "alın", morphemeSlug: "front" }
 * ]
 */
export function parseRootsToMorphemes(rootsString) {
  if (!rootsString || typeof rootsString !== 'string') return [];

  const parts = rootsString.split('+').map(p => p.trim()).filter(Boolean);
  const allMorphemes = getAllMorphemes();

  return parts.map(part => {
    // Extract root and meaning: "os (kemik)" or "tempor- (şakak)"
    const match = part.match(/^([^(]+)(?:\(([^)]+)\))?/);
    const rootRaw = match ? match[1].trim() : part;
    const meaning = match && match[2] ? match[2].trim() : '';

    const cleanRoot = rootRaw.replace(/[-_/;]/g, '').trim().toLowerCase();

    // Check if this root exists in our 571 morphemes
    const matchedMorpheme = allMorphemes.find(m => {
      if (m.slug === cleanRoot) return true;
      const variants = (m.variants || []).map(v => v.replace(/[-_/;]/g, '').trim().toLowerCase());
      return variants.includes(cleanRoot);
    });

    return {
      raw: part,
      root: rootRaw,
      meaning: meaning,
      morphemeSlug: matchedMorpheme ? matchedMorpheme.slug : null,
      morphemeName: matchedMorpheme ? matchedMorpheme.displayTerm : null
    };
  });
}

/**
 * Returns related terms in the same subcategory or system.
 */
export function getRelatedTerms(currentTerm, limit = 6) {
  if (!currentTerm) return [];
  const all = getAllTerms();

  // Prefer same subcategory
  let related = all.filter(t =>
    t.id !== currentTerm.id &&
    t.subcategory &&
    t.subcategory === currentTerm.subcategory
  );

  // Fallback to same system if not enough
  if (related.length < limit) {
    const systemRelated = all.filter(t =>
      t.id !== currentTerm.id &&
      t.system === currentTerm.system &&
      !related.some(r => r.id === t.id)
    );
    related = [...related, ...systemRelated];
  }

  return related.slice(0, limit);
}
