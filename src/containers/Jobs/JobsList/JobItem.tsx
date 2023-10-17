import { FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as PlusIcon } from "assets/svgs/plus.svg"
import { TranslationNamespace, addTranslationNamespace } from "common/translations"
import Avatarcon from "assets/images/avatar.png"
import { Job, JobStatus } from "common/types/common"
import { RoutePaths } from "containers/AppRouter"
import { formatDate } from "common/utils/common"

import jobItemEn from './JobsList_en.json'
import jobItemUa from './JobsList_ua.json'
import { useTranslation } from "react-i18next"

type JobItemProps = {
  job?: Job
  isNew?: boolean
}

const JobItem: FunctionComponent<JobItemProps> = ({ job, isNew = false }) => {

  const { t } = useTranslation(TranslationNamespace.jobsList)
  const navigate = useNavigate()

  const handleCreationJob = () => navigate(RoutePaths.JOB_CREATION)
  const handleNavigation = () => navigate(RoutePaths.JOB_DETAILS)

  if (isNew) {
    return (
      <div
        onClick={handleCreationJob}
        className='cursor-pointer min-h-[16rem] w-[16rem] p-[1.5rem] rounded-[5px] flex 
      flex-col border border-dashed	border-border justify-center items-center text-green'
      >
        <PlusIcon />
        <div>Create new job</div>
      </div>
    )
  }

  return (
    <div
      onClick={handleNavigation}
      className='min-h-[16rem] w-[16rem] bg-white p-[1.5rem] rounded-[5px] 
      flex flex-col justify-between cursor-pointer'>
      <div>
        <div className='text-greyLight'>{job.type}</div>
        <div className='font-[ceraProBold]'>{job.position}</div>
        <div className='font-[ceraProLight] pt-[0.25rem]'>{job.location}</div>
      </div>
      <div>
        <div className='overflow-hidden'>
          <div
            className='font-[ceraProLight] text-greyDark text-sm pt-[0.75rem] h-[5.8rem]
          text-ellipsis overflow-hidden whitespace-pre-wrap'
          >
            {job.description}
          </div>
        </div>
        <div className='grid gap-2 pt-[1rem]'>
          <div className='flex justify-between'>
            <div className='text-greyDark'>{formatDate(job.createdAt)}</div>
            <div className={job.status === JobStatus.ACTIVE ? 'text-green' : 'text-red'}>
              {t(`tabs.${job.status}`)}
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <img src={Avatarcon} className='w-[32px] h-[32px]' />
            <span>{`${job.assignedTo.name} ${job.assignedTo.surname}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobItem

addTranslationNamespace(TranslationNamespace.candidates, jobItemEn, jobItemUa)
