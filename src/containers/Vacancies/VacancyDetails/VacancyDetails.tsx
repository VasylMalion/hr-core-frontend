import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";

import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import Typography from "ui-components/Typography/Typography";
import TabNavigation from "ui-components/TabOptions/TabNavigation";

import Candidates from "./components/Candidates/Candidates";
import vacancyDetailsEn from './VacancyDetails_en.json'
import vacancyDetailsUa from './VacancyDetails_ua.json'

enum TabNavigationTypes {
  CANDIDATES = 'CANDIDATES',
  JOB_DETAILS = 'JOB_DETAILS',
  TIMELINE = 'TIMELINE',
}

const VacancyDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)

  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.CANDIDATES)

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
]

  return <div draggable={true}>
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
    <Candidates />
    </div>
  </div>
}

export default VacancyDetails

addTranslationNamespace(TranslationNamespace.vacancyDetails, vacancyDetailsEn, vacancyDetailsUa)
