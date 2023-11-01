import { FunctionComponent } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import { VacancyStatus, Vacancy } from 'common/types/common'
import { RoutePaths } from 'containers/AppRouter'
import { formatDate } from 'common/utils/common'
import Avatarcon from 'assets/images/avatar.png'

type VacancyItemProps = Vacancy

const VacancyItem: FunctionComponent<VacancyItemProps> =
  ({ id, position, location, description, createdAt, status, assignedTo }) => {

    const { t } = useTranslation(TranslationNamespace.vacancies)
    const navigate = useNavigate()

    const handleClick = () => navigate(generatePath(RoutePaths.VACANCY_DETAILS, { id }))

    return (
      <div
        onClick={handleClick}
        className='min-h-[16rem] w-64 bg-white p-6 rounded-md flex flex-col justify-between cursor-pointer'>
        <div>
          <div className='font-[ceraProBold]'>{position}</div>
          <div className='font-[ceraProLight] pt-1'>{location}</div>
        </div>
        <div>
          <div className='overflow-hidden'>
            <div
              className='font-[ceraProLight] text-gray-500 text-sm pt-3 h-24
          text-ellipsis overflow-hidden whitespace-pre-wrap'
            >
              {description}
            </div>
          </div>
          <div className='grid gap-2 pt-4'>
            <div className='flex justify-between'>
              <div className='text-gray-500'>{formatDate(createdAt)}</div>
              <div className={status === VacancyStatus.ACTIVE ? 'text-green' : 'text-red'}>
                {t(`tabs.${status}`)}
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <img src={Avatarcon} className='w-8 h-8' />
              <span>{`${assignedTo.name} ${assignedTo.surname}`}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default VacancyItem
