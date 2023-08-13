import { Lang } from "common/types/common";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: Lang.ua,
    fallbackLng: Lang.en,
    resources: {
      en: {},
      ua: {}
    },
  })

export default i18n
