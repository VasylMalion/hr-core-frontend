import { FunctionComponent, ReactNode } from 'react'

type TableProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

const Table: FunctionComponent<TableProps> = ({ children }) => (
  <div className='overflow-x-auto rounded-lg border border-[#091e4214]'>
    <table className='text-natural w-full items-center py-[1rem] bg-white'>
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
  <th className='table-cell min-w-[10rem] max-w-[14rem] text-start px-[1.5rem] py-[0.75rem]'>
    {children}
  </th>

const TableCell: FunctionComponent<TableProps> = ({ children }) =>
  <td className='table-cell min-w-[10rem] max-w-[14rem] font-[ceraProLight] px-[1.5rem] py-[0.75rem]'>
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
