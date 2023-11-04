import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { Lang } from 'common/types/common'
import commonEn from 'common/Common_en.json'
import commonUa from 'common/Common_ua.json'
import uiComponentsEn from 'ui-components/UIComponents_en.json'
import uiComponentsUa from 'ui-components/UIComponents_ua.json'
import validationEn from 'common/validation/Validation_en.json'
import validationUa from 'common/validation/Validation_ua.json'

i18n
  .use(initReactI18next)
  .init({
    lng: Lang.ua,
    fallbackLng: Lang.en,
    resources: {
      en: {
        common: commonEn,
        uiComponents: uiComponentsEn,
        validation: validationEn,
      },
      ua: {
        common: commonUa,
        uiComponents: uiComponentsUa,
        validation: validationUa,
      }
    },
  })

export default i18n
