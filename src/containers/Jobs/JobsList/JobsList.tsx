import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent } from "react";

import jobsListEn from './JobsList_en.json'
import jobsListUa from './JobsList_ua.json'
import { Job } from "common/types/common";
import JobItem from "./JobItem";

const jobs: Array<Job> = [
  {
    id: 2,
    img: '123',
    createdAt: '6 July',
    type: 'Design',
    position: 'Senior Product Designer',
    location: 'Lviv',
    description: 'We are looking for a programmer with a keen eye for design for the position of UI UX designer king for a programmer with a keen eye for design for the position of UI UX designer',
    candidatesCount: 20,
  },
  {
    id: 2,
    img: '123',
    createdAt: '6 July',
    type: 'Design',
    position: 'Senior Product Designer qweqweqweqweqwe',
    location: 'Lviv',
    description: 'We are looking for a programmer with a keen eye for design for the pos',
    candidatesCount: 20,
  },
  {
    id: 2,
    img: '123',
    createdAt: '6 July',
    type: 'Design',
    position: 'Senior Product Designer',
    location: 'Lviv',
    description: 'We are looking for a programmer with a keen eye for design for the position of UI UX designer king for a programmer with a keen eye for design for the position of UI UX designer',
    candidatesCount: 20,
  },
  {
    id: 2,
    img: '123',
    createdAt: '6 July',
    type: 'Design',
    position: 'Senior Product Designer',
    location: 'Lviv',
    description: 'We are looking for a programmer with a keen eye for design for the position of UI UX designer king for a programmer with a keen eye for design for the position of UI UX designer',
    candidatesCount: 20,
  }
]

const JobsList: FunctionComponent = () => {

  const list = jobs.map(item => <JobItem job={item} />)

  return <div className='flex flex-wrap gap-[2rem]'>
    {list}
    <JobItem isNew />
  </div>
}

export default JobsList

addTranslationNamespace(TranslationNamespace.jobsList, jobsListEn, jobsListUa)
