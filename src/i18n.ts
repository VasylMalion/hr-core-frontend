import { Lang } from "common/types/common";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from 'common/Common_en.json'
import commonUa from 'common/Common_ua.json'

i18n
  .use(initReactI18next)
  .init({
    lng: Lang.ua,
    fallbackLng: Lang.en,
    resources: {
      en: {
        common: commonEn,
      },
      ua: {
        common: commonUa,
      }
    },
  })

export default i18n
