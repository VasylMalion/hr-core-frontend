import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent, useState } from "react";

import jobsListEn from './JobsList_en.json'
import jobsListUa from './JobsList_ua.json'
import { Job } from "common/types/common";
import JobItem from "./JobItem";
import TabNavigation from "ui-components/TabOptions/TabNavigation";
import { useTranslation } from "react-i18next";
import { useGetAllJobsQuery } from "services/JobService";

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

enum TabNavigationTypes {
  CANDIDATES = 'CANDIDATES',
  JOB_DETAILS = 'JOB_DETAILS',
  TIMELINE = 'TIMELINE',
  HIRING_TEAM = 'HIRING_TEAM',
}

const JobsList: FunctionComponent = () => {

  const { t } = useTranslation(TranslationNamespace.jobsList)

  const list = jobs.map(item => <JobItem job={item} />)

  const aaa = useGetAllJobsQuery({})

  console.log(aaa)

  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.CANDIDATES)

  const options = [
    {
      title: t('tabs.all'),
      type: TabNavigationTypes.CANDIDATES
    },
    {
      title: t('tabs.active'),
      type: TabNavigationTypes.JOB_DETAILS
    },
    {
      title: t('tabs.completed'),
      type: TabNavigationTypes.TIMELINE
    },
  ]

  return <div>
    <TabNavigation
      options={options}
      value={tab}
      onChange={setTab}
    />
    <div className='flex flex-wrap gap-[2rem] mt-8'>
      {list}
      <JobItem isNew />
    </div>
  </div>
}

export default JobsList

addTranslationNamespace(TranslationNamespace.jobsList, jobsListEn, jobsListUa)
