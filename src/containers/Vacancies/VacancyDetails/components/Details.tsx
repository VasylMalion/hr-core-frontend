import { TranslationNamespace } from "common/translations";
import { Status, VacancyStatus } from "common/types/common";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Typography, WithPreload } from "ui-components";

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

  return (
    <WithPreload
      isLoading={vacancyStatus.isLoading}
      isSuccess={vacancyStatus.isSuccess}
      isError={vacancyStatus.isError}
    >
      <div className='grid gap-2 max-w-[30rem] my-8'>
        <Typography appearance='subtitle' className='font-[ceraProLight]'>
          <div className='flex gap-2 items-center'>
            <span>{t('vacancyStatus')}</span>
            <div className='flex gap-1 items-center'>
              <div className={
                `w-[1rem] h-[1rem] rounded-full ${status === VacancyStatus.ACTIVE ? 'bg-green' : 'bg-red'}`
              } />
              {t(`vacancyStatusVal.${status}`)}
            </div>
          </div>
        </Typography>
        <div>
          <Typography appearance='subtitle'>
            {t('generalInfo')}
          </Typography>
          <div className='grid gap-2 bg-white p-[1rem] rounded font-[ceraProLight]'>
            <div className='flex gap-2'>
              <span>{t('position')}</span>
              <span>{position}</span>
            </div>
            <div className='flex gap-2'>
              <span>{t('department')}</span>
              <span>{department}</span>
            </div>
            <div className='flex gap-2'>
              <span>{t('description')}</span>
              <span>{description}</span>
            </div>
          </div>
        </div>
        <div className='mt-2'>
          <Typography appearance='subtitle'>
            {t('additionalInfo')}
          </Typography>
          <div className='grid gap-2 bg-white p-[1rem] rounded font-[ceraProLight]'>
            <div className='flex gap-2'>
              <span>{t('salaryMin')}</span>
              <span>{salaryMin ? t('salary', { value: salaryMin }) : '-'}</span>
            </div>
            <div className='flex gap-2'>
              <span>{t('salaryMax')}</span>
              <span>{salaryMax ? t('salary', { value: salaryMax }) : '-'}</span>
            </div>
            <div className='flex gap-2'>
              <span>{t('location')}</span>
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </WithPreload>
  )
}

export default Details
