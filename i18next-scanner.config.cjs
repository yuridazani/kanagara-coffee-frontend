// i18next-scanner.config.js
module.exports = {
  input: [
    'src/**/*.{js,jsx}', // Path ke file yang akan di-scan
    // Jangan sertakan file di node_modules
    '!src/node_modules/**',
  ],
  output: './', // Simpan file terjemahan di root
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 't'],
      extensions: ['.js', '.jsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
    },
    lngs: ['id'], // Bahasa sumber (source language)
    ns: [
      'translation'
    ],
    defaultLng: 'id',
    defaultNs: 'translation',
    defaultValue: (lng, ns, key) => key, // Tulis teks asli sebagai value
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: false, // Disarankan untuk key yang sederhana
    keySeparator: false, // Disarankan untuk key yang sederhana
  }
};