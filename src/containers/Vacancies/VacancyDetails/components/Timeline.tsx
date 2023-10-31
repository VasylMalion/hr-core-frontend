import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"

import { TranslationNamespace } from "common/translations"
import { Status, VacancyStatus } from "common/types/common"
import { formatDate } from "common/utils/common"
import { Typography, WithPreload } from "ui-components"
import Avatarcon from "assets/images/avatar.png"

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

  return (
    <WithPreload
    isLoading={vacancyStatus.isLoading}
    isSuccess={vacancyStatus.isSuccess}
    isError={vacancyStatus.isError}
  >
    <div className='grid gap-2 max-w-[30rem] my-8'>
      <div>
        <Typography appearance='subtitle'>
          {t('timeline')}
        </Typography>
        <div className='grid gap-2 bg-white p-[1rem] rounded font-[ceraProLight]'>
          <div className='flex gap-2'>
            <span>{t('createdAt')}</span>
            <span>{formatDate(createdAt)}</span>
          </div>
          <div className='flex gap-2'>
            <span>{t('deadlineDate')}</span>
            <span>{deadlineDate ? formatDate(deadlineDate) : '-'}</span>
          </div>
          <div className='flex gap-2'>
            <span>{t('closedAt')}</span>
            <span>{status === VacancyStatus.INACTIVE ? formatDate(updatedAt) : '-'}</span>
          </div>
        </div>
      </div>
      <div className='mt-2'>
        <Typography appearance='subtitle'>
          {t('hiringTeam')}
        </Typography>
        <div className='grid gap-2 bg-white p-[1rem] rounded font-[ceraProLight]'>
          <div className='flex gap-2 items-center'>
            <span>{t('createdBy')}</span>
            <div className='flex items-center gap-1'>
              <img src={Avatarcon} className='w-[32px] h-[32px]' />
              <span>{`${createdBy?.name} ${createdBy?.surname}`}</span>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <span>{t('assignedTo')}</span>
            <div className='flex items-center gap-1'>
              <img src={Avatarcon} className='w-[32px] h-[32px]' />
              <span>{`${assignedTo?.name} ${assignedTo?.surname}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </WithPreload>
  )
}

export default Timeline
