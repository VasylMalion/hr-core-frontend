import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import ContentIcon from 'assets/images/dashboard-content.png'
import { Typography } from 'ui-components'

import dashboardEn from './Dashboard_en.json'
import dashboardUa from './Dashboard_ua.json'

const Dashboard: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.dashboard)

  return (
    <div className='mt-8'>
      <Typography appearance='title' className='text-center'>
        {t('title')}
      </Typography>
      <img src={ContentIcon} className='mx-auto' draggable={false} />
    </div>
  )
}

export default Dashboard

addTranslationNamespace(TranslationNamespace.dashboard, dashboardEn, dashboardUa)
