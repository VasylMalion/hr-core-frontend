import { FunctionComponent, ReactNode } from 'react'

type TableProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

const Table: FunctionComponent<TableProps> = ({ children }) => (
  <div className='overflow-x-auto rounded-lg border border-gray-300'>
    <table className='text-gray-600 w-full items-center py-4 bg-white'>
      {children}
    </table>
  </div>
)

const TableRow: FunctionComponent<TableProps> = ({ children, className, onClick }) => (
  <tr
    onClick={onClick}
    className={`items-center border-b border-strock last:border-0 ${className}`}
  >
    {children}
  </tr>
)

const TableHeadCell: FunctionComponent<TableProps> = ({ children }) =>
  <th className='table-cell min-w-[10rem] max-w-56 text-start px-6 py-3'>
    {children}
  </th>

const TableCell: FunctionComponent<TableProps> = ({ children }) =>
  <td className='table-cell min-w-[10rem] max-w-56 font-[ceraProLight] px-6 py-3'>
    {children}
  </td>

const TableHead: FunctionComponent<TableProps> = ({ children }) =>
  <thead className='border-b border-strock'>{children}</thead>

const TableBody: FunctionComponent<TableProps> = ({ children }) =>
  <tbody className='cursor-pointer'>{children}</tbody>

export {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableHeadCell,
}
