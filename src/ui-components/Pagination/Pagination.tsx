import { FunctionComponent, ReactNode, memo } from 'react'

import ArrowIcon from 'assets/svgs/ArrowIcon'

type PaginationProps = {
  pagesCount: number
  currentPage: number
  onChange: (value: number) => void
}

type PaginationItemProps = {
  value: number | ReactNode
  isActive?: boolean
  disabled?: boolean
  onClick: () => void
}

const PaginationItem: FunctionComponent<PaginationItemProps> = ({ value = 1, isActive, disabled, onClick }) =>
  <div
    onClick={onClick}
    className={`
      flex justify-center items-center w-10 h-10 rounded bg-white cursor-pointer dark:bg-dark-100 
      ${isActive && '!bg-gray-300'}
      ${disabled && '!bg-gray-300 opacity-40 !cursor-not-allowed'}
    `}
  >
    {value}
  </div>

const Pagination: FunctionComponent<PaginationProps> = ({
  pagesCount,
  currentPage = 1,
  onChange,
}) => {

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const pageNumbers = pages.map(page =>
    <PaginationItem
      key={page}
      value={page}
      onClick={() => handlePageClick(page)}
      isActive={page === currentPage}
    />
  )

  const handlePrevClick = () => onChange(currentPage - 1)
  const handleNextClick = () => onChange(currentPage + 1)
  const handlePageClick = (page: number) => onChange(page)

  if (pagesCount <= 1) {
    return null
  }

  return (
    <div className='flex gap-2 justify-center' data-testid='pagination'>
      <PaginationItem
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        value={<ArrowIcon className='w-7 h-7 dark:stroke-white stroke-black' />}
      />
      {pageNumbers}
      <PaginationItem
        onClick={handleNextClick}
        disabled={currentPage === pagesCount}
        value={<ArrowIcon className='w-7 h-7 rotate-180 dark:stroke-white stroke-black' />}
      />
    </div>
  )
}

export default memo(Pagination)
