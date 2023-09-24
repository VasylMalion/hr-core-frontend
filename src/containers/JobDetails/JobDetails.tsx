import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent, useState } from "react";
import Typography from "ui-components/Typography/Typography";

import jobDetailsEn from './JobDetails_en.json'
import jobDetailsUa from './JobDetails_ua.json'
import { useGetAllJobsQuery } from "services/JobService";
import TabNavigation from "ui-components/TabOptions/TabNavigation";
import { useTranslation } from "react-i18next";

enum TabNavigationTypes {
  CANDIDATES = 'CANDIDATES',
  JOB_DETAILS = 'JOB_DETAILS',
  TIMELINE = 'TIMELINE',
  HIRING_TEAM = 'HIRING_TEAM',
}

const JobDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.jobDetails)

  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.CANDIDATES)

  console.log(tab)

  const ss = useGetAllJobsQuery({})

  const options = [
    {
    title: t('tabs.candidates'),
    type: TabNavigationTypes.CANDIDATES
  },
  {
    title: t('tabs.jobDetails'),
    type: TabNavigationTypes.JOB_DETAILS
  },
  {
    title: t('tabs.timeline'),
    type: TabNavigationTypes.TIMELINE
  },
  {
    title: t('tabs.hiringTeam'),
    type: TabNavigationTypes.HIRING_TEAM
  },
]

  return <div>
    <Typography appearance='title'>
      Candidates
    </Typography>
    <Typography appearance='subtitle'>
      Candidates
    </Typography>
    <div>
    <TabNavigation
      options={options}
      value={tab}
      onChange={setTab}
    />
    </div>
  </div>
}

export default JobDetails

addTranslationNamespace(TranslationNamespace.jobDetails, jobDetailsEn, jobDetailsUa)
