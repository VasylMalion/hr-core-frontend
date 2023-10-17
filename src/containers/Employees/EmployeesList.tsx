import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent, useState } from "react";
import { Button } from "ui-components";
import Typography from "ui-components/Typography/Typography";

import employeesListEn from './EmployeesList_en.json'
import employeesListUa from './EmployeesList_ua.json'
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { RoutePaths } from "containers/AppRouter";
import { TableRow, Table, TableHead, TableCell, TableBody, TableHeadCell } from "ui-components/Table/Table";
import { useGetAllQuery } from "services/EmployeeService";
import { useDispatch } from "react-redux";
import { formatDate } from "common/utils/common";
import Pagination from "ui-components/Pagination/Pagination";

const EmployeesList: FunctionComponent = () => {

  const { t } = useTranslation(TranslationNamespace.employeesList)
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState<number>(1)

  console.log(currentPage, 'ssd')

  const { isLoading, isSuccess, isError, data } = useGetAllQuery({
    limit: 1,
    page: currentPage,
  })

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  const navigate = useNavigate()

  const routeChange = (id: string) => {
    console.log(id)
    const path = generatePath(RoutePaths.EMPLOYEE_DETAILS, { id });
    console.log(path)
    navigate(path);
  };

  const rows = data && data.users.map(item => (
    <TableRow key={item.id} className='cursor-pointer' onClick={() => routeChange(item.id)}>
      <TableCell>{`${item.name} ${item.surname}`}</TableCell>
      <TableCell>{item.address}</TableCell>
      <TableCell>{item.position}</TableCell>
      <TableCell>{formatDate(item.birthDate)}</TableCell>
      <TableCell>{item.mobileNumber}</TableCell>
    </TableRow>
  ))

  return isLoading ? <div>Loading...</div> : (
    <div>
      <div className='flex justify-between'>
        <Typography appearance='title'>
          {t('title')}
        </Typography>
        <Button onClick={() => navigate(RoutePaths.EMPLOYEE_ADDING)}>
          {t('addEmployee')}
        </Button>
      </div>

      It is the Employees List
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
      <Pagination
        pagesCount={data.count}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  )
}

export default EmployeesList

addTranslationNamespace(TranslationNamespace.employeesList, employeesListEn, employeesListUa)
