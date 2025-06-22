import { I18n } from "i18n";
import path, { dirname } from 'node:path';

const i18n = new I18n({
  locales: ['en', 'es'],
  directory: path.join('dirname', '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
})

export default i18n