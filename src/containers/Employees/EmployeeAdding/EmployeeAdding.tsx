import * as yup from 'yup'
import { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, DatePicker, Typography, Select, Input, Modal } from 'ui-components'
import { GenderTypes, RoleTypes } from 'common/types/common'
import { RoutePaths } from 'containers/AppRouter'
import {
  AddEmployeeParams,
  useAddEmployeeMutation,
  util
} from 'services/EmployeeService'

import employeeAddingEn from './EmployeeAdding_en.json'
import employeeAddingUa from './EmployeeAdding_ua.json'

const EmployeeAdding: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employeeAdding)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addEmployee, { isLoading, isSuccess, isError }] = useAddEmployeeMutation({})

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    gender: yup.string().required(),
    birthDate: yup.date().required(),
    email: yup.string().email().required(),
    mobile: yup.string().required(),
    address: yup.string().required(),
    department: yup.string().required(),
    position: yup.string().required(),
    role: yup.string().required(),
    startDate: yup.date().required(),
  });

  const { register, reset, control, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleClick = (data: AddEmployeeParams) => addEmployee(data)

  const genderOptions = [
    { title: t('gender.male'), value: GenderTypes.MALE },
    { title: t('gender.female'), value: GenderTypes.FEMALE },
  ]

  const roleOptions = [
    { title: t('roles.admin'), value: RoleTypes.ADMIN },
    { title: t('roles.user'), value: RoleTypes.USER },
  ]

  const onSuccessClose = () => {
    dispatch(util.resetApiState())
    reset()
    navigate(RoutePaths.EMPLOYEES)
  }

  const onFailClose = () => dispatch(util.resetApiState())

  const rowStyles = 'grid grid-cols-row gap-4 md:gap-8'

  return (
    <>
      <Typography appearance='title'>
        {t('title')}
      </Typography>
      <div className='grid gap-6 max-w-large'>
        <div>
          <Typography appearance='subtitle'>
            {t('personalInfo')}
          </Typography>
          <div className='grid gap-4'>
            <div className={rowStyles}>
              <Input
                label={t('name')}
                placeholder={t('name')}
                className='w-full'
                error={errors.name}
                validation={register('name')}
              />
              <Input
                label={t('surname')}
                placeholder={t('surname')}
                className='w-full'
                error={errors.surname}
                validation={register('surname')}
              />
            </div>
            <div className={rowStyles}>
              <Select
                options={genderOptions}
                placeholder={t('genderTitle')}
                label={t('genderTitle')}
                className='w-full'
                error={errors.gender}
                validation={register('gender')}
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
            <div className={rowStyles}>
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
            <div className={rowStyles}>
              <Input
                label={t('address')}
                placeholder={t('address')}
                validation={register('address')}
                error={errors.address}
                className='w-full'
              />
            </div>
          </div>
        </div>
        <div>
          <Typography appearance='subtitle' className='mt-4'>
            {t('workInfo')}
          </Typography>
          <div className='grid gap-4'>
            <div className={rowStyles}>
              <Input
                label={t('department')}
                placeholder={t('department')}
                className='w-full'
                error={errors.department}
                validation={register('department')}
              />
              <Input
                label={t('position')}
                placeholder={t('position')}
                className='w-full'
                error={errors.position}
                validation={register('position')}
              />
            </div>
            <div className={rowStyles}>
              <Select
                options={roleOptions}
                placeholder={t('role')}
                label={t('role')}
                className='w-full'
                error={errors.role}
                validation={register('role')}
              />
              <Controller
                control={control}
                name='startDate'
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    placeholder={t('startDate')}
                    onChange={onChange}
                    value={value}
                    label={t('startDate')}
                    className='w-full'
                  />
                )}
              />
            </div>
          </div>
        </div>
        <Button
          disabled={!isValid}
          textAlign='center'
          className='flex justify-self-start mt-8'
          onClick={handleSubmit(handleClick)}
          isLoading={isLoading}
        >
          {t('add')}
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

export default EmployeeAdding

addTranslationNamespace(TranslationNamespace.employeeAdding, employeeAddingEn, employeeAddingUa)
