import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, Modal, Typography, WithPreload } from 'ui-components'
import { formatDate } from 'common/utils/common'
import { useGetOneQuery, useLazyDeleteOneQuery, util } from 'services/CandidateService'
import { RoutePaths } from 'containers/AppRouter'

import candidateDetailsEn from './CandidateDetails_en.json'
import candidateDetailsUa from './CandidateDetails_ua.json'

const EmployeeDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.candidateDetails)
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { data, isSuccess, isLoading, isError } = useGetOneQuery({ id })
  const [deleteCandidate, deletingData] = useLazyDeleteOneQuery()

  useEffect(() => {
    if (isSuccess && !data) {
      navigate(RoutePaths.CANDIDATES)
    }
  }, [isSuccess, data])

  const onFailClose = () => {
    setIsOpenModal(false)
    dispatch(util.resetApiState())
  }

  const onSuccessClose = () => {
    setIsOpenModal(false)
    dispatch(util.resetApiState())
    navigate(RoutePaths.CANDIDATES)
  }

  return (
    <>
      <WithPreload
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
      >
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
              {t('deleteCandidate')}
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
                  <span>{data?.location}</span>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <Typography appearance='subtitle'>
                {t('workInfo')}
              </Typography>
              <div className='grid gap-2 bg-white p-[1rem] rounded'>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('position')}</span>
                  <span>{data?.position}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-[ceraProLight]'>{t('salary')}</span>
                  <span>{t('salaryValue', { value: data?.salary })}</span>
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
              onClick={() => deleteCandidate({ id })}
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
        onClose={onSuccessClose}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={deletingData.isError}
        onClose={onFailClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
    </>
  )
}

export default EmployeeDetails

addTranslationNamespace(TranslationNamespace.candidateDetails, candidateDetailsEn, candidateDetailsUa)
