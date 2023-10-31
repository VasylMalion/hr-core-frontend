import { NavLink, useLocation } from "react-router-dom";
import { FunctionComponent, ReactNode, useState } from "react"
import LogoLight from "assets/images/logo-light.png"
import LogoLightMini from "assets/images/logo-light-mini.png"
import Typography from "ui-components/Typography/Typography"
import Button from "ui-components/Button/Button"
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "containers/AppRouter";
import { ToolTip } from "ui-components";

import { ReactComponent as MessageIcon } from "assets/svgs/message.svg"
import { ReactComponent as DashboardIcon } from "assets/svgs/dashboard.svg"
import { ReactComponent as UserIcon } from "assets/svgs/user.svg"
import { ReactComponent as CalendarIcon } from "assets/svgs/calendar.svg"
import { ReactComponent as JobIcon } from "assets/svgs/job.svg"
import { ReactComponent as CandidatesIcon } from "assets/svgs/candidates.svg"
import { ReactComponent as ReferralIcon } from "assets/svgs/referrals.svg"
import { ReactComponent as CareerIcon } from "assets/svgs/career.svg"
import { ReactComponent as DoubleArrowLeftIcon } from "assets/svgs/double-arrow-left.svg"
import { ReactComponent as DoubleArrowRightIcon } from "assets/svgs/double-arrow-right.svg"
import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { ReactComponent as LogOutIcon } from "assets/svgs/exit.svg"
import { ReactComponent as HamburgerIcon } from "assets/svgs/hamburger.svg"

import { ReactComponent as LanguageIcon } from "assets/svgs/language.svg"

import navbarEn from './Navbar_en.json'
import navbarUa from './Navbar_ua.json'
import { useTranslation } from "react-i18next";
import { IS_COLLAPSED_SIDEBAR } from "common/constants";
import i18n from "i18n";
import { Lang } from "common/types/common";
import { useScreenResolution } from "hooks/useScreenResolution";
import { collapseNavbar, logOut } from "store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux";

type Links = Array<{
  title: string
  path: string
  icon: ReactNode
}>

const Navbar: FunctionComponent = () => {

  const dispatch = useAppDispatch()
  const handleLang = () => i18n.changeLanguage(i18n.language === Lang.ua ? Lang.en : Lang.ua)

  const { isPhoneLarge } = useScreenResolution()
  const isCollapsed = useAppSelector(state => state.auth.isCollapsed)

  const canBeCollapsed = isCollapsed && !isPhoneLarge

  const handleCollapsedClick = () => dispatch(collapseNavbar())

  const navigate = useNavigate()
  const { t } = useTranslation(TranslationNamespace.navbar)

  const menuLinks: Links = [
    {
      title: t('dashboard'),
      path: RoutePaths.DASHBOARD,
      icon: <DashboardIcon className='fill-current' />
    },
    {
      title: 'profile',
      path: RoutePaths.PROFILE,
      icon: <UserIcon className='fill-current w-[20px] h-[20px] fill-[#787878]' />
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

  const location = useLocation();

  const isActive = (path: string) => {
    const currentPath = location.pathname
    return currentPath.startsWith(path)
  }

  const getSection = (title: string, links: Links) => (
    <div className='mt-4'>
      {
        !canBeCollapsed && (
          <Typography appearance="subtitle" className='pl-6 mb-2 text-[#333333]'>
            {title}
          </Typography>
        )
      }
      <div className='flex flex-col gap-1'>{
        links.map(((item, index) => (
          <NavLink
            key={index}
            to={item.path}
          >
            {() => (
              <ToolTip text={canBeCollapsed ? t(item.title) : ''}>
                <Button
                  icon={item.icon}
                  type={isActive(item.path) ? 'primary' : 'secondary'}
                  className={
                    canBeCollapsed ? `${!isActive && 'hover:bg-[#091e4214]'} 
                    !min-w-[2rem] px-[1rem] flex justify-center` : 'w-full'
                  }
                >
                  {!canBeCollapsed && t(item.title)}
                </Button>
              </ToolTip>
            )}
          </NavLink>
        )))
      }</div>
    </div>
  )

  return (
    <div className={
      `flex flex-col justify-between sticky top-0 py-8 border-r border-r-[#091e4214] ${isPhoneLarge ? 'h-[calc(100vh_-_5rem)]' : 'h-screen'}
        ${canBeCollapsed ? 'w-[4rem] px-[0.5rem]' : 'w-64 px-3'}`
    }
    >
      <div>
        <img src={canBeCollapsed ? LogoLightMini : LogoLight}
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
            icon={<LanguageIcon className='w-[20px] h-[20px]' />}
            type='secondary'
            onClick={handleLang}
            className='text-[#58abc8]'
          >
            {t('language')}
          </Button>
          <Button
            icon={<LogOutIcon className='w-[20px] h-[20px]' />}
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
                className='!min-w-[2rem] px-[1rem] flex justify-center hover:bg-[#091e4214]'
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
