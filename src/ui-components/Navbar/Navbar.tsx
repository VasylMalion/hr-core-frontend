import { FunctionComponent, ReactNode, useEffect, useRef } from 'react'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from 'i18n'

import { RoutePaths } from 'containers/AppRouter'
import { ToolTip, Button, Typography } from 'ui-components'
import { Lang, RoleTypes, Theme } from 'common/types/common'
import { useScreenResolution } from 'hooks/useScreenResolution/useScreenResolution'
import { collapseNavbar, logOut } from 'store/slices/authSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import {
  TranslationNamespace,
  addTranslationNamespace,
} from 'common/translations'
import { LOCAL_STORAGE_THEME_KEY } from 'common/constants'

import LogoLight from 'assets/images/logo-light.png'
import LogoDark from 'assets/images/logo-dark.png'
import LogoLightMini from 'assets/images/logo-light-mini.png'
import LogoDarkMini from 'assets/images/logo-dark-mini.png'
import DashboardIcon from 'assets/svgs/DashboardIcon'
import UserIcon from 'assets/svgs/UserIcon'
import VacanciesIcon from 'assets/svgs/VacanciesIcon'
import CandidatesIcon from 'assets/svgs/CandidatesIcon'
import StructureIcon from 'assets/svgs/StructureIcon'
import DoubleArrowIcon from 'assets/svgs/DoubleArrowIcon'
import LogOutIcon from 'assets/svgs/LogoutIcon'
import LanguageIcon from 'assets/svgs/LanguageIcon'
import DarkModeIcon from 'assets/svgs/DarkModeIcon'
import LightModeIcon from 'assets/svgs/LightModeIcon'

import navbarEn from './Navbar_en.json'
import navbarUa from './Navbar_ua.json'

type Links = Array<{
  title: string
  path: string
  icon: ReactNode
}>

type NavbarProps = {
  toggleTheme?: () => void
  setIsSidebarOpen?: (value: boolean) => void
}

const Navbar: FunctionComponent<NavbarProps> = ({
  setIsSidebarOpen,
  toggleTheme,
}) => {
  const { t } = useTranslation(TranslationNamespace.navbar)
  const { isPhoneLarge } = useScreenResolution()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const ref = useRef(null)

  const isDarkTheme =
    localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === Theme.DARK
  const isCollapsed = useAppSelector((state) => state.auth.isCollapsed)
  const canBeCollapsed = isCollapsed && !isPhoneLarge

  const handleLang = () =>
    i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)
  const handleCollapsedClick = () => dispatch(collapseNavbar())

  const data = useAppSelector((state) => state.auth.userInfo)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const condition =
        isPhoneLarge &&
        ref.current &&
        (event.target as HTMLDivElement).id !== 'hamburger-icon' &&
        (!ref.current.contains(event.target) ||
          (ref.current.contains(event.target) &&
            (event.target as HTMLDivElement).tagName === 'BUTTON') ||
          (event.target as HTMLDivElement).tagName === 'IMG')

      if (condition) setIsSidebarOpen(false)
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setIsSidebarOpen])

  const menuLinks: Links = [
    {
      title: 'dashboard',
      path: RoutePaths.DASHBOARD,
      icon: <DashboardIcon className="fill-current dark:fill-white" />,
    },
    {
      title: 'profile',
      path: RoutePaths.PROFILE,
      icon: <UserIcon className="fill-current dark:fill-white" />,
    },
  ]

  const recruitmentLinks = [
    {
      title: 'vacancies',
      path: RoutePaths.VACANCIES,
      icon: <VacanciesIcon className="fill-current dark:fill-white" />,
    },
    {
      title: 'candidates',
      path: RoutePaths.CANDIDATES,
      icon: <CandidatesIcon className="fill-current dark:fill-white" />,
    },
  ]

  const organizationLinks = [
    {
      title: 'employees',
      path: RoutePaths.EMPLOYEES,
      icon: <StructureIcon className="fill-current dark:fill-white" />,
    },
  ]

  const isActive = (path: string) => location.pathname.startsWith(path)

  const mobileButtons = [
    {
      title: t(isDarkTheme ? 'lightMode' : 'darkMode'),
      icon: isDarkTheme ? (
        <LightModeIcon className="dark:fill-grayLight" />
      ) : (
        <DarkModeIcon className="fill-current" />
      ),
      onClick: toggleTheme,
    },
    {
      title: t('language'),
      icon: <LanguageIcon className="w-5 h-5 dark:stroke-grayLight" />,
      onClick: handleLang,
    },
    {
      title: t('logout'),
      icon: <LogOutIcon className="w-5 h-5 dark:stroke-grayLight" />,
      onClick: () => dispatch(logOut()),
    },
  ]

  const controlButtons = [
    {
      title: t(isDarkTheme ? 'lightMode' : 'darkMode'),
      icon: isDarkTheme ? (
        <LightModeIcon className="dark:!fill-grayLight" />
      ) : (
        <DarkModeIcon className="fill-current" />
      ),
      onClick: toggleTheme,
    },
    {
      title: t('collapseSidebar'),
      icon: (
        <DoubleArrowIcon
          className={`fill-current dark:!fill-grayLight ${
            !isCollapsed && 'rotate-180'
          }`}
        />
      ),
      onClick: handleCollapsedClick,
    },
  ]

  const getSection = (title: string, links: Links) => (
    <div className="mt-4">
      {!canBeCollapsed && (
        <Typography appearance="subtitle" className="pl-6 mb-2 text-gray-[600]">
          {title}
        </Typography>
      )}
      <div className="flex flex-col gap-1">
        {links.map((item, index) => (
          <NavLink key={index} to={item.path}>
            <ToolTip text={canBeCollapsed ? t(item.title) : ''}>
              <Button
                icon={item.icon}
                type={isActive(item.path) ? 'primary' : 'secondary'}
                className={
                  canBeCollapsed
                    ? `${!isActive && 'hover:bg-gray-100'} 
                  !min-w-[2rem] !px-3 flex justify-center dark:text-white`
                    : 'w-full dark:text-white'
                }
              >
                {!canBeCollapsed && t(item.title)}
              </Button>
            </ToolTip>
          </NavLink>
        ))}
      </div>
    </div>
  )

  const getControlSection = controlButtons.map((item, index) => (
    <ToolTip key={index} text={canBeCollapsed ? t(item.title) : ''}>
      <Button
        onClick={(event) => {
          event.stopPropagation()
          item.onClick()
        }}
        icon={item.icon}
        type="secondary"
        className={
          canBeCollapsed
            ? '!min-w-[2rem] !px-3 flex justify-center dark:text-white'
            : 'dark:!text-grayLight'
        }
      >
        {!canBeCollapsed && t(item.title)}
      </Button>
    </ToolTip>
  ))

  const mobileButtonsContent = mobileButtons.map((item, index) => (
    <Button
      key={index}
      icon={item.icon}
      type="secondary"
      onClick={(event) => {
        event.stopPropagation()
        item.onClick()
      }}
    >
      {item.title}
    </Button>
  ))

  return (
    <div
      ref={ref}
      className={`
        bg-white dark:bg-dark-200 dark:text-white dark:border-r-black
        flex flex-col justify-between sticky top-0 py-8 border-r border-r-gray-200 
        ${isPhoneLarge ? 'h-content' : 'h-screen'}
        ${canBeCollapsed ? 'w-16 px-2' : 'w-navbar px-3'}
      `}
    >
      <div>
        <img
          src={
            canBeCollapsed
              ? isDarkTheme
                ? LogoDarkMini
                : LogoLightMini
              : isDarkTheme
              ? LogoDark
              : LogoLight
          }
          className={`${
            canBeCollapsed ? 'px-2' : 'px-10'
          } mx-auto cursor-pointer mb-6`}
          onClick={() => navigate(RoutePaths.DASHBOARD)}
        />
        <div>
          {getSection(t('menu'), menuLinks)}
          {data?.role === RoleTypes.ADMIN &&
            getSection(t('recruitment'), recruitmentLinks)}
          {getSection(t('organization'), organizationLinks)}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {isPhoneLarge ? mobileButtonsContent : getControlSection}
      </div>
    </div>
  )
}

export default Navbar

addTranslationNamespace(TranslationNamespace.navbar, navbarEn, navbarUa)
