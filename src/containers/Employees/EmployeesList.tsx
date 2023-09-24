import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent } from "react";
import { Button } from "ui-components";
import Typography from "ui-components/Typography/Typography";

import employeesListEn from './EmployeesList_en.json'
import employeesListUa from './EmployeesList_ua.json'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmployeesList: FunctionComponent = () => {

  const { t } = useTranslation(TranslationNamespace.employeesList)

  const navigate = useNavigate()

  return <div>
    <div className='flex justify-between'>
      <Typography appearance='title'>
        {t('title')}
      </Typography>
      <Button onClick={() => navigate()}>
        {t('addEmployee')}
      </Button>
    </div>
    It is the Dashboard page
  </div>
}

export default EmployeesList

addTranslationNamespace(TranslationNamespace.employeesList, employeesListEn, employeesListUa)
