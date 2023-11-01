import * as yup from 'yup'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, DatePicker, Modal, Input, Typography } from 'ui-components'
import { AddVacancyParams, useAddVacancyMutation, util } from 'services/VacancyService'
import FindInput from 'ui-components/FindInput/FindInput'
import { Controller, useForm } from 'react-hook-form'
import { RoutePaths } from 'containers/AppRouter'

import vacancyAddingEn from './VacancyAdding_en.json'
import vacancyAddingUa from './VacancyAdding_ua.json'

const VacancyAdding: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.vacancyAdding)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addVacancy, { isLoading, isSuccess, isError }] = useAddVacancyMutation()

  const createVacancy = (data: AddVacancyParams) => addVacancy(data)

  const schema = yup.object().shape({
    department: yup.string().required(),
    position: yup.string().required(),
    location: yup.string().required(),
    description: yup.string().required(),
    assignedTo: yup.object().required(),
    salaryMin: yup.string(),
    salaryMax: yup.string(),
    deadlineDate: yup.date(),
  });

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSuccessClose = () => {
    dispatch(util.resetApiState())
    reset()
    navigate(RoutePaths.VACANCIES)
  }

  const onFailClose = () => dispatch(util.resetApiState())

  const rowStyles = 'grid grid-cols-row gap-4 md:gap-8'

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
            validation={register('department')}
            error={errors.department}
            className='w-full'
          />
          <Input
            label={t('position')}
            placeholder={t('position')}
            validation={register('position')}
            error={errors.position}
            className='w-full'
          />
        </div>
        <div className={rowStyles}>
          <Input
            label={t('location')}
            placeholder={t('location')}
            validation={register('location')}
            error={errors.location}
            className='w-full'
          />
          <Input
            label={t('description')}
            placeholder={t('description')}
            validation={register('description')}
            error={errors.description}
            className='w-full'
          />
        </div>
        <div className={rowStyles}>
          <Controller
            control={control}
            name='deadlineDate'
            render={({ field: { onChange, value } }) => (
              <DatePicker
                placeholder={t('deadlineDate')}
                onChange={onChange}
                value={value}
                label={t('deadlineDate')}
                className='w-full'
              />
            )}
          />
          <Controller
            control={control}
            name='assignedTo'
            render={({ field: { onChange, value } }) => (
              <FindInput
                error={errors.assignedTo}
                label={t('assignedTo')}
                placeholder={t('assignedTo')}
                onSuccessFind={(item) => onChange(item)}
              />
            )}
          />
        </div>
        <div className={rowStyles}>
          <Input
            type='number'
            label={t('salaryMin')}
            validation={register('salaryMin')}
            error={errors.salaryMin}
            placeholder={t('salaryMin')}
            className='w-full'
          />
          <Input
            type='number'
            label={t('salaryMax')}
            placeholder={t('salaryMax')}
            validation={register('salaryMax')}
            error={errors.salaryMax}
            className='w-full'
          />
        </div>
        <Button
          textAlign='center'
          className='flex justify-self-start mt-4'
          onClick={handleSubmit(createVacancy)}
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
