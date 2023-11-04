import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, DatePicker, Typography, Select, Input, Modal } from 'ui-components'
import { GenderTypes, InputState, RoleTypes } from 'common/types/common'
import { RoutePaths } from 'containers/AppRouter'
import { useAddEmployeeMutation, util } from 'services/EmployeeService'
import { checkValidation } from 'common/validation/validation'

import employeeAddingEn from './EmployeeAdding_en.json'
import employeeAddingUa from './EmployeeAdding_ua.json'

const EmployeeAdding: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employeeAdding)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [surname, setSurname] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [gender, setGender] = useState<InputState>({ value: GenderTypes.MALE, validation: { isValid: true } })
  const [birthDate, setBirthDate] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [email, setEmail] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [mobileNumber, setMobileNumber] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [address, setAddress] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [department, setDepartment] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [position, setPosition] = useState<InputState>({ value: '', validation: { isValid: true } })
  const [role, setRole] = useState<InputState>({ value: RoleTypes.USER, validation: { isValid: true } })
  const [startDate, setStartDate] = useState<InputState>({ value: '', validation: { isValid: true } })

  const [addEmployee, { isLoading, isSuccess, isError }] = useAddEmployeeMutation({})

  const handleSubmit = () => addEmployee({
    name: name.value,
    surname: surname.value,
    gender: gender.value,
    birthDate: new Date(birthDate.value),
    email: email.value,
    mobileNumber: mobileNumber.value,
    address: address.value,
    department: department.value,
    position: position.value,
    role: role.value,
    startDate: new Date(startDate.value),
  })

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
    navigate(RoutePaths.EMPLOYEES)
  }

  const onFailClose = () => dispatch(util.resetApiState())

  const rowStyles = 'grid grid-cols-row gap-4 md:gap-8'

  const isValid =
    (name.value && name.validation.isValid) &&
    (surname.value && surname.validation.isValid) &&
    (birthDate.value && birthDate.validation.isValid) &&
    (gender.value && gender.validation.isValid) &&
    (email.value && email.validation.isValid) &&
    (mobileNumber.value && mobileNumber.validation.isValid) &&
    (address.value && address.validation.isValid) &&
    (department.value && department.validation.isValid) &&
    (position.value && position.validation.isValid) &&
    (role.value && role.validation.isValid) &&
    (startDate.value && startDate.validation.isValid)

  const handleName = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 40,
    })

    setName({ value, validation })
  }

  const handleSurname = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 40,
    })

    setSurname({ value, validation })
  }

  const handleGender = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setGender({ value, validation })
  }

  const handleBirthDate = (value: string) => {
    console.log(value)

    const validation = checkValidation(value, {
      required: true,
      date: true,
      birthDate: true,
    })

    setBirthDate({ value, validation })
  }

  const handleEmail = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      email: true,
    })

    setEmail({ value, validation })
  }

  const handleAddress = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 50,
    })

    setAddress({ value, validation })
  }

  const handleMobileNumber = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      mobileNumber: true,
    })

    setMobileNumber({ value, validation })
  }

  const handleDepartment = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 40,
    })

    setDepartment({ value, validation })
  }

  const handlePosition = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 40,
    })

    setPosition({ value, validation })
  }

  const handleRole = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setRole({ value, validation })
  }

  const handleStartDate = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      date: true,
    })

    setStartDate({ value, validation })
  }

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
                value={name.value}
                onChange={handleName}
                validation={name.validation}
              />
              <Input
                label={t('surname')}
                placeholder={t('surname')}
                className='w-full'
                value={surname.value}
                onChange={handleSurname}
                validation={surname.validation}
              />
            </div>
            <div className={rowStyles}>
              <Select
                options={genderOptions}
                placeholder={t('genderTitle')}
                label={t('genderTitle')}
                className='w-full'
                value={gender.value}
                onChange={handleGender}
                validation={gender.validation}
              />
              <DatePicker
                label={t('birthDate')}
                placeholder={t('birthDate')}
                className='w-full'
                value={birthDate.value}
                validation={birthDate.validation}
                setValue={handleBirthDate}
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
                className='w-full'
                value={email.value}
                onChange={handleEmail}
                validation={email.validation}
              />
              <Input
                type='number'
                label={t('mobile')}
                placeholder={t('mobile')}
                className='w-full'
                value={mobileNumber.value}
                onChange={handleMobileNumber}
                validation={mobileNumber.validation}
              />
            </div>
            <div className={rowStyles}>
              <Input
                label={t('address')}
                placeholder={t('address')}
                className='w-full'
                value={address.value}
                onChange={handleAddress}
                validation={address.validation}
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
              <Select
                label={t('role')}
                placeholder={t('role')}
                className='w-full'
                options={roleOptions}
                value={role.value}
                onChange={handleRole}
                validation={role.validation}
              />
              <DatePicker
                label={t('startDate')}
                placeholder={t('startDate')}
                className='w-full'
                value={startDate.value}
                validation={startDate.validation}
                setValue={handleStartDate}
              />
            </div>
          </div>
        </div>
        <Button
          disabled={!isValid}
          textAlign='center'
          className='flex justify-self-start mt-6'
          onClick={handleSubmit}
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
