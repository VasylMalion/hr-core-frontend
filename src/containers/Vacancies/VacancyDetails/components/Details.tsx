import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import { ContentSection, Status, VacancyStatus } from 'common/types/common'
import { Typography, WithPreload } from 'ui-components'

type DetailsProps = {
  department: string
  position: string
  location: string
  description: string
  status: VacancyStatus
  salaryMin: number
  salaryMax: number
  vacancyStatus: Status
}

const Details: FunctionComponent<DetailsProps> = ({
  department,
  position,
  location,
  description,
  status,
  salaryMin,
  salaryMax,
  vacancyStatus,
}) => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)

  const generalInfo = [
    {
      title: t('position'),
      value: position,
    },
    {
      title: t('department'),
      value: department,
    },
    {
      title: t('description'),
      value: description,
      isLarge: true,
    },
  ]

  const additionalInfo = [
    {
      title: t('salaryMin'),
      value: salaryMin ? t('salary', { value: salaryMin }) : '-',
    },
    {
      title: t('salaryMax'),
      value: salaryMax ? t('salary', { value: salaryMax }) : '-',
    },
    {
      title: t('location'),
      value: location,
    },
  ]

  const getContent = (title: string, info: ContentSection) => (
    <div>
      <Typography appearance='subtitle'>
        {t(title)}
      </Typography>
      <div className='grid gap-2 dark:bg-dark-100 bg-white p-4 rounded'>
        {info.map(item => (
          <div className={`${item.isLarge && 'flex-col'} flex gap-2`}>
            <span className='[font-ceraProLight]'>{item.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <WithPreload
      isLoading={vacancyStatus.isLoading}
      isSuccess={vacancyStatus.isSuccess}
      isError={vacancyStatus.isError}
    >
      <div className='grid gap-2 mt-8 mb-2'>
        <Typography appearance='subtitle' className='font-[ceraProLight]'>
          <div className='flex gap-2 items-center'>
            <span>{t('vacancyStatus')}</span>
            <div className='flex gap-1 items-center'>
              <div
                className={`
                  w-4 h-4 rounded-full 
                  ${status === VacancyStatus.ACTIVE ? 'bg-green' : 'bg-red'}
                `}
              />
              {t(`vacancyStatusVal.${status}`)}
            </div>
          </div>
        </Typography>
      </div>
      <div className='max-w-medium flex flex-col gap-6'>
        {getContent('generalInfo', generalInfo)}
        {getContent('additionalInfo', additionalInfo)}
      </div>
    </WithPreload>
  )
}

export default Details
