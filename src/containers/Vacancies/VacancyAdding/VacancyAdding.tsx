import * as yup from "yup";
import { FunctionComponent, useState } from "react"
import { TranslationNamespace, addTranslationNamespace } from "common/translations"
import { useTranslation } from "react-i18next"
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "ui-components/Input/Input"
import Typography from "ui-components/Typography/Typography"
import { Button, DatePicker, Modal } from "ui-components"
import { AddVacancyParams, useAddVacancyMutation, util } from "services/VacancyService"
import FindInput from "ui-components/FindInput/FindInput"

import vacancyAddingEn from './VacancyAdding_en.json'
import vacancyAddingUa from './VacancyAdding_ua.json'
import { Controller, useForm } from "react-hook-form";
import { RoutePaths } from "containers/AppRouter";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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

  return (
    <>
      <Typography appearance='title' className=''>
        {t('title')}
      </Typography>
      <div className='grid gap-6 max-w-[50rem]'>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8'>
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
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8'>
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
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8'>
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
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8'>
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
