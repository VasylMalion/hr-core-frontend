import { FunctionComponent, ReactNode } from "react"

type TableProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

const Table: FunctionComponent<TableProps> = ({ children }) => {

  return (
    <div>
      <table
        className='rounded-lg text-natural grid mb-3  w-fit	
      items-center py-[0.75rem]  border-b border-strock last:border-0'
      >
        {children}
      </table>
    </div>
  )
}

const TableRow: FunctionComponent<TableProps> = ({ children, className, onClick }) => {

  return (
    <tr onClick={onClick}
      className={`bg-white text-natural items-center py-[0.75rem] flex rounded-lg gap-8
      px-[1.5rem] border-b border-strock last:border-0 ${className}`}
    >
      {children}
    </tr>
  )
}

const TableHeadCell: FunctionComponent<TableProps> = ({ children }) => {

  return (
    <th className='table-cell min-w-[10rem] max-w-[14rem] text-start'>
      {children}
    </th>
  )
}

const TableCell: FunctionComponent<TableProps> = ({ children }) => {

  return (
    <td className='table-cell min-w-[10rem] max-w-[14rem] font-[ceraProLight]'>
      {children}
    </td>
  )
}

const TableHead: FunctionComponent<TableProps> = ({ children }) => <thead className='mb-4'>{children}</thead>

const TableBody: FunctionComponent<TableProps> = ({ children }) => <tbody>{children}</tbody>

export {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableHeadCell,
}
