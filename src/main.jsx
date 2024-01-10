import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import './App.css'
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './assets/locales/ru/translation.json'
import en from './assets/locales/en/translation.json'
import az from './assets/locales/az/translation.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next)
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      ru: {translation: ru},
      en: {translation: en},
      az: {translation: az},
    },
    fallbackLng: "ru",
    detection: {
      order: ['htmlTag', 'navigator', 'path', 'subdomain', 'querystring', 'cookie', 'localStorage', 'sessionStorage'],
      htmlTag: document.documentElement
    },

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
