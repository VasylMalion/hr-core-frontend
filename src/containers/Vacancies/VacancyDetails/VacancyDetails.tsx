import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { SelectInputState, VacancyStatus } from 'common/types/common'
import { useFindQuery } from 'services/CandidateService'
import {
  TranslationNamespace,
  addTranslationNamespace,
} from 'common/translations'
import {
  useAddTaskMutation,
  useGetOneQuery,
  useLazyDeactivateQuery,
  util,
} from 'services/VacancyService'
import {
  Button,
  Modal,
  Typography,
  TabNavigation,
  SelectInput,
} from 'ui-components'
import PlusIcon from 'assets/svgs/PlusIcon'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { checkValidation } from 'common/validation/validation'
import { RoutePaths } from 'containers/AppRouter'

import Candidates from './components/Candidates'
import Timeline from './components/Timeline'
import Details from './components/Details'

import vacancyDetailsEn from './VacancyDetails_en.json'
import vacancyDetailsUa from './VacancyDetails_ua.json'

enum TabNavigationTypes {
  CANDIDATES = 'CANDIDATES',
  VACANCY_DETAILS = 'VACANCY_DETAILS',
  TIMELINE = 'TIMELINE',
}

const VacancyDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState<string>('')
  const [tab, setTab] = useState<TabNavigationTypes>(
    TabNavigationTypes.CANDIDATES
  )
  const [candidate, setCandidate] = useState<SelectInputState>({
    value: null,
    validation: { isValid: true },
  })
  const [isOpenTaskModal, setIsOpenTaskModal] = useState<boolean>(false)
  const [isOpenDeactivateModal, setIsOpenDeactivateModal] =
    useState<boolean>(false)

  const debouncedInputValue = useDebounce({ value: inputValue })

  const candidates = useFindQuery({ username: debouncedInputValue })
  const { data, isFetching, isSuccess, isError, refetch } = useGetOneQuery({
    id,
  })
  const [deactivate, deactivationData] = useLazyDeactivateQuery()
  const [addTask, addTaskData] = useAddTaskMutation()

  useEffect(() => {
    if (isSuccess && !data) {
      navigate(RoutePaths.VACANCIES)
    }
  }, [isSuccess, data])

  const vacancyStatus = {
    isLoading: isFetching,
    isSuccess,
    isError,
  }

  const onClose = () => {
    setIsOpenDeactivateModal(false)
    setIsOpenTaskModal(false)
    setCandidate({ value: null, validation: { isValid: true } })
    setInputValue('')
    dispatch(util.resetApiState())
  }

  const options = [
    {
      title: t('tabs.candidates'),
      value: TabNavigationTypes.CANDIDATES,
    },
    {
      title: t('tabs.vacancyDetails'),
      value: TabNavigationTypes.VACANCY_DETAILS,
    },
    {
      title: t('tabs.timeline'),
      value: TabNavigationTypes.TIMELINE,
    },
  ]

  const getContent = () => {
    switch (tab) {
      case TabNavigationTypes.CANDIDATES: {
        return (
          <Candidates
            {...data}
            refetch={refetch}
            vacancyStatus={vacancyStatus}
          />
        )
      }
      case TabNavigationTypes.VACANCY_DETAILS: {
        return <Details {...data} vacancyStatus={vacancyStatus} />
      }
      case TabNavigationTypes.TIMELINE: {
        return <Timeline {...data} vacancyStatus={vacancyStatus} />
      }
      default: {
        return (
          <Candidates
            {...data}
            refetch={refetch}
            vacancyStatus={vacancyStatus}
          />
        )
      }
    }
  }

  const handleCandidate = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setCandidate((prev) => ({ ...prev, validation }))
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <Typography appearance="title">{t('title', { id })}</Typography>
        {data?.status === VacancyStatus.ACTIVE && (
          <div>
            <Button
              type="secondary"
              onClick={() => setIsOpenDeactivateModal(true)}
              className="border-red border !text-red"
            >
              {t('deactivate')}
            </Button>
          </div>
        )}
      </div>
      {data?.position && (
        <div className="flex flex-col my-6 md:mb-4 md:mt-0">
          <Typography appearance="subtitle">{data?.position}</Typography>
          <div>
            <Button
              icon={<PlusIcon />}
              onClick={() => setIsOpenTaskModal(true)}
            >
              {t('addTask')}
            </Button>
          </div>
        </div>
      )}
      <TabNavigation<TabNavigationTypes>
        options={options}
        value={tab}
        onChange={setTab}
      />
      {getContent()}
      <Modal
        isOpen={
          isOpenDeactivateModal &&
          !deactivationData.isSuccess &&
          !deactivationData.isError
        }
        onClose={() => setIsOpenDeactivateModal(false)}
        title={t('attention')}
        body={t('deactivationDescription')}
        buttons={
          <>
            <Button
              isLoading={deactivationData.isLoading}
              textAlign="center"
              onClick={() => deactivate({ id })}
            >
              {t('yes')}
            </Button>
            <Button
              textAlign="center"
              type="secondary"
              onClick={() => setIsOpenDeactivateModal(false)}
            >
              {t('no')}
            </Button>
          </>
        }
      />
      <Modal
        isOpen={deactivationData.isSuccess}
        onClose={onClose}
        title={t('successTitle')}
        body={t('deaSuccessDescription')}
      />
      <Modal
        isOpen={deactivationData.isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
      <Modal
        isOpen={addTaskData.isSuccess}
        onClose={onClose}
        title={t('successTitle')}
        body={t('taskSuccessDescription')}
      />
      <Modal
        isOpen={addTaskData.isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
      <Modal
        isOpen={
          isOpenTaskModal && !addTaskData.isSuccess && !addTaskData.isError
        }
        onClose={() => setIsOpenTaskModal(false)}
        title={t('addtaskTitle')}
        body={
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div>{t('addtaskDescription')}</div>
              <SelectInput
                label={t('findCandidate')}
                placeholder={t('findCandidate')}
                value={inputValue}
                setValue={(value) => {
                  setInputValue(value)
                  handleCandidate(value)
                }}
                isLoading={candidates.isFetching}
                data={candidates.data}
                validation={candidate.validation}
                onSuccessFind={(value) => setCandidate({ ...candidate, value })}
              />
            </div>
            <div className="grid gap-3">
              <div>{t('cantFindCandidate')}</div>
              <Button
                onClick={() => navigate(RoutePaths.CANDIDATE_ADDING)}
                textAlign="center"
              >
                {t('addCandidate')}
              </Button>
            </div>
          </div>
        }
        buttons={
          <Button
            textAlign="center"
            disabled={!candidate.value}
            isLoading={addTaskData.isLoading}
            onClick={() =>
              addTask({
                id,
                boardId: data?.desk?._id,
                candidate: candidate.value,
              })
            }
          >
            {t('addTask')}
          </Button>
        }
      />
    </>
  )
}

export default VacancyDetails

addTranslationNamespace(
  TranslationNamespace.vacancyDetails,
  vacancyDetailsEn,
  vacancyDetailsUa
)
