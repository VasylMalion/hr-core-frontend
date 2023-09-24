import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import Input from "ui-components/Input/Input";
import Typography from "ui-components/Typography/Typography";

import loginEn from './Login_en.json'
import loginUa from './Login_ua.json'
import { Button } from "ui-components";
import { useLoginMutation } from "services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes, RoutePaths } from "containers/AppRouter";
import { setCredentials } from "store/slices/authSlice";
import { useAppDispatch } from "hooks/redux";

const Login: FunctionComponent = () => {

  const { t } = useTranslation(TranslationNamespace.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [
    login,
    data,
  ] = useLoginMutation()

  console.log(data)

  const handleClick = () => login({
    email,
    password
  })

  useEffect(() => {
    if (data.isSuccess) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('userInfo', JSON.stringify(data.data.userInfo))

      navigate(RoutePaths.DASHBOARD)

      dispatch(setCredentials({
        token: data.data.token,
        user: data.data.userInfo,
      }))

    }
  }, [data.isSuccess])

  return (
    <div className="bg-purpleLight min-h-screen w-screen flex items-center justify-center">
      <div className='grid gap-8 justify-center bg-white px-[8rem] py-[3rem]'>
        <Typography appearance='title'>
          {t('title')}
        </Typography>
        <div className='grid gap-4 w-[20rem]'>
          <Input label={t('email')} value={email} onChange={setEmail} className='w-full' />
          <Input label={t('password')} value={password} onChange={setPassword} className='w-full' />
        </div>
        <Button textAlign='center' className='w-full' onClick={handleClick}>
          {t('login')}
        </Button>
      </div>
    </div>
  )
}

export default Login

addTranslationNamespace(TranslationNamespace.login, loginEn, loginUa)
