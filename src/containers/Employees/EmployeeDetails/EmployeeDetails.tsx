import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { useGetOneQuery } from "services/EmployeeService";
import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { Typography } from "ui-components";

import employeeDetailsEn from './EmployeeDetails_en.json'
import employeeDetailsUa from './EmployeeDetails_ua.json'
import { useParams } from "react-router-dom";
import { formatDate } from "common/utils/common";

const EmployeeDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employeeDetails)
  const { id } = useParams<{ id: string }>()

  const employee = useGetOneQuery({ id })

  return (
    employee.isLoading ? <div> Loading... </div> : <>
      <div className='grid gap-6 max-w-[50rem]'>
        <Typography appearance='title'>
          {t('title')}
        </Typography>
        <div className='max-w-[30rem]'>
          <div>
            <Typography appearance='subtitle'>
              {t('personalInfo')}
            </Typography>
            <div className='grid gap-2 bg-white p-[1rem] rounded'>
              <div>
                <span className='font-[ceraProLight]'>{t('name')}:</span>
                <span>{' ' + employee.data.name}</span>
              </div>
              <div>
                <span className='font-[ceraProLight]'>{t('surname')}:</span>
                <span>{' ' + employee.data.surname}</span>
              </div>
              <div>
                <span className='font-[ceraProLight]'>{t('genderTitle')}:</span>
                <span>{' ' + employee.data.gender}</span>
              </div>
              <div>
                <span className='font-[ceraProLight]'>{t('birthDate')}:</span>
                <span>{' ' + formatDate(employee.data.birthDate)}</span>
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <Typography appearance='subtitle'>
              {t('contactInfo')}
            </Typography>
            <div className='grid gap-2 bg-white p-[1rem] rounded'>
              <div>
                <span className='font-[ceraProLight]'>{t('email')}:</span>
                <span>{' ' + employee.data.email}</span>
              </div>
              <div>
                <span className='font-[ceraProLight]'>{t('mobile')}:</span>
                <span>{' ' + employee.data.mobileNumber}</span>
              </div>
              <div>
                <span className='font-[ceraProLight]'>{t('address')}:</span>
                <span>{' ' + employee.data.address}</span>
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <Typography appearance='subtitle'>
              {t('workInfo')}
            </Typography>
            <div className='grid gap-2 bg-white p-[1rem] rounded'>
              <div>
                <span className='font-[ceraProLight]'>{t('department')}:</span>
                <span>{' ' + employee.data.department}</span>
              </div>
              <div>
                <span className='font-[ceraProLight]'>{t('position')}:</span>
                <span>{' ' + employee.data.position}</span>
              </div>
              <div>
                <span className='font-[ceraProLight]'>{t('startDate')}:</span>
                <span>{' ' + formatDate(employee.data.startDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeDetails

addTranslationNamespace(TranslationNamespace.employeeDetails, employeeDetailsEn, employeeDetailsUa)
