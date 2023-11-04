import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, DatePicker, Modal, Input, Typography, TextArea } from 'ui-components'
import { useAddVacancyMutation, util } from 'services/VacancyService'
import FindInput from 'ui-components/FindInput/FindInput'
import { RoutePaths } from 'containers/AppRouter'
import { InputState } from 'common/types/common'
import { checkValidation } from 'common/validation/validation'

import vacancyAddingEn from './VacancyAdding_en.json'
import vacancyAddingUa from './VacancyAdding_ua.json'

const VacancyAdding: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.vacancyAdding)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [department, setDepartment] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [position, setPosition] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [location, setLocation] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [description, setDescription] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [assignedTo, setAssignedTo] = useState<any>({ value: null, validation: { isValid: true } })
  const [deadlineDate, setDeadlineDate] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [salaryMin, setSalaryMin] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [salaryMax, setSalaryMax] = useState<InputState>({ value: '', validation: { isValid: true } })

  const [addVacancy, { isLoading, isSuccess, isError }] = useAddVacancyMutation()

  const handleSubmit = () => addVacancy({
    department: department.value,
    position: position.value,
    location: location.value,
    description: description.value,
    assignedTo: assignedTo.value,
    deadlineDate: new Date(deadlineDate.value),
    salaryMin: salaryMin.value,
    salaryMax: salaryMax.value,
  })

  const onSuccessClose = () => {
    dispatch(util.resetApiState())
    navigate(RoutePaths.VACANCIES)
  }

  const onFailClose = () => dispatch(util.resetApiState())

  const rowStyles = 'grid grid-cols-row gap-4 md:gap-8'

  const isValid =
    (department.value && department.validation.isValid) &&
    (position.value && position.validation.isValid) &&
    (location.value && location.validation.isValid) &&
    (description.value && description.validation.isValid) &&
    (assignedTo.value && assignedTo.validation.isValid) &&
    (deadlineDate.value && deadlineDate.validation.isValid) &&
    (salaryMin.value && salaryMin.validation.isValid) &&
    (salaryMax.value && salaryMax.validation.isValid)

  const handleDepartment = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setDepartment({ value, validation })
  }

  const handlePosition = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setPosition({ value, validation })
  }

  const handleLocation = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setLocation({ value, validation })
  }

  const handleDescription = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      minLength: 20,
    })

    setDescription({ value, validation })
  }

  const handleAssignedTo = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setAssignedTo({ value, validation })
  }

  const handleDeadlineDate = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      date: true,
    })

    setDeadlineDate({ value, validation })
  }

  const handlesalaryMin = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      salary: true,
    })

    setSalaryMin({ value, validation })
  }

  const handleSalaryMax = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      salary: true,
    })

    setSalaryMax({ value, validation })
  }

  return (
    <>
      <Typography appearance='title'>
        {t('title')}
      </Typography>
      <div className='grid gap-6 max-w-large'>
        <div className={rowStyles}>
          <Input
            label={t('department')}
            placeholder={t('department')}
            className='w-full'
            value={department.value}
            onChange={handleDepartment}
            validation={department.validation}
          />
          <Input
            label={t('position')}
            placeholder={t('position')}
            className='w-full'
            value={position.value}
            onChange={handlePosition}
            validation={position.validation}
          />
        </div>
        <div className={rowStyles}>
          <Input
            label={t('location')}
            placeholder={t('location')}
            className='w-full'
            value={location.value}
            onChange={handleLocation}
            validation={location.validation}
          />
        </div>
        <div className={rowStyles}>
          <DatePicker
            label={t('deadlineDate')}
            placeholder={t('deadlineDate')}
            className='w-full'
            value={deadlineDate.value}
            validation={deadlineDate.validation}
            setValue={handleDeadlineDate}
          />
          <FindInput
            label={t('assignedTo')}
            placeholder={t('assignedTo')}
            onSuccessFind={(item) => handleAssignedTo({ ...assignedTo, value: item })}
          />
        </div>
        <div className={rowStyles}>
          <Input
            type='number'
            label={t('salaryMin')}
            placeholder={t('salaryMin')}
            className='w-full'
            value={salaryMin.value}
            onChange={handlesalaryMin}
            validation={salaryMin.validation}
          />
          <Input
            type='number'
            label={t('salaryMax')}
            placeholder={t('salaryMax')}
            className='w-full'
            value={salaryMax.value}
            onChange={handleSalaryMax}
            validation={salaryMax.validation}
          />
        </div>
        <div className={rowStyles}>
          <TextArea
            label={t('description')}
            placeholder={t('description')}
            className='w-full'
            value={description.value}
            onChange={handleDescription}
            validation={description.validation}
          />
        </div>
        <Button
          textAlign='center'
          className='flex justify-self-start mt-4'
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={!isValid}
        >
          {t('create')}
        </Button>
      </div>
      <Modal
        isOpen={isSuccess}
        onClose={onSuccessClose}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={isError}
        onClose={onFailClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
    </>
  )
}

export default VacancyAdding

addTranslationNamespace(TranslationNamespace.vacancyAdding, vacancyAddingEn, vacancyAddingUa)
