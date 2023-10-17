import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent, useState } from "react";

import jobsListEn from './JobsList_en.json'
import jobsListUa from './JobsList_ua.json'
import { Job, JobStatus } from "common/types/common";
import JobItem from "./JobItem";
import TabNavigation from "ui-components/TabOptions/TabNavigation";
import { useTranslation } from "react-i18next";
import { useGetAllJobsQuery } from "services/JobService";

enum TabNavigationTypes {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

const JobsList: FunctionComponent = () => {

  const { t } = useTranslation(TranslationNamespace.jobsList)

  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.ALL)

  const jobs = useGetAllJobsQuery({ status: tab !== TabNavigationTypes.ALL ? tab as unknown as JobStatus : null })

  const list = jobs.data && jobs.data.map((item: Job) => <JobItem job={item} />)

  // if (tab === TabNavigationTypes.ALL) {
  //   let list = jobs.data && jobs.data.map((item: Job) => <JobItem job={item} />)
  // }
  // if (tab === TabNavigationTypes.ACTIVE) {
  //   let list = jobs.data && jobs.data.map((item: Job) => <JobItem job={item} />)
  // }
  // if (tab === TabNavigationTypes.INACTIVE) {
  //   let list = jobs.data && jobs.data.map((item: Job) => <JobItem job={item} />)
  // }

  const options = [
    {
      title: t('tabs.ALL'),
      type: TabNavigationTypes.ALL
    },
    {
      title: t('tabs.ACTIVE'),
      type: TabNavigationTypes.ACTIVE
    },
    {
      title: t('tabs.INACTIVE'),
      type: TabNavigationTypes.INACTIVE
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
