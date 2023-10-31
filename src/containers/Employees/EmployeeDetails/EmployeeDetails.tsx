import { FunctionComponent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useDeleteOneMutation, useGetOneQuery, util } from 'services/EmployeeService'
import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, Modal, Typography, WithPreload } from 'ui-components'
import { formatDate } from 'common/utils/common'
import { RoutePaths } from 'containers/AppRouter'

import employeeDetailsEn from './EmployeeDetails_en.json'
import employeeDetailsUa from './EmployeeDetails_ua.json'

const EmployeeDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employeeDetails)
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { data, isLoading, isSuccess, isError } = useGetOneQuery({ id })
  const [deleteEmployee, deletingData] = useDeleteOneMutation()

  const onClose = (success?: boolean) => {
    setIsOpenModal(false)
    dispatch(util.resetApiState())
    if (success) navigate(RoutePaths.EMPLOYEES)
  }

  return (
    <>
      <WithPreload isSuccess={isSuccess} isLoading={isLoading} isError={isError}>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 gap:4'>
          <Typography appearance='title'>
            {t('title', { num: id })}
          </Typography>
          <div>
            <Button
              type='secondary'
              isLoading={false}
              onClick={() => setIsOpenModal(true)}
              className='border-red border-[1px] text-red'
            >
              {t('deleteEmployee')}
            </Button>
          </div>
        </div>
        <div className='grid gap-6 max-w-[50rem]'>
          <div className='max-w-[30rem]'>
            <div>
              <Typography appearance='subtitle'>
                {t('personalInfo')}
              </Typography>
              <div className='grid gap-2 bg-white p-[1rem] rounded'>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('name')}</span>
                  <span>{data?.name}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('surname')}</span>
                  <span>{data?.surname}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('genderTitle')}</span>
                  <span>{t(`gender.${data?.gender}`)}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('birthDate')}</span>
                  <span>{formatDate(data?.birthDate)}</span>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <Typography appearance='subtitle'>
                {t('contactInfo')}
              </Typography>
              <div className='grid gap-2 bg-white p-[1rem] rounded'>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('email')}</span>
                  <span>{data?.email}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('mobile')}</span>
                  <span>{data?.mobileNumber}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('address')}</span>
                  <span>{data?.address}</span>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <Typography appearance='subtitle'>
                {t('workInfo')}
              </Typography>
              <div className='grid gap-2 bg-white p-[1rem] rounded'>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('department')}</span>
                  <span>{data?.department}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('position')}</span>
                  <span>{data?.position}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('startDate')}</span>
                  <span>{formatDate(data?.startDate)}</span>
                </div>
              </div>
            </div>
          </div>
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
