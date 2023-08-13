import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent } from "react";
import Typography from "ui-components/Typography/Typography";

import { ReactComponent as PlusIcon } from "assets/svgs/plus.svg"

import jobItemEn from './JobsList_en.json'
import jobItemUa from './JobsList_ua.json'
import { Job } from "common/types/common";

type JobItemProps = {
  job?: Job
  isNew?: boolean 
}

const JobItem: FunctionComponent<JobItemProps> = ({ job, isNew = false }) => {

  if (isNew) {
    return <div className='cursor-pointer min-h-[16rem] w-[16rem] p-[1.5rem] rounded-[5px] flex flex-col border border-dashed	border-border justify-center items-center text-green'>
      <PlusIcon />
      <div>Create new job</div>
  </div>
  }

  return <div className='min-h-[16rem] w-[16rem] bg-white p-[1.5rem] rounded-[5px] flex flex-col justify-between'>
    <div>
      <div className='text-greyLight'>{job.type}</div>
      <div className='font-[ceraProBold]'>{job.position}</div>
      <div className='font-[ceraProLight] pt-[0.25rem]'>{job.location}</div>
    </div>
    <div>
      <div className='overflow-hidden'>
        <div className='font-[ceraProLight] text-greyDark text-sm pt-[0.75rem] h-[5.8rem] text-ellipsis overflow-hidden whitespace-pre-wrap'>{job.description}</div>
      </div>
      <div className='flex justify-between pt-[1rem]'>
        <div className='text-greyDark'>{job.createdAt}</div>
        <div className='text-greyLight'>{job.candidatesCount} Candidates </div>
      </div>
    </div>
  </div>
}

export default JobItem

addTranslationNamespace(TranslationNamespace.candidates, jobItemEn, jobItemUa)
