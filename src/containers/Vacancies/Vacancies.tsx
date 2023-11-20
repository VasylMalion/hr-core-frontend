import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { Vacancy, VacancyStatus } from 'common/types/common'
import { useLazyGetAllQuery } from 'services/VacancyService'
import { Button, Typography, WithPreload, Pagination, TabNavigation, Input, Checkbox } from 'ui-components'
import PlusIcon from 'assets/svgs/PlusIcon'
import { RoutePaths } from 'containers/AppRouter'
import EmptyList from 'components/EmptyList/EmptyList'
import { useDebounce } from 'hooks/useDebounce/useDebounce'

import VacancyItem from './VacancyItem'
import vacanciesEn from './Vacancies_en.json'
import vacanciesUa from './Vacancies_ua.json'

enum TabNavigationTypes {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

const VACANCIES_PER_PAGE = 8

const Vacancies: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.vacancies)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.ALL)
  const [onlyMine, setOnlyMine] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const debouncedInputValue = useDebounce({ value: filter })

  const [getVacancies, { data, isFetching, isSuccess, isError }] = useLazyGetAllQuery()

  const list = data?.vacancies.map((item: Vacancy, index: number) => <VacancyItem key={index} {...item} />)

  useEffect(() => {
    setCurrentPage(1)
  }, [tab, filter, onlyMine])

  useEffect(() => {
    getVacancies({
      status: tab !== TabNavigationTypes.ALL ? tab as unknown as VacancyStatus : undefined,
      limit: VACANCIES_PER_PAGE,
      page: currentPage,
      onlyMine,
      filter: debouncedInputValue
    })
  }, [tab, currentPage, onlyMine, debouncedInputValue])

  const options = [
    {
      title: t('tabs.ALL'),
      value: TabNavigationTypes.ALL
    },
    {
      title: t('tabs.ACTIVE'),
      value: TabNavigationTypes.ACTIVE
    },
    {
      title: t('tabs.INACTIVE'),
      value: TabNavigationTypes.INACTIVE
    },
  ]

  return (
    <div data-testid='vacancies-page'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4'>
        <Typography appearance='title'>
          {t('title')}
        </Typography>
        <div>
          <Button icon={<PlusIcon />} onClick={() => navigate(RoutePaths.VACANCY_ADDING)}>
            {t('addNewVacancy')}
          </Button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-6'>
        <Input
          label={t('search')}
          placeholder={t('search')}
          value={filter}
          onChange={setFilter}
          className='mb-4 md:mb-0'
        />
        <Checkbox checked={onlyMine} onChange={setOnlyMine} caption={t('onlyMine')} />
      </div>
      <TabNavigation<TabNavigationTypes> options={options} value={tab} onChange={setTab} />
      <WithPreload isLoading={isFetching} isSuccess={isSuccess} isError={isError}>
        {data?.vacancies.length ? (
          <>
            <div className='flex flex-wrap gap-8 mt-8'>
              {list}
            </div>
            <div className='my-8'>
              <Pagination
                pagesCount={data?.count}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <EmptyList />
        )}
      </WithPreload>
    </div>
  )
}

export default Vacancies

addTranslationNamespace(TranslationNamespace.vacancies, vacanciesEn, vacanciesUa)
