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
import { ReactComponent as StructureIcon } from 'assets/svgs/structure.svg'
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

  const getCase = (path: string) => `/${path.split('/')[1]}`
  const getContent = () => {
    switch (getCase(location.pathname)) {
      case RoutePaths.DASHBOARD: {
        return {
          title: t('dashboard'),
          icon: <DashboardIcon className='dark:fill-white' />
        }
      }
      case RoutePaths.PROFILE: {
        return {
          title: t('profile'),
          icon: <UserIcon className='dark:fill-white' />
        }
      }
      case RoutePaths.VACANCIES: {
        return {
          title: t('vacancies'),
          icon: <JobIcon className='dark:fill-white' />
        }
      }
      case RoutePaths.CANDIDATES: {
        return {
          title: t('candidates'),
          icon: <CandidatesIcon className='dark:fill-white' />
        }
      }
      case RoutePaths.EMPLOYEES: {
        return {
          title: t('employees'),
          icon: <StructureIcon className='dark:fill-white' />
        }
      }
      default: {
        return {
          title: t('dashboard'),
          icon: <DashboardIcon className='dark:fill-white' />
        }
      }
    }
  }

  const { title, icon } = getContent()

  return (
    <div
      className={`
        fixed h-20 top-0 bg-white flex items-center dark:bg-dark-200
        border-b border-b-gray-300 px-8 py-4 z-10 overflow-y-auto
        ${isPhoneLarge ? 'w-full' : canBeCollapsed ? 'w-contentMax' : 'w-content'}
      `}
    >
      {isPhoneLarge && (
        <HamburgerIcon
          id='hamburger-icon'
          className='w-8 h-8 stroke-black dark:stroke-white'
          onClick={() => setIsSidebarOpen(prev => !prev)}
        />
      )}
      <div className='flex gap-2 items-center mx-auto dark:text-white'>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      {!isPhoneLarge && <div className='flex justify-end'>
        <div className='border-r border-r-grayLight'>
          <Button
            icon={<LanguageIcon className='w-5 h-5 dark:stroke-grayLight' />}
            type='secondary'
            onClick={handleLang}
            className='dark:!text-grayLight'
          >
            {t('language')}
          </Button>
        </div>
        <Button
          icon={<LogOutIcon className='w-5 h-5 dark:stroke-grayLight' />}
          type='secondary'
          onClick={() => dispatch(logOut())}
          className='dark:!text-grayLight'
        >
          {t('logout')}
        </Button>
      </div>}
    </div>
  )
}

export default Header

addTranslationNamespace(TranslationNamespace.header, headerEn, headerUa)
