import { FunctionComponent, ReactNode } from "react"
import { ReactComponent as ArrowIcon } from "assets/svgs/arrow.svg"

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
    className=
    {
      `flex justify-center items-center w-[2.5rem] h-[2.5rem] rounded bg-white cursor-pointer 
    ${isActive && '!bg-[#091e4214]'}
    ${disabled && '!bg-[#091e4214] opacity-40 !cursor-not-allowed'}
    `
    }
  >
    {value}
  </div>

const Pagination: FunctionComponent<PaginationProps> = ({
  pagesCount,
  currentPage,
  onChange,
}) => {

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const pageNumbers = pages.map(page =>
    <PaginationItem onClick={() => handlePageClick(page)} isActive={page === currentPage} value={page} />
  )

  const handlePrevClick = () => onChange(currentPage - 1)
  const handleNextClick = () => onChange(currentPage + 1)
  const handlePageClick = (page: number) => onChange(page)

  let pageIncrementEllipses = null;
  if (pages.length > 5) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
  }
  let pageDecremenEllipses = null;
  if (1 >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>
  }

  if (pagesCount <= 1) {
    return null
  } 

  return (
    <div className='flex gap-2 justify-center'>
      <PaginationItem onClick={handlePrevClick} disabled={currentPage === 1} value={<ArrowIcon className='w-[1.7rem] h-[1.7rem]' />} />
      {pageNumbers}
      <PaginationItem onClick={handleNextClick} disabled={currentPage === pagesCount} value={<ArrowIcon className='w-[1.7rem] h-[1.7rem] rotate-180	' />} />
    </div>
  )
}

export default Pagination
