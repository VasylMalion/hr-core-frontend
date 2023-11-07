import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import EmptyList from 'components/EmptyList/EmptyList'
import { RoutePaths } from 'containers/AppRouter'
import { formatDate } from 'common/utils/common'
import { useLazyGetAllQuery } from 'services/CandidateService'
import { ReactComponent as PlusIcon } from 'assets/svgs/plus.svg'
import { useDebounce } from 'hooks/useDebounce'
import { PER_PAGE } from 'common/constants'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Typography,
  Pagination,
  WithPreload,
  Input,
  Checkbox,
} from 'ui-components'

import candidatesEn from './Candidates_en.json'
import candidatesUa from './Candidates_ua.json'

const Candidates: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.candidates)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onlyMine, setOnlyMine] = useState<boolean>(false)

  const [filter, setFilter] = useState('')
  const debouncedInputValue = useDebounce({ value: filter })

  const [getAll, { isFetching, isSuccess, isError, data }] = useLazyGetAllQuery()

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, onlyMine])

  useEffect(() => {
    getAll({ limit: PER_PAGE, page: currentPage, onlyMine, filter: debouncedInputValue })
  }, [currentPage, onlyMine, debouncedInputValue])

  const routeChange = (id: string) => {
    const path = generatePath(RoutePaths.CANDIDATE_DETAILS, { id })
    navigate(path)
  }

  const handleAdding = () => navigate(RoutePaths.CANDIDATE_ADDING)

  const rows = data && data.candidates.map(item => (
    <TableRow key={item.id} onClick={() => routeChange(item.id)}>
      <TableCell>{`${item.name} ${item.surname}`}</TableCell>
      <TableCell>{item.location}</TableCell>
      <TableCell>{item.position}</TableCell>
      <TableCell>{formatDate(item.birthDate)}</TableCell>
      <TableCell>{item.mobileNumber}</TableCell>
    </TableRow>
  ))

  const actionStyles = 'flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4'

  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4'>
        <Typography appearance='title'>
          {t('title')}
        </Typography>
        <div>
          <Button icon={<PlusIcon />} onClick={handleAdding}>
            {t('addCandidate')}
          </Button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-6'>
        <Input
          label={t('search')}
          placeholder={t('search')}
          className='mb-4 md:mb-0'
          value={filter}
          onChange={setFilter}
        />
        <Checkbox checked={onlyMine} onChange={setOnlyMine} caption={t('onlyMine')} />
      </div>
      <WithPreload
        isLoading={isFetching}
        isSuccess={isSuccess}
        isError={isError}
      >
        {data?.candidates.length ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>{t('candidate')}</TableHeadCell>
                  <TableHeadCell>{t('location')}</TableHeadCell>
                  <TableHeadCell>{t('position')}</TableHeadCell>
                  <TableHeadCell>{t('birthdate')}</TableHeadCell>
                  <TableHeadCell>{t('mobileNumber')}</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows}
              </TableBody>
            </Table>
            <div className='m-8'>
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
    </>
  )
}

export default Candidates

addTranslationNamespace(TranslationNamespace.candidates, candidatesEn, candidatesUa)
