import { FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { TranslationNamespace } from "common/translations"
import Avatarcon from "assets/images/avatar.png"
import { VacancyStatus, Vacancy } from "common/types/common"
import { RoutePaths } from "containers/AppRouter"
import { formatDate } from "common/utils/common"

type VacancyItemProps = Vacancy

const VacancyItem: FunctionComponent<VacancyItemProps> =
  ({ position, location, description, createdAt, status, assignedTo }) => {

    const { t } = useTranslation(TranslationNamespace.vacancies)
    const navigate = useNavigate()

    const handleCreationJob = () => navigate(RoutePaths.VACANCY_ADDING)
    const handleNavigation = () => navigate(RoutePaths.VACANCY_DETAILS)

    // if (isNew) {
    //   return (
    //     <div
    //       onClick={handleCreationJob}
    //       className='cursor-pointer min-h-[16rem] w-[16rem] p-[1.5rem] rounded-[5px] flex 
    //     flex-col border border-dashed	border-border justify-center items-center text-green'
    //     >
    //       <PlusIcon />
    //       <div>Create new job</div>
    //     </div>
    //   )
    // }

    return (
      <div
        onClick={handleNavigation}
        className='min-h-[16rem] w-[16rem] bg-white p-[1.5rem] rounded-[5px] 
      flex flex-col justify-between cursor-pointer'>
        <div>
          <div className='font-[ceraProBold]'>{position}</div>
          <div className='font-[ceraProLight] pt-[0.25rem]'>{location}</div>
        </div>
        <div>
          <div className='overflow-hidden'>
            <div
              className='font-[ceraProLight] text-greyDark text-sm pt-[0.75rem] h-[5.8rem]
          text-ellipsis overflow-hidden whitespace-pre-wrap'
            >
              {description}
            </div>
          </div>
          <div className='grid gap-2 pt-[1rem]'>
            <div className='flex justify-between'>
              <div className='text-greyDark'>{formatDate(createdAt)}</div>
              <div className={status === VacancyStatus.ACTIVE ? 'text-green' : 'text-red'}>
                {t(`tabs.${status}`)}
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <img src={Avatarcon} className='w-[32px] h-[32px]' />
              <span>{`${assignedTo.name} ${assignedTo.surname}`}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default VacancyItem
