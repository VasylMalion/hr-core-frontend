import { TranslationNamespace, addTranslationNamespace } from "common/translations"

import headerEn from './Header_en.json'
import headerUa from './Header_ua.json'
import { Button } from "ui-components"
import { useEffect } from "react"
import i18n from "i18n"
import { Lang } from "common/types/common"

const Header = () => {

  useEffect(() => {
    localStorage.setItem('language', i18n.language)
    i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)
  }, [i18n])

  return (
    <div className='h-[5rem] w-full border-b border-b-[#091e4214]'>
      <Button onClick={() => i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)}>dfsdf</Button>
      Header
    </div>
  )
}

export default Header

addTranslationNamespace(TranslationNamespace.header, headerEn, headerUa)
