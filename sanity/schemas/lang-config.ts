// Since schemas are code, we can programmatically build
// fields to hold translated values. We'll use this array
// of languages to determine which fields to define.
export const supportedLanguages = [
  { id: "en", title: "English" },
  { id: "sv", title: "Svenska", isDefault: true },
];

export const baseLanguage = supportedLanguages.find(l => l.isDefault);
