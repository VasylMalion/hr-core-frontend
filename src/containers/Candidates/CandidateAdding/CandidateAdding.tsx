import * as yup from "yup"
import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Controller, useForm } from "react-hook-form"

import { TranslationNamespace, addTranslationNamespace } from "common/translations"
import { Button, DatePicker, Modal, Select, Input, Typography } from "ui-components"
import { AddCandidateParams, useAddCandidateMutation, util } from "services/CandidateService"
import { RoutePaths } from "containers/AppRouter"
import { GenderTypes } from "common/types/common"

import candidateAddingEn from './CandidateAdding_en.json'
import candidateAddingUa from './CandidateAdding_ua.json'

const CandidateAdding: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.candidateAdding)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addCandidate, { isLoading, isSuccess, isError }] = useAddCandidateMutation()

  const createCandidate = (data: AddCandidateParams) => addCandidate(data)

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    position: yup.string().required(),
    salary: yup.string().required(),
    gender: yup.string().required(),
    birthDate: yup.date().required(),
    email: yup.string().email().required(),
    mobile: yup.string().required(),
    location: yup.string().required(),
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
    navigate(RoutePaths.CANDIDATES)
  }

  const onFailClose = () => dispatch(util.resetApiState())

  const genderOptions = [
    { title: t('gender.male'), value: GenderTypes.MALE },
    { title: t('gender.female'), value: GenderTypes.FEMALE },
  ]

  return (
    <>
      <Typography appearance='title' className=''>
        {t('title')}
      </Typography>
      <div className='grid gap-6 max-w-[50rem]'>
        <div>
          <Typography appearance='subtitle' className=''>
            {t('personalInfo')}
          </Typography>
          <div className='grid gap-4'>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:gap-8'>
              <Input
                label={t('name')}
                placeholder={t('name')}
                validation={register('name')}
                error={errors.name}
                className='w-full'
              />
              <Input
                label={t('surname')}
                placeholder={t('surname')}
                validation={register('surname')}
                error={errors.surname}
                className='w-full'
              />
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:gap-8'>
              <Select
                options={genderOptions}
                placeholder={t('genderTitle')}
                label={t('genderTitle')}
                className='w-full'
                error={errors.gender}
                validation={register("gender")}
              />
              <Controller
                control={control}
                name='birthDate'
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    placeholder={t('birthDate')}
                    onChange={onChange}
                    value={value}
                    label={t('birthDate')}
                    className='w-full'
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <Typography appearance='subtitle' className='mt-4'>
            {t('contactInfo')}
          </Typography>
          <div className='grid gap-4'>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:gap-8'>
              <Input
                label={t('email')}
                placeholder={t('email')}
                validation={register('email')}
                error={errors.email}
                className='w-full'
              />
              <Input
                type='number'
                label={t('mobile')}
                placeholder={t('mobile')}
                validation={register('mobile')}
                error={errors.mobile}
                className='w-full'
              />
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:gap-8'>
              <Input
                label={t('location')}
                placeholder={t('location')}
                validation={register('location')}
                error={errors.location}
                className='w-full'
              />
            </div>
          </div>
        </div>
        <div>
          <Typography appearance='subtitle' className='mt-4'>
            {t('workInfo')}
          </Typography>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:gap-8'>
            <Input
              label={t('position')}
              placeholder={t('position')}
              validation={register('position')}
              error={errors.position}
              className='w-full'
            />
            <Input
              type='number'
              label={t('salary')}
              placeholder={t('salary')}
              validation={register('salary')}
              error={errors.salary}
              className='w-full'
            />
          </div>
        </div>
        <Button
          textAlign='center'
          className='flex justify-self-start mt-4'
          onClick={handleSubmit(createCandidate)}
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

export default CandidateAdding

addTranslationNamespace(TranslationNamespace.candidateAdding, candidateAddingEn, candidateAddingUa)
