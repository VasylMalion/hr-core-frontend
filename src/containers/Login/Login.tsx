import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_KEY } from 'common/constants'
import { Button, Typography, Input } from 'ui-components'
import { useLoginMutation, util } from 'services/AuthService'
import { RoutePaths } from 'containers/AppRouter'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { errorHandler } from 'common/utils/common'
import { InputState } from 'common/types/common'
import { checkValidation } from 'common/validation/validation'

import loginEn from './Login_en.json'
import loginUa from './Login_ua.json'

const inputState = { value: '', validation: { isValid: true } }

const Login: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.login)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState<InputState>(inputState)
  const [password, setPassword] = useState<InputState>(inputState)
  const [shouldHideError, setShouldHideError] = useState<boolean>(false)

  const isValid =
    (email.value && email.validation.isValid) &&
    (password.value && password.validation.isValid)

  const [
    login,
    { isLoading, isSuccess, isError, error, data },
  ] = useLoginMutation()

  const authInfo = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!isSuccess && authInfo.userToken && authInfo.userInfo) {
      navigate(RoutePaths.DASHBOARD)
    }
  }, [])

  const handleSubmit = () => login({ email: email.value, password: password.value })

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token)
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data.userInfo))

      navigate(RoutePaths.DASHBOARD)
    }
  }, [isSuccess])
  
  useEffect(() => {
    if (isError && shouldHideError) {
      dispatch(util.resetApiState())
      setShouldHideError(false)
    }
  }, [isError, shouldHideError, email, password])

  useEffect(() => {
    if (isError) {
      setEmail(inputState)
      setPassword(inputState)
    }
  }, [isError])

  const handleEmail = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      email: true,
    })

    setEmail({ value, validation })
    if (isError) setShouldHideError(true)
  }

  const handlePassword = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      minLength: 8,
    })

    setPassword({ value, validation })
    if (isError) setShouldHideError(true)
  }

  return (
    <div className='bg-purpleLight dark:bg-dark-300 h-screen w-screen flex items-center justify-center'>
      <div 
        className='
          flex flex-col gap-8 justify-center bg-white py-8 px-8
          rounded-lg md:px-24 md:py-12 m-8 max-w-[40rem] dark:bg-dark-200
        '
      >
        <Typography appearance='title' className='mb-[-0.5rem]'>
          {t('title')}
        </Typography>
        <div className='grid gap-4 min-w-[20rem]'>
          <Input
            label={t('email')}
            placeholder={t('email')}
            className='w-full'
            value={email.value}
            onChange={handleEmail}
            validation={email.validation}
          />
          <Input
            type='password'
            placeholder={t('password')}
            label={t('password')}
            className='w-full'
            value={password.value}
            onChange={handlePassword}
            validation={password.validation}
          />
          {isError && !isLoading && (
            <div className='text-red'>
              {t(errorHandler(error))}
            </div>
          )}
        </div>
        <Button
          disabled={!isValid}
          isLoading={isLoading}
          textAlign='center'
          className='w-full'
          onClick={handleSubmit}
        >
          {t('login')}
        </Button>
      </div>
    </div>
  )
}

export default Login

addTranslationNamespace(TranslationNamespace.login, loginEn, loginUa)
