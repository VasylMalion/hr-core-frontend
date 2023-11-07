import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import { ContentSection, Status, Theme, VacancyStatus } from 'common/types/common'
import { formatDate } from 'common/utils/common'
import { Typography, WithPreload } from 'ui-components'
import AvatarIcon from 'assets/images/avatar.png'
import AvatarWhiteIcon from 'assets/images/avatar-white.png'
import { LOCAL_STORAGE_THEME_KEY } from 'common/constants'

type TimelineProps = {
  createdAt: Date
  updatedAt: Date
  deadlineDate: Date
  status: VacancyStatus
  createdBy: {
    id: string
    name: string
    surname: string
  }
  assignedTo: {
    id: string
    name: string
    surname: string
  }
  vacancyStatus: Status
}

const Timeline: FunctionComponent<TimelineProps> = ({
  createdAt,
  updatedAt,
  deadlineDate,
  status,
  createdBy,
  assignedTo,
  vacancyStatus,
}) => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)

  const isDarkTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === Theme.DARK

  const timeline = [
    {
      title: t('createdAt'),
      value: formatDate(createdAt),
    },
    {
      title: t('deadlineDate'),
      value: deadlineDate ? formatDate(deadlineDate) : '-',
    },
    {
      title: t('closedAt'),
      value: status === VacancyStatus.INACTIVE ? formatDate(updatedAt) : '-',
    },
  ]

  const hiringTeam = [
    {
      title: t('createdBy'),
      value: `${createdBy?.name} ${createdBy?.surname}`,
    },
    {
      title: t('assignedTo'),
      value: `${assignedTo?.name} ${assignedTo?.surname}`,
    },
  ]

  const getContent = (title: string, info: ContentSection, withIcon?: boolean) => (
    <div>
      <Typography appearance='subtitle'>
        {t(title)}
      </Typography>
      <div className='grid gap-2 dark:bg-dark-100 bg-white p-4 rounded'>
        {info.map(item => (
          <div className='flex gap-2 items-center'>
            <span className='font-[ceraProLight]'>{item.title}</span>
            {withIcon ? (
              <div className='flex items-center gap-1'>
                <img src={isDarkTheme ? AvatarWhiteIcon : AvatarIcon} className='w-8 h-8' />
                <span>{item.value}</span>
              </div>
            ) : (
              <span>{item.value}</span>
            )}
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
      <div className='max-w-medium flex flex-col gap-6 my-8'>
        {getContent('timeline', timeline)}
        {getContent('hiringTeam', hiringTeam, true)}
      </div>
    </WithPreload>
  )
}

export default Timeline
