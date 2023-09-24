import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent, useState } from "react";
import Typography from "ui-components/Typography/Typography";

import employeeAddingEn from './EmployeeAdding_en.json'
import employeeAddingUa from './EmployeeAdding_ua.json'
import { useGetAllJobsQuery } from "services/JobService";
import TabNavigation from "ui-components/TabOptions/TabNavigation";
import { useTranslation } from "react-i18next";

enum TabNavigationTypes {
  CANDIDATES = 'CANDIDATES',
  JOB_DETAILS = 'JOB_DETAILS',
  TIMELINE = 'TIMELINE',
  HIRING_TEAM = 'HIRING_TEAM',
}

const EmployeeAdding: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employeeAdding)

  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.CANDIDATES)

  return <div>
    <Typography appearance='title'>
      Candidates
    </Typography>
    <Typography appearance='subtitle'>
      Candidates
    </Typography>
  </div>
}

export default EmployeeAdding

addTranslationNamespace(TranslationNamespace.employeeAdding, employeeAddingEn, employeeAddingUa)
