import { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import yup from 'common/utils/validations'
import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import Input from "ui-components/Input/Input";
import Typography from "ui-components/Typography/Typography";
import { Button } from "ui-components";
import { LoginParams, useLoginMutation } from "services/AuthService";
import { RoutePaths } from "containers/AppRouter";
import { setCredentials } from "store/slices/authSlice";
import { useAppDispatch } from "hooks/redux";
import { errorHandler } from "common/utils/common";

import loginEn from './Login_en.json'
import loginUa from './Login_ua.json'

const Login: FunctionComponent = () => {

  const { t } = useTranslation(TranslationNamespace.login)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [
    login,
    { isLoading, isSuccess, isError, error, data },
  ] = useLoginMutation()

  const schema = yup.object({
    email: yup.string().email('validation.email').required().typeError("Invalid number"),
    password: yup.string().min(8).required(),
  });

  const { register, reset, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleClick = (data: LoginParams) => login(data)

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo))

      navigate(RoutePaths.DASHBOARD)

      dispatch(setCredentials({
        token: data.token,
        user: data.userInfo,
      }))

      reset({
        email: '',
        password: '',
      })
    }
  }, [isSuccess])

  return (
    <div className="bg-purpleLight h-screen w-screen flex items-center justify-center">
      <div className='grid gap-8 justify-center bg-white py-[2rem] px-[2rem] rounded-lg 
      md:px-[8rem] md:py-[3rem] m-8 max-w-[40rem]'
      >
        <Typography appearance='title'>
          {t('title')}
        </Typography>
        <div className='grid gap-4'>
          <Input
            label={t('email')}
            className='w-full'
            error={errors.email}
            validation={register('email')}
          />
          <Input
            type='password'
            label={t('password')}
            className='w-full'
            error={errors.password}
            validation={register('password')}
          />
          {isError && !isLoading && (
            <div className="text-red">
              {t(errorHandler(error))}
            </div>
          )}
        </div>
        <Button
          disabled={!isValid}
          isLoading={isLoading}
          textAlign='center'
          className='w-full'
          onClick={handleSubmit(handleClick)}
        >
          {t('login')}
        </Button>
      </div>
    </div>
  )
}

export default Login

addTranslationNamespace(TranslationNamespace.login, loginEn, loginUa)
