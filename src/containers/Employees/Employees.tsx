import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import EmptyList from 'components/EmptyList/EmptyList'
import { RoutePaths } from 'containers/AppRouter'
import { useLazyGetAllQuery } from 'services/EmployeeService'
import { formatDate } from 'common/utils/common'
import { ReactComponent as PlusIcon } from 'assets/svgs/plus.svg'
import { useDebounce } from 'hooks/useDebounce'
import { PER_PAGE } from 'common/constants'
import { useAppSelector } from 'hooks/redux'
import { RoleTypes } from 'common/types/common'
import {
  Button,
  WithPreload,
  Typography,
  TableRow,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableHeadCell,
  Pagination,
  Input
} from 'ui-components'

import employeesEn from './Employees_en.json'
import employeesUa from './Employees_ua.json'

const Employees: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.employees)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<string>('')
  const debouncedInputValue = useDebounce({ value: filter })

  const userInfo = useAppSelector(state => state.auth.userInfo)
  const [getAll, { isFetching, isSuccess, isError, data }] = useLazyGetAllQuery()

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  useEffect(() => {
    getAll({ limit: PER_PAGE, page: currentPage, filter: debouncedInputValue })
  }, [currentPage, debouncedInputValue])

  const routeChange = (id: string) => {
    const path = generatePath(RoutePaths.EMPLOYEE_DETAILS, { id })
    navigate(path)
  }

  const handleAdding = () => navigate(RoutePaths.EMPLOYEE_ADDING)

  const rows = data && data.users.map(item => (
    <TableRow key={item.id} onClick={() => routeChange(item.id)}>
      <TableCell>{`${item.name} ${item.surname}`}</TableCell>
      <TableCell>{item.address}</TableCell>
      <TableCell>{item.position}</TableCell>
      <TableCell>{formatDate(item.birthDate)}</TableCell>
      <TableCell>{item.mobileNumber}</TableCell>
    </TableRow>
  ))

  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4'>
        <Typography appearance='title'>{t('title')}</Typography>
        {userInfo?.role === RoleTypes.ADMIN && (
          <div>
            <Button icon={<PlusIcon />} onClick={handleAdding}>{t('addEmployee')}</Button>
          </div>
        )}
      </div>
      <Input
        label={t('search')}
        placeholder={t('search')}
        value={filter}
        onChange={setFilter}
        className='mb-8 md:mb-6'
      />
      <WithPreload
        isLoading={isFetching}
        isSuccess={isSuccess}
        isError={isError}
      >
        {data?.users.length ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>{t('employee')}</TableHeadCell>
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
    </>
  )
}

export default Employees

addTranslationNamespace(TranslationNamespace.employees, employeesEn, employeesUa)
