/**
 * Category-based group display order configuration and helper.
 * When a category has an explicit list, its groups will be displayed in this exact order.
 * Groups not in the list will be appended at the end sorted by minId ascending.
 * Categories without an explicit list will default to minId ascending sorting.
 */

export const CATEGORY_GROUP_ORDER = {
  face_bones: [
    'Maxilla',
    'Mandibula',
    'Os Palatinum',
    'Os Zygomaticum',
    'Os Nasale',
    'Os Lacrimale',
    'Vomer',
    'Concha Nasalis Inferior',
    'Os Hyoideum'
  ]
};

/**
 * Builds and sorts term groups based on category group order or minId fallback.
 * 
 * @param {Array} terms - Array of term objects { id, group, ... }
 * @param {string} categoryId - Selected category ID (e.g. 'face_bones', 'skull_bones')
 * @param {string} otherStructuresTitle - Title for ungrouped terms ('Diğer Yapılar' / 'Other Structures')
 * @returns {Array|null} Array of group objects [{ name, minId, terms: [] }] or null if no groups exist
 */
export function buildTermGroups(terms, categoryId, otherStructuresTitle = 'Diğer Yapılar') {
  if (!terms || terms.length === 0) return null;

  const hasAnyGroup = terms.some((t) => Boolean(t.group && t.group.trim()));
  if (!hasAnyGroup) return null;

  const groupsMap = new Map();
  const ungrouped = [];

  terms.forEach((term) => {
    const gName = term.group ? term.group.trim() : '';
    if (gName) {
      if (!groupsMap.has(gName)) {
        groupsMap.set(gName, {
          name: gName,
          minId: Number(term.id) || Infinity,
          terms: [],
        });
      }
      const g = groupsMap.get(gName);
      g.terms.push(term);
      if (Number(term.id) < g.minId) {
        g.minId = Number(term.id);
      }
    } else {
      ungrouped.push(term);
    }
  });

  const predefinedOrder = CATEGORY_GROUP_ORDER[categoryId];
  let sortedGroups = [];

  if (Array.isArray(predefinedOrder)) {
    // 1. Add groups in the predefined order (ONLY if they actually exist in the data)
    predefinedOrder.forEach((name) => {
      if (groupsMap.has(name)) {
        sortedGroups.push(groupsMap.get(name));
      }
    });

    // 2. Any group present in the data but not in predefinedOrder must NOT be lost:
    // Append them sorted by minId ascending.
    const remainingGroups = [];
    groupsMap.forEach((group, name) => {
      if (!predefinedOrder.includes(name)) {
        remainingGroups.push(group);
      }
    });
    remainingGroups.sort((a, b) => a.minId - b.minId);
    sortedGroups.push(...remainingGroups);
  } else {
    // No predefined order for this category: sort all by minId ascending
    sortedGroups = Array.from(groupsMap.values()).sort((a, b) => a.minId - b.minId);
  }

  // 3. Ungrouped terms ("Diğer Yapılar") always go to the very end
  if (ungrouped.length > 0) {
    sortedGroups.push({
      name: otherStructuresTitle,
      minId: Infinity,
      terms: ungrouped,
    });
  }

  return sortedGroups;
}
