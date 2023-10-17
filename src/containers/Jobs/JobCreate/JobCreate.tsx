import { FunctionComponent, useState } from "react"
import { TranslationNamespace, addTranslationNamespace } from "common/translations"

import Input from "ui-components/Input/Input"
import { useTranslation } from "react-i18next"
import Typography from "ui-components/Typography/Typography"
import { Button } from "ui-components"
import { useAddJobMutation } from "services/JobService"
import { FindEmployeeResponse } from "services/EmployeeService"
import FindInput from "ui-components/FindInput/FindInput"

import jobCreateEn from './JobCreate_en.json'
import jobCreateUa from './JobCreate_ua.json'

const JobCreation: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.jobCreation)

  const [department, setDepartment] = useState<string>('')
  const [position, setPosition] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [assignedTo, setAssignedTo] = useState<FindEmployeeResponse>()

  const [addJob, { isLoading }] = useAddJobMutation()

  const handleClick = () => addJob({
    department, position, location, description, assignedTo
  })

  return (
    <>
      <Typography appearance='title' className=''>
        {t('title')}
      </Typography>
      <div className='grid gap-6 max-w-[50rem]'>
        <div className='grid grid-cols-2 gap-8'>
          <Input label={t('department')} value={department} onChange={setDepartment} className='w-full' />
          <Input label={t('position')} value={position} onChange={setPosition} className='w-full' />
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <Input label={t('location')} value={location} onChange={setLocation} className='w-full' />
          <Input label={t('description')} value={description} onChange={setDescription} className='w-full' />
        </div>
        <FindInput label={t('name')} onSuccessFind={(item) => setAssignedTo(item)} />
        <Button textAlign='center' className='flex justify-self-start' onClick={handleClick} isLoading={isLoading}>
          {t('send')}
        </Button>
      </div>
    </>
  )
}

export default JobCreation

addTranslationNamespace(TranslationNamespace.jobCreation, jobCreateEn, jobCreateUa)
