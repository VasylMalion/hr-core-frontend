import { FunctionComponent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from 'i18n'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { LOCAL_STORAGE_LANGUAGE_KEY } from 'common/constants'
import { RoutePaths } from 'containers/AppRouter'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useScreenResolution } from 'hooks/useScreenResolution'
import { logOut } from 'store/slices/authSlice'
import { Lang } from 'common/types/common'
import { Button } from 'ui-components'

import { ReactComponent as DashboardIcon } from 'assets/svgs/dashboard.svg'
import { ReactComponent as UserIcon } from 'assets/svgs/user.svg'
import { ReactComponent as JobIcon } from 'assets/svgs/job.svg'
import { ReactComponent as CandidatesIcon } from 'assets/svgs/candidates.svg'
import { ReactComponent as LogOutIcon } from 'assets/svgs/exit.svg'
import { ReactComponent as HamburgerIcon } from 'assets/svgs/hamburger.svg'
import { ReactComponent as LanguageIcon } from 'assets/svgs/language.svg'

import headerEn from './Header_en.json'
import headerUa from './Header_ua.json'

type HeaderProps = {
  setIsSidebarOpen: (value: boolean | ((prev: boolean) => boolean)) => void
}

const Header: FunctionComponent<HeaderProps> = ({ setIsSidebarOpen }) => {
  const { t } = useTranslation(TranslationNamespace.header)
  const { isPhoneLarge } = useScreenResolution()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const isCollapsed = useAppSelector(state => state.auth.isCollapsed)
  const canBeCollapsed = isCollapsed && !isPhoneLarge

  const handleLang = () => i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, i18n.language)
    i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)
  }, [i18n])

  const getCase = (path: string) => location.pathname.startsWith(path) ? path : ''
  const getContent = () => {
    switch (location.pathname) {
      case getCase(RoutePaths.DASHBOARD): {
        return {
          title: t('dashboard'),
          icon: <DashboardIcon className='fill-current' />
        }
      }
      case RoutePaths.PROFILE: {
        return {
          title: t('profile'),
          icon: <UserIcon className='fill-current' />
        }
      }
      case getCase(RoutePaths.VACANCIES): {
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

  return (
    <div className={`
      fixed h-20 top-0 bg-white flex items-center 
      border-b border-b-gray-300 px-8 py-4 z-10 overflow-y-auto
      ${isPhoneLarge ? 'w-full' : canBeCollapsed ? 'w-contentMax' : 'w-content'}
      `}
    >
      {isPhoneLarge && (
        <HamburgerIcon
          className='w-8 h-8'
          onClick={() => setIsSidebarOpen(prev => !prev)}
        />
      )}
      <div className='flex gap-2 items-center mx-auto'>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      {!isPhoneLarge && <div className='flex justify-end'>
        <div className='border-r border-r-grayLight'>
          <Button
            icon={<LanguageIcon className='w-5 h-5' />}
            type='secondary'
            onClick={handleLang}
          >
            {t('language')}
          </Button>
        </div>
        <Button
          icon={<LogOutIcon className='w-5 h-5' />}
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
