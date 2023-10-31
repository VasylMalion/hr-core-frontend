import { FunctionComponent, createRef, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import { TranslationNamespace, addTranslationNamespace } from "common/translations"
import Typography from "ui-components/Typography/Typography"
import TabNavigation from "ui-components/TabOptions/TabNavigation"
import { useAddTaskMutation, useGetOneQuery, useLazyDeactivateQuery, useLazyGetVacanciesQuery, useLazyGetOneQuery, util } from "services/VacancyService"
import { Button, Input, Modal } from "ui-components"
import { RoutePaths } from "containers/AppRouter"
import { ReactComponent as PlusIcon } from 'assets/svgs/plus.svg'

import Candidates from "./components/Candidates"
import Timeline from "./components/Timeline"
import Details from "./components/Details"
import vacancyDetailsEn from './VacancyDetails_en.json'
import vacancyDetailsUa from './VacancyDetails_ua.json'
import { VacancyStatus } from "common/types/common"
import { useDispatch } from "react-redux"
import SelectInput from "ui-components/SelectInput/SelectInput"
import { useLazyFindCandidateQuery } from "services/CandidateService"

enum TabNavigationTypes {
  CANDIDATES = 'CANDIDATES',
  VACANCY_DETAILS = 'VACANCY_DETAILS',
  TIMELINE = 'TIMELINE',
}

type FindedCandidate = {
  id: string
  name: string
}

type SelectCandidate = {
  label: string
  value: FindedCandidate
}

const VacancyDetails: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.CANDIDATES)
  const [inputValue, setInputValue] = useState<string>('')
  const [candidate, setCandidate] = useState<FindedCandidate>(null)
  const [isOpenTaskModal, setIsOpenTaskModal] = useState<boolean>(false)
  const [isOpenDeactivateModal, setIsOpenDeactivateModal] = useState<boolean>(false)

  const [getCandidates, candidates] = useLazyFindCandidateQuery()
  const { data, isFetching, isSuccess, isError, refetch } = useGetOneQuery({ id })
  const [deactivate, deactivationData] = useLazyDeactivateQuery()
  const [addTask, addTaskData] = useAddTaskMutation()

  const vacancyStatus = {
    isLoading: isFetching,
    isSuccess,
    isError
  }

  const onClose = () => dispatch(util.resetApiState())

  useEffect(() => {
    getCandidates({ username: inputValue })
  }, [inputValue])

  const options = [
    {
      title: t('tabs.candidates'),
      type: TabNavigationTypes.CANDIDATES
    },
    {
      title: t('tabs.vacancyDetails'),
      type: TabNavigationTypes.VACANCY_DETAILS
    },
    {
      title: t('tabs.timeline'),
      type: TabNavigationTypes.TIMELINE
    },
  ]

  const getContent = () => {
    switch (tab) {
      case TabNavigationTypes.CANDIDATES: {
        return <Candidates {...data} refetch={refetch} vacancyStatus={vacancyStatus} />
      }
      case TabNavigationTypes.VACANCY_DETAILS: {
        return <Details {...data} vacancyStatus={vacancyStatus} />
      }
      case TabNavigationTypes.TIMELINE: {
        return <Timeline {...data} vacancyStatus={vacancyStatus} />
      }
      default: {
        return <Candidates {...data} refetch={refetch} vacancyStatus={vacancyStatus} />
      }
    }
  }

  const loadOptions = async (inputValue: string) => {
    await getCandidates({ username: inputValue })

    return candidates.data.map(item => ({
      value: item,
      label: item.name,
    }))
  }

  const onChange = (option: SelectCandidate) => {
    setCandidate(option.value)
    setInputValue(option ? option.label : '')
  }

  return <>
    <div className='flex flex-col md:flex-row md:justify-between md:items-center gap:4'>
      <Typography appearance='title'>
        {t('title', { id })}
      </Typography>
      {data?.status === VacancyStatus.ACTIVE && (
        <div>
          <Button
            type='secondary'
            onClick={() => setIsOpenDeactivateModal(true)}
            className='border-red border-[1px] text-red'
          >
            {t('deactivate')}
          </Button>
        </div>
      )}
    </div>
    {data?.position && (
      <div className='flex flex-col my-6 md:mb-4 md:mt-0 gap:4'>
        <Typography appearance='subtitle'>
          {data?.position}
        </Typography>
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
    <TabNavigation
      options={options}
      value={tab}
      onChange={setTab}
    />
    {getContent()}
    <Modal
      isOpen={isOpenDeactivateModal}
      onClose={() => setIsOpenDeactivateModal(false)}
      title={t('attention')}
      body={t('deactivationDescription')}
      buttons={
        <>
          <Button
            isLoading={deactivationData.isLoading}
            textAlign='center'
            onClick={() => deactivate({ id })}
          >
            {t('yes')}
          </Button>
          <Button
            textAlign='center'
            type='secondary'
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
      isOpen={isOpenTaskModal}
      onClose={() => setIsOpenTaskModal(false)}
      title={t('failTitle')}
      body={<div>
        <SelectInput options={loadOptions} onChange={onChange} inputValue={inputValue} onInputChange={setInputValue} />
        <Button isLoading={addTaskData.isLoading} onClick={() => addTask({ id, boardId: data?.desk?._id, candidate: candidate })}>
          {t('deactivate')}
        </Button>
      </div>}
    />
  </>
}

export default VacancyDetails

addTranslationNamespace(TranslationNamespace.vacancyDetails, vacancyDetailsEn, vacancyDetailsUa)
