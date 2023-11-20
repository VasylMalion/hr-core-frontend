import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { TabNavigation, Typography } from 'ui-components'

import Details from './components/Details/Details'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'

import profileEn from './Profile_en.json'
import profileUa from './Profile_ua.json'

enum TabNavigationTypes {
  DETAILS = 'DETAILS',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
}

const Profile: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.profile)

  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.DETAILS)

  const options = [
    {
      title: t('tabs.details'),
      value: TabNavigationTypes.DETAILS,
      testId: 'tab-details'
    },
    {
      title: t('tabs.updatePassword'),
      value: TabNavigationTypes.UPDATE_PASSWORD,
      testId: 'tab-upd-password'
    }
  ]

  const getContent = () => {
    switch (tab) {
      case TabNavigationTypes.DETAILS: {
        return <Details />
      }
      case TabNavigationTypes.UPDATE_PASSWORD: {
        return <UpdatePassword />
      }
      default: {
        return <Details />
      }
    }
  }

  return (
    <div data-testid='profile-page'>
      <Typography appearance='title'>
        {t('title')}
      </Typography>
      <TabNavigation<TabNavigationTypes>
        options={options}
        value={tab}
        onChange={setTab}
      />
      <div className='my-8'>{getContent()}</div>
    </div>
  )
}

export default Profile

addTranslationNamespace(TranslationNamespace.profile, profileEn, profileUa)
