import * as yup from "yup";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { AddEmployeeParams, FindEmployeeResponse, useAddEmployeeMutation, useFindEmployeeQuery, util } from "services/EmployeeService";
import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { Button, DatePicker, Typography, Select, Input, Modal } from "ui-components";
import { GenderTypes, RoleTypes } from "common/types/common";
import { RoutePaths } from "containers/AppRouter";

import employeeAddingEn from './EmployeeAdding_en.json'
import employeeAddingUa from './EmployeeAdding_ua.json'
import { useNavigate } from "react-router-dom";
import { useDebounce } from "hooks/debounce";

const EmployeeAdding: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employeeAdding)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentRef = useRef(null)

  const [hrPartner, setHrPartner] = useState<FindEmployeeResponse>()

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

  return (
    <>
      <div className='grid gap-6 max-w-[50rem]'>
        <Typography appearance='title'>
          {t('title')}
        </Typography>
        <div>
          <Typography appearance='subtitle'>
            {t('personalInfo')}
          </Typography>
          <div className='grid gap-4 max-w-[50rem]'>
            <div className='grid grid-cols-2 gap-8'>
              <Input
                label={t('name')}
                className='w-full'
                error={errors.name}
                validation={register("name")}
              />
              <Input
                label={t('surname')}
                className='w-full'
                error={errors.surname}
                validation={register("surname")}
              />
            </div>
            <div className='grid grid-cols-2 gap-8'>
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
          <Typography appearance='subtitle'>
            {t('contactInfo')}
          </Typography>
          <div className='grid gap-4 max-w-[50rem]'>
            <div className='grid grid-cols-2 gap-8'>
              <Input
                label={t('email')}
                className='w-full'
                error={errors.email}
                validation={register("email")}
              />
              <Input
                label={t('mobile')}
                className='w-full'
                error={errors.mobile}
                validation={register("mobile")}
              />
            </div>
            <div className='grid grid-cols-2 gap-8'>
              <Input
                label={t('address')}
                className='w-full'
                error={errors.address}
                validation={register("address")}
              />
            </div>
          </div>
        </div>
        <div>
          <Typography appearance='subtitle'>
            {t('workInfo')}
          </Typography>
          <div className='grid gap-4 max-w-[50rem]'>
            <div className='grid grid-cols-2 gap-8'>
              <Input
                label={t('department')}
                className='w-full'
                error={errors.department}
                validation={register("department")}
              />
              <Input
                label={t('position')}
                className='w-full'
                error={errors.position}
                validation={register("position")}
              />
            </div>
            <div className='grid grid-cols-2 gap-8'>
              <Select
                options={roleOptions}
                placeholder={t('role')}
                label={t('role')}
                className='w-full'
                error={errors.role}
                validation={register("role")}
              />
              <Controller
                control={control}
                name="startDate"
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
      {/* <Modal
        isOpen={isSuccess}
        onClose={onSuccessClose}
        title={t('successTitle')}
        body={t('successDescription')}
      /> */}
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
