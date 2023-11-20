import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import { ContentSection } from 'common/types/common'
import { Typography } from 'ui-components'
import { useAppSelector } from 'hooks/redux'
import { formatDate } from 'common/utils/common'

const Details: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.profile)

  const data = useAppSelector(state => state.auth.userInfo)

  const personalInfo = [
    {
      title: t('name'),
      value: data?.name,
    },
    {
      title: t('surname'),
      value: data?.surname,
    },
    {
      title: t('genderTitle'),
      value: t(`gender.${data?.gender}`),
    },
    {
      title: t('birthDate'),
      value: formatDate(data?.birthDate),
    },
  ]

  const contactInfo = [
    {
      title: t('email'),
      value: data?.email,
    },
    {
      title: t('mobile'),
      value: data?.mobileNumber,
    },
    {
      title: t('address'),
      value: data?.address,
    },
  ]

  const workInfo = [
    {
      title: t('department'),
      value: data?.department,
    },
    {
      title: t('position'),
      value: data?.position,
    },
    {
      title: t('startDate'),
      value: formatDate(data?.startDate)
    }
  ]

  const getContent = (title: string, info: ContentSection) => (
    <div>
      <Typography appearance='subtitle'>
        {t(title)}
      </Typography>
      <div className='grid gap-2 bg-white dark:bg-dark-100 p-4 rounded'>
        {info.map((item, index) => (
          <div className='flex gap-2' key={index}>
            <span className='font-[ceraProLight]'>{item.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div className='max-w-medium flex flex-col gap-6'>
        {getContent('personalInfo', personalInfo)}
        {getContent('contactInfo', contactInfo)}
        {getContent('workInfo', workInfo)}
      </div>
    </>
  )
}

export default Details
