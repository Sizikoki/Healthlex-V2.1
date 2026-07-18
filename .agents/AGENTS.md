# Healthlex-V2.1 Project Rules

This document specifies the formatting and style rules that Antigravity must follow when seeding database records or integrating local data files for the Healthlex project.

## Capitalization Standards

Whenever seeding new JSON datasets into Firestore (via `upload.js` seed script) or merging them into the local frontend bundle (`medicalTerms.js`), apply the following casing rules automatically:

### 1. Latin Medical Terms (`term` key)
- Every word must start with an uppercase letter using Turkish locale-aware rules (`toLocaleUpperCase('tr-TR')`).
- Remaining characters in each word must be lowercased (`toLocaleLowerCase('tr-TR')`).
- Hyphenated sub-words must also follow this pattern (e.g. `Acromio-Claviculare`).

### 2. English Translations / Terms (`english` / `turkish` key)
- Must follow Title Case format under Turkish locale-aware rules.
- **Exceptions:**
  - Do not capitalize small conjunctions and prepositions: `of`, `the`, `and`, `in`, `to`, `with`, `for`, `at`, `by`, `from`. They must remain lowercase.
  - Acronyms inside parentheses (e.g., `(ACL)`, `(PCL)`, `(MCL)`, `(LCL)`, `(MTP)`) must remain fully capitalized.

### 3. Turkish Definitions / Explanations (`turkishDefinition` / `definition` key)
- Must remain completely untouched; preserve the original string as-is.

### 4. Turkish Short Definitions (`turkishShort` key)
- Represents a condensed/shortened definition of the term (e.g. for card games and matching cards).
- Must be a short string, usually derived from the part before the semicolon `;` in the full definition.
- Must remain completely untouched once set/derived.

