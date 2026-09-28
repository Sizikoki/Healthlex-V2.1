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

/**
 * Truncates text at word boundary, ensuring the result + suffix <= maxLen.
 */
export function truncateWordBoundary(text, maxLen) {
  if (!text || text.length <= maxLen) return text || '';
  const sub = text.slice(0, maxLen).trimEnd();
  const lastSpace = sub.lastIndexOf(' ');
  if (lastSpace > 0) {
    return sub.slice(0, lastSpace).trimEnd().replace(/[,:;.-]+$/, '');
  }
  return sub.replace(/[,:;.-]+$/, '');
}

/**
 * Builds SEO meta description according to specifications:
 * TR: "{term} nedir? {turkishDefinition} Kökeni: {roots}."
 * EN: "What is {term}? {englishDefinition} Origin: {roots}."
 * Max 160 characters. Prioritizes definition; roots part is truncated or dropped if needed.
 */
export function buildTermMetaDescription(term, isTr = true, maxLength = 160) {
  if (!term) return '';
  const termName = (term.term || '').trim();

  let rawDef = '';
  if (isTr) {
    rawDef = term.turkishDefinition || term.turkishShort || term.definition || '';
  } else {
    rawDef = term.englishDefinition || term.turkishDefinition || term.turkishShort || term.definition || '';
  }

  const cleanDef = rawDef.trim().replace(/\s+/g, ' ').replace(/\.+$/, '');
  const cleanRoots = (term.roots || '').trim().replace(/\s+/g, ' ').replace(/\.+$/, '');

  const question = isTr ? `${termName} nedir? ` : `What is ${termName}? `;
  const originPrefix = isTr ? ' Kökeni: ' : ' Origin: ';

  if (!cleanDef) {
    const fallback = cleanRoots ? `${question}${originPrefix.trim()} ${cleanRoots}.` : question.trim();
    return fallback.length <= maxLength ? fallback : truncateWordBoundary(fallback, maxLength - 1) + '…';
  }

  // 1. Full with complete definition and roots:
  if (cleanRoots) {
    const full = `${question}${cleanDef}.${originPrefix}${cleanRoots}.`;
    if (full.length <= maxLength) {
      return full;
    }
  }

  // 2. Prioritize definition: try definition + partial roots or definition alone
  const baseDef = `${question}${cleanDef}.`;
  if (baseDef.length <= maxLength) {
    if (cleanRoots) {
      const availableForRoots = maxLength - baseDef.length - originPrefix.length - 1; // 1 for '…'
      if (availableForRoots >= 8) {
        const truncatedRoots = truncateWordBoundary(cleanRoots, availableForRoots);
        if (truncatedRoots) {
          const candidate = `${question}${cleanDef}.${originPrefix}${truncatedRoots}…`;
          if (candidate.length <= maxLength) {
            return candidate;
          }
        }
      }
    }
    return baseDef;
  }

  // 3. Even definition alone exceeds maxLength: cut definition at word boundary
  const allowedDefLength = maxLength - question.length - 1;
  const truncatedDef = truncateWordBoundary(cleanDef, allowedDefLength);
  return `${question}${truncatedDef}…`;
}

