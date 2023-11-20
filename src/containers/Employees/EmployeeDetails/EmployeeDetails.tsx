import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useDeleteOneMutation, useGetOneQuery, util } from 'services/EmployeeService'
import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, Modal, Typography, WithPreload } from 'ui-components'
import { ContentSection, RoleTypes } from 'common/types/common'
import { formatDate } from 'common/utils/common'
import { RoutePaths } from 'containers/AppRouter'
import { useAppSelector } from 'hooks/redux'

import employeeDetailsEn from './EmployeeDetails_en.json'
import employeeDetailsUa from './EmployeeDetails_ua.json'

const EmployeeDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employeeDetails)
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const userInfo = useAppSelector(state => state.auth.userInfo)
  const { data, isLoading, isSuccess, isError } = useGetOneQuery({ id })
  const [deleteEmployee, deletingData] = useDeleteOneMutation()

  useEffect(() => {
    if (isSuccess && !data) {
      navigate(RoutePaths.EMPLOYEES)
    }
  }, [isSuccess, data])

  const onClose = (success?: boolean) => {
    setIsOpenModal(false)
    dispatch(util.resetApiState())
    if (success) navigate(RoutePaths.EMPLOYEES)
  }

  const personalInfo = [
    {
      title: t('name'),
      value: data?.name,
    },
    {
      title: t('surname'),
      value: data?.surname,
    },
    {
      title: t('genderTitle'),
      value: t(`gender.${data?.gender}`),
    },
    {
      title: t('birthDate'),
      value: formatDate(data?.birthDate),
    },
  ]

  const contactInfo = [
    {
      title: t('email'),
      value: data?.email,
    },
    {
      title: t('mobile'),
      value: data?.mobileNumber,
    },
    {
      title: t('address'),
      value: data?.address,
    },
  ]

  const workInfo = [
    {
      title: t('department'),
      value: data?.department,
    },
    {
      title: t('position'),
      value: data?.position,
    },
    {
      title: t('startDate'),
      value: formatDate(data?.startDate)
    }
  ]

  const getContent = (title: string, info: ContentSection) => (
    <div>
      <Typography appearance='subtitle'>
        {t(title)}
      </Typography>
      <div className='grid gap-2 dark:bg-dark-100 bg-white p-4 rounded'>
        {info.map((item, index) => (
          <div className='flex gap-2' key={index}>
            <span className='font-[ceraProLight]'>{item.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <WithPreload isSuccess={isSuccess} isLoading={isLoading} isError={isError}>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 gap:4'>
          <Typography appearance='title'>
            {t('title', { num: id })}
          </Typography>
          {userInfo?.role === RoleTypes.ADMIN && (
            <div>
              <Button
                type='secondary'
                isLoading={false}
                onClick={() => setIsOpenModal(true)}
                className='border-red border !text-red'
              >
                {t('deleteEmployee')}
              </Button>
            </div>
          )}
        </div>
        <div className='max-w-medium flex flex-col gap-6'>
          {getContent('personalInfo', personalInfo)}
          {getContent('contactInfo', contactInfo)}
          {getContent('workInfo', workInfo)}
        </div>
      </WithPreload>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title={t('deletingTitle')}
        body={t('deletingDescription')}
        buttons={
          <>
            <Button
              isLoading={deletingData.isLoading}
              textAlign='center'
              onClick={() => deleteEmployee({ id })}
            >
              {t('yes')}
            </Button>
            <Button
              textAlign='center'
              type='secondary'
              onClick={() => setIsOpenModal(false)}
            >
              {t('no')}
            </Button>
          </>
        }
      />
      <Modal
        isOpen={deletingData.isSuccess}
        onClose={() => onClose(true)}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={deletingData.isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
    </>
  )
}

export default EmployeeDetails

addTranslationNamespace(TranslationNamespace.employeeDetails, employeeDetailsEn, employeeDetailsUa)
