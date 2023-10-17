import { TranslationNamespace, addTranslationNamespace } from "common/translations"

import headerEn from './Header_en.json'
import headerUa from './Header_ua.json'
import { Button } from "ui-components"
import { FunctionComponent, useEffect, useState } from "react"
import i18n from "i18n"
import { Lang } from "common/types/common"
import Input from "ui-components/Input/Input"
import { useTranslation } from "react-i18next"

import { ReactComponent as MessageIcon } from "assets/svgs/message.svg"
import { ReactComponent as DashboardIcon } from "assets/svgs/dashboard.svg"
import { ReactComponent as CalendarIcon } from "assets/svgs/calendar.svg"
import { ReactComponent as UserIcon } from "assets/svgs/user.svg"

import { ReactComponent as JobIcon } from "assets/svgs/job.svg"
import { ReactComponent as CandidatesIcon } from "assets/svgs/candidates.svg"
import { ReactComponent as ReferralIcon } from "assets/svgs/referrals.svg"
import { ReactComponent as CareerIcon } from "assets/svgs/career.svg"
import { ReactComponent as DoubleArrowLeftIcon } from "assets/svgs/double-arrow-left.svg"
import { ReactComponent as DoubleArrowRightIcon } from "assets/svgs/double-arrow-right.svg"
import { ReactComponent as LogOutIcon } from "assets/svgs/exit.svg"
import { ReactComponent as HamburgerIcon } from "assets/svgs/hamburger.svg"

import { ReactComponent as LanguageIcon } from "assets/svgs/language.svg"
import { useLocation } from "react-router-dom"
import { RoutePaths } from "containers/AppRouter"
import { logOut } from "store/slices/authSlice"
import { useAppDispatch } from "hooks/redux"
import { useScreenResolution } from "hooks/useScreenResolution"


type HeaderProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen:  any
}

const Header: FunctionComponent<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const { t } = useTranslation(TranslationNamespace.header)

  const location = useLocation()

  const dispatch = useAppDispatch()

  const getContent = () => {
    switch (location.pathname) {
      case RoutePaths.DASHBOARD: {
        return {
          title: t('dashboard'),
          icon: <DashboardIcon className='fill-current' />
        }
      }
      case RoutePaths.PROFILE: {
        return {
          title: t('profile'),
          icon: <UserIcon className='fill-current w-[20px] h-[20px]' />
        }
      }
      case RoutePaths.JOBS: {
        return {
          title: t('jobs'),
          icon: <JobIcon className='fill-current' />
        }
      }
      case RoutePaths.CANDIDATES: {
        return {
          title: t('candidates'),
          icon: <CandidatesIcon className='fill-current' />
        }
      }
      default: {
        return {
          title: t('dashboard'),
          icon: <DashboardIcon className='fill-current' />
        }
      }
    }
  }

  const { title, icon } = getContent()

  useEffect(() => {
    localStorage.setItem('language', i18n.language)
    i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)
  }, [i18n])

  const handleLang = () => i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)

  const { isPhoneLarge } = useScreenResolution()

  return (
    <div className={`fixed h-[5rem] top-0 bg-white flex items-center ${isPhoneLarge ? 'w-full' : 'w-[calc(100vw_-_16rem)]'} border-b border-b-[#091e4214] px-[2rem] py-[1rem] z-50`}>
      {isPhoneLarge && <HamburgerIcon className='w-[2rem] h-[2rem]' onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}/>}
      <div className='flex gap-2 items-center mx-auto'>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      { !isPhoneLarge && <div className='flex justify-end'>
        <div className='border-r border-r-greyLight'>
          <Button
            icon={<LanguageIcon className='w-[20px] h-[20px]' />}
            type='secondary'
            onClick={handleLang}
            className='text-[#58abc8]'
          >
            {t('language')}
          </Button>
        </div>
        <Button
          icon={<LogOutIcon className='w-[20px] h-[20px]' />}
          type='secondary'
          onClick={() => dispatch(logOut())}
        >
          {t('logout')}
        </Button>
      </div>}
    </div>
  )
}

export default Header

addTranslationNamespace(TranslationNamespace.header, headerEn, headerUa)
