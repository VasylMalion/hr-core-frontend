import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { TranslationNamespace } from 'common/translations'
import { InputState } from 'common/types/common'
import { Button, Input, Modal } from 'ui-components'
import { checkValidation } from 'common/validation/validation'
import { useUpdatePasswordMutation, util } from 'services/PasswordService'
import { errorHandler } from 'common/utils/common'

const inputState = { value: '', validation: { isValid: true } }

const UpdatePassword: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.profile)
  const { t:tCommon } = useTranslation(TranslationNamespace.profile)
  const dispatch = useDispatch()

  const [passwordOld, setPasswordOld] = useState<InputState>(inputState)
  const [passwordNew, setPasswordNew] = useState<InputState>(inputState)
  const [passwordNewAgain, setPasswordNewAgain] = useState<InputState>(inputState)

  const [updatePassword, { isLoading, isSuccess, isError, error }] = useUpdatePasswordMutation()

  const shoulShowError =
    (passwordNew.value && passwordNew.validation.isValid) &&
    (passwordNewAgain.value && passwordNewAgain.validation.isValid) &&
    passwordNew.value !== passwordNewAgain.value

  const isValid =
    (passwordOld.value && passwordOld.validation.isValid) &&
    (passwordNew.value && passwordNew.validation.isValid) &&
    (passwordNewAgain.value && passwordNewAgain.validation.isValid) &&
    passwordNew.value === passwordNewAgain.value

  const handleSubmit = () => updatePassword({
    passwordOld: passwordOld.value,
    passwordNew: passwordNew.value,
  })

  const handlePasswordOld = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      minLength: 8,
    })

    setPasswordOld({ value, validation })
  }

  const handlePasswordNew = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      password: true,
    })

    setPasswordNew({ value, validation })
  }

  const handlePasswordNewAgain = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      password: true,
    })

    setPasswordNewAgain({ value, validation })
  }

  const onClose = () => {
    dispatch(util.resetApiState())
    setPasswordOld(inputState)
    setPasswordNew(inputState)
    setPasswordNewAgain(inputState)
  }

  return (
    <>
      <div className='grid gap-8 max-w-[25rem]'>
        <div>
          <Input
            type='password'
            placeholder={t('passwordOld')}
            label={t('passwordOld')}
            className='w-full'
            value={passwordOld.value}
            onChange={handlePasswordOld}
            validation={passwordOld.validation}
          />
        </div>
        <div className='grid gap-4'>
          <div>
            <Input
              type='password'
              placeholder={t('passwordNew')}
              label={t('passwordNew')}
              className='w-full'
              value={passwordNew.value}
              onChange={handlePasswordNew}
              validation={passwordNew.validation}
            />
          </div>
          <div>
            <Input
              type='password'
              placeholder={t('passwordNewAgain')}
              label={t('passwordNewAgain')}
              className='w-full'
              value={passwordNewAgain.value}
              onChange={handlePasswordNewAgain}
              validation={passwordNewAgain.validation}
            />
          </div>
        </div>
      </div>
      {shoulShowError && (
        <div className='text-red mt-4'>
          {t('differentPasswords')}
        </div>
      )}
      <Button
        textAlign='center'
        disabled={!isValid}
        isLoading={isLoading}
        onClick={handleSubmit}
        className='mt-8'
      >
        {t('update')}
      </Button>
      <Modal
        isOpen={isSuccess}
        onClose={onClose}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={isError}
        onClose={onClose}
        title={t('failTitle')}
        body={tCommon(`errors.${errorHandler(error)}`)}
      />
    </>
  )
}

export default UpdatePassword
