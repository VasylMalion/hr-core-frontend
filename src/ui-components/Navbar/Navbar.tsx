import { NavLink } from "react-router-dom";
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
import { ReactComponent as CalendarIcon } from "assets/svgs/calendar.svg"
import { ReactComponent as JobIcon } from "assets/svgs/job.svg"
import { ReactComponent as CandidatesIcon } from "assets/svgs/candidates.svg"
import { ReactComponent as ReferralIcon } from "assets/svgs/referrals.svg"
import { ReactComponent as CareerIcon } from "assets/svgs/career.svg"
import { ReactComponent as DoubleArrowLeftIcon } from "assets/svgs/double-arrow-left.svg"
import { ReactComponent as DoubleArrowRightIcon } from "assets/svgs/double-arrow-right.svg"
import { TranslationNamespace, addTranslationNamespace } from "common/translations";

import navbarEn from './Navbar_en.json'
import navbarUa from './Navbar_ua.json'
import { useTranslation } from "react-i18next";
import { IS_COLLAPSED_SIDEBAR } from "common/constants";
import i18n from "i18n";
import { Lang } from "common/types/common";

type Links = Array<{
  title: string
  path: string
  icon: ReactNode
}>

const Navbar: FunctionComponent = () => {

  const isCollapsedStore = JSON.parse(localStorage.getItem(IS_COLLAPSED_SIDEBAR))

  const [isCollapsed, setIsCollapsed] = useState<boolean>(!!isCollapsedStore)

console.log(i18n.language)

const handleCollapsedClick = () => {
  localStorage.setItem(IS_COLLAPSED_SIDEBAR, String(!isCollapsedStore))
  setIsCollapsed(!isCollapsedStore)
}

  const navigate = useNavigate()
  const { t } = useTranslation(TranslationNamespace.navbar)

  const menuLinks: Links = [
    {
      title: t('dashboard'),
      path: RoutePaths.DASHBOARD,
      icon: <DashboardIcon className='fill-current' />
    },
    // {
    //   title: 'Messages',
    //   path: RoutePaths.MESSAGES,
    //   icon: <MessageIcon />
    // },
    {
      title: 'calendar',
      path: RoutePaths.CALENDAR,
      icon: <CalendarIcon className='fill-current' />
    }
  ]

  const recruitmentLinks = [
    {
      title: 'jobs',
      path: RoutePaths.JOBS,
      icon: <JobIcon className='fill-current' />
    },
    {
      title: 'candidates',
      path: RoutePaths.CANDIDATES,
      icon: <CandidatesIcon className='fill-current' />
    },
    // {
    //   title: 'My referral',
    //   path: RoutePaths.REFERRALS,
    //   icon: <ReferralIcon />
    // },
    // {
    //   title: 'Career Site',
    //   path: RoutePaths.CAREER,
    //   icon: <CareerIcon />
    // }
  ]

  const organizationLinks = [
    {
      title: 'employees',
      path: RoutePaths.EMPLOYEES,
      icon: <CandidatesIcon className='fill-current' />
    },
    {
      title: 'structure',
      path: RoutePaths.STRUCTURE,
      icon: <CareerIcon className='fill-current' />
    }
  ]

  const getSection = (title: string, links: Links) => (
    <div className='mt-4'>
      {
        !isCollapsed && (
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
            {({ isActive }) => (
              <ToolTip text={isCollapsed ? t(item.title) : ''}>
                <Button
                  icon={item.icon}
                  type={isActive ? 'primary' : 'secondary'}
                  className={
                    isCollapsed ? `${!isActive && 'hover:bg-[#091e4214]'} 
                    !min-w-[2rem] px-[1rem] flex justify-center` : 'w-full'
                  }
                >
                  {!isCollapsed && t(item.title)}
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
      `flex flex-col justify-between h-screen sticky top-0 py-8 border-r border-r-[#091e4214]
        ${isCollapsed ? 'w-[4rem] px-[0.5rem]' : 'w-64 px-3'}`
    }
    >
      <div>
        <img src={isCollapsed ? LogoLightMini : LogoLight}
          className={`${isCollapsed ? 'px-2' : 'px-6'} mx-auto cursor-pointer mb-6`}
          onClick={() => navigate(RoutePaths.DASHBOARD)}
        />
        <div>
          {getSection(t('menu'), menuLinks)}
          {getSection(t('recruitment'), recruitmentLinks)}
          {getSection(t('organization'), organizationLinks)}
        </div>
      </div>
      <div onClick={handleCollapsedClick}>
        {isCollapsed ? (
          <ToolTip text={isCollapsed && t('expandSidebar')}>
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
    </div>
  )
}

export default Navbar

addTranslationNamespace(TranslationNamespace.navbar, navbarEn, navbarUa)
