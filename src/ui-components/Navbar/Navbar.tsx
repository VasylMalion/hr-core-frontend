import { FunctionComponent, ReactNode } from 'react'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from 'i18n'

import { RoutePaths } from 'containers/AppRouter'
import { ToolTip, Button, Typography } from 'ui-components'
import { Lang } from 'common/types/common'
import { useScreenResolution } from 'hooks/useScreenResolution'
import { collapseNavbar, logOut } from 'store/slices/authSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { TranslationNamespace, addTranslationNamespace } from 'common/translations'

import LogoLight from 'assets/images/logo-light.png'
import LogoLightMini from 'assets/images/logo-light-mini.png'
import { ReactComponent as DashboardIcon } from 'assets/svgs/dashboard.svg'
import { ReactComponent as UserIcon } from 'assets/svgs/user.svg'
import { ReactComponent as JobIcon } from 'assets/svgs/job.svg'
import { ReactComponent as CandidatesIcon } from 'assets/svgs/candidates.svg'
import { ReactComponent as DoubleArrowLeftIcon } from 'assets/svgs/double-arrow-left.svg'
import { ReactComponent as DoubleArrowRightIcon } from 'assets/svgs/double-arrow-right.svg'
import { ReactComponent as LogOutIcon } from 'assets/svgs/exit.svg'
import { ReactComponent as LanguageIcon } from 'assets/svgs/language.svg'

import navbarEn from './Navbar_en.json'
import navbarUa from './Navbar_ua.json'

type Links = Array<{
  title: string
  path: string
  icon: ReactNode
}>

const Navbar: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.navbar)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { isPhoneLarge } = useScreenResolution()

  const isCollapsed = useAppSelector(state => state.auth.isCollapsed)
  const canBeCollapsed = isCollapsed && !isPhoneLarge

  const handleLang = () => i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)
  const handleCollapsedClick = () => dispatch(collapseNavbar())

  const menuLinks: Links = [
    {
      title: 'dashboard',
      path: RoutePaths.DASHBOARD,
      icon: <DashboardIcon className='fill-current' />
    },
    {
      title: 'profile',
      path: RoutePaths.PROFILE,
      icon: <UserIcon className='fill-current' />
    }
  ]

  const recruitmentLinks = [
    {
      title: 'vacancies',
      path: RoutePaths.VACANCIES,
      icon: <JobIcon className='fill-current' />
    },
    {
      title: 'candidates',
      path: RoutePaths.CANDIDATES,
      icon: <CandidatesIcon className='fill-current' />
    },
  ]

  const organizationLinks = [
    {
      title: 'employees',
      path: RoutePaths.EMPLOYEES,
      icon: <CandidatesIcon className='fill-current' />
    },
  ]

  const isActive = (path: string) => {
    const currentPath = location.pathname
    return currentPath.startsWith(path)
  }

  const getSection = (title: string, links: Links) => (
    <div className='mt-4'>
      {
        !canBeCollapsed && (
          <Typography appearance='subtitle' className='pl-6 mb-2 text-gray-[600]'>
            {title}
          </Typography>
        )
      }
      <div className='flex flex-col gap-1'>
        {links.map((item, index) => (
          <NavLink key={index} to={item.path}>
            <ToolTip text={canBeCollapsed ? t(item.title) : ''}>
              <Button
                icon={item.icon}
                type={isActive(item.path) ? 'primary' : 'secondary'}
                className={
                  canBeCollapsed ? `${!isActive && 'hover:bg-gray-100'} 
                    !min-w-[2rem] !px-3 flex justify-center` : 'w-full'
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

  return (
    <div
      className={`
        flex flex-col justify-between sticky top-0 py-8 border-r border-r-gray-200 bg-white 
        ${isPhoneLarge ? 'h-content' : 'h-screen'}
        ${canBeCollapsed ? 'w-16 px-2' : 'w-navbar px-3'}
      `}
    >
      <div>
        <img
          src={canBeCollapsed ? LogoLightMini : LogoLight}
          className={`${canBeCollapsed ? 'px-2' : 'px-6'} mx-auto cursor-pointer mb-6`}
          onClick={() => navigate(RoutePaths.DASHBOARD)}
        />
        <div>
          {getSection(t('menu'), menuLinks)}
          {getSection(t('recruitment'), recruitmentLinks)}
          {getSection(t('organization'), organizationLinks)}
        </div>
      </div>
      {isPhoneLarge ? (
        <div className='flex flex-col gap-1'>
          <Button
            icon={<LanguageIcon className='w-5 h-5' />}
            type='secondary'
            onClick={handleLang}
          >
            {t('language')}
          </Button>
          <Button
            icon={<LogOutIcon className='w-5 h-5' />}
            type='secondary'
            onClick={() => dispatch(logOut())}
          >
            {t('logout')}
          </Button>
        </div>
      ) : (
        <div onClick={handleCollapsedClick}>
          {canBeCollapsed ? (
            <ToolTip text={canBeCollapsed && t('expandSidebar')}>
              <Button
                icon={<DoubleArrowRightIcon className='fill-current' />}
                className='!min-w-[2rem] !px-3 flex justify-center hover:bg-gray-100'
                type='secondary'
              />
            </ToolTip>
          ) : (
            <Button icon={<DoubleArrowLeftIcon className='fill-current' />} type='secondary' >
              {t('collapseSidebar')}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar

addTranslationNamespace(TranslationNamespace.navbar, navbarEn, navbarUa)
