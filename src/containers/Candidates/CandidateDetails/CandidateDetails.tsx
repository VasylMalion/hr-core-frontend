import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Button, Modal, Typography, WithPreload } from 'ui-components'
import { useGetOneQuery, useLazyDeleteOneQuery, util } from 'services/CandidateService'
import { formatDate } from 'common/utils/common'
import { RoutePaths } from 'containers/AppRouter'
import { ContentSection } from 'common/types/common'

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

  const onClose = (isSuccess?: boolean) => {
    setIsOpenModal(false)
    dispatch(util.resetApiState())
    if (isSuccess) navigate(RoutePaths.CANDIDATES)
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
      value: data?.location,
    },
  ]

  const workInfo = [
    {
      title: t('position'),
      value: data?.position,
    },
    {
      title: t('salary'),
      value: data?.salary ? t('salaryValue', { value: data?.salary }) : '-',
    },
  ]

  const getContent = (title: string, info: ContentSection) => (
    <div>
      <Typography appearance='subtitle'>
        {t(title)}
      </Typography>
      <div className='grid gap-2 dark:bg-dark-100 bg-white p-4 rounded'>
        {info.map(item => (
          <div className='flex gap-2'>
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
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4'>
          <Typography appearance='title'>
            {t('title', { num: id })}
          </Typography>
          <div>
            <Button
              type='secondary'
              isLoading={false}
              onClick={() => setIsOpenModal(true)}
              className='border-red border !text-red'
            >
              {t('deleteCandidate')}
            </Button>
          </div>
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

addTranslationNamespace(TranslationNamespace.candidateDetails, candidateDetailsEn, candidateDetailsUa)
