import { FunctionComponent, useEffect, useState, DragEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { TranslationNamespace } from 'common/translations'
import { Column, Desk, Stage, Status, Task } from 'common/types/common'
import { useUpdateTaskMutation } from 'services/VacancyService'
import { WithPreload } from 'ui-components'

import ColumnItem from './ColumnItem'

type CandidatesProps = {
  refetch: () => void
  desk: Desk
  vacancyStatus: Status
}

const Candidates: FunctionComponent<CandidatesProps> = ({ desk, vacancyStatus, refetch }) => {
  const { t } = useTranslation(TranslationNamespace.candidates)
  const { id: vacancyId } = useParams<{ id: string }>()

  const [board, setBoard] = useState<Array<Column>>(null)
  const [currentColumn, setCurrentColumn] = useState<Column>(null)
  const [currentItem, setCurrentItem] = useState<Task>(null)

  const [updateTask, data] = useUpdateTaskMutation()

  const columnColors = [
    'bg-yellow',
    'bg-blueLight',
    'bg-red',
    'bg-blue',
    'bg-green',
    'bg-purple'
  ]

  const initialBoard: Array<Column> = (Object.keys(Stage) as Array<keyof typeof Stage>).map((key, index) => {
    return ({
      id: index,
      title: t(key),
      color: columnColors[index],
      items: desk?.tasks?.filter(item => item.column === Stage[key]).map(item => ({
        ...item,
        isOpen: false
      }))
    })
  })

  useEffect(() => {
    if (data.isSuccess || data.isError) {
      refetch()
    }
  }, [data.isSuccess, data.isError])

  useEffect(() => {
    if (vacancyStatus.isSuccess && !vacancyStatus.isLoading) setBoard(initialBoard)
  }, [vacancyStatus])

  const sortedItems = (column: Column) => board?.map(boardItem => {
    if (boardItem?.id === column.id) {
      return column
    }
    if (boardItem?.id === currentColumn.id) {
      return currentColumn
    }

    return boardItem
  })

  const dropHandler = (e: DragEvent, column: Column, item: Task) => {
    e.stopPropagation()

    const index = currentColumn.items.indexOf(currentItem)
    currentColumn.items.splice(index, 1)
    const dropIndex = column.items.indexOf(item)
    column.items.splice(dropIndex, 0, currentItem)

    setBoard(sortedItems(column))
  }

  const dragStartHandler = (e: DragEvent, column: Column, item: Task) => {
    setCurrentColumn(column)
    setCurrentItem(item)
  }

  const dragOverHandler = (e: DragEvent) => e.preventDefault()

  const dropCardHandler = (e: DragEvent, column: Column) => {
    e.stopPropagation()

    column.items.push(currentItem)
    const index = currentColumn.items.indexOf(currentItem)
    currentColumn.items.splice(index, 1)

    setBoard(sortedItems(column))
    updateTask({
      vacancyId,
      id: currentItem.id,
      column: column.title,
    })
  }

  const columns = board?.map(item => <ColumnItem
    dropHandler={dropHandler}
    dragStartHandler={dragStartHandler}
    dragOverHandler={dragOverHandler}
    dropCardHandler={dropCardHandler}
    setDesk={setBoard}
    refetch={refetch}
    column={item}
    desk={board}
  />)

  return <div className='my-6'>
    <WithPreload
      isLoading={vacancyStatus.isLoading && !data.isSuccess}
      isSuccess={vacancyStatus.isSuccess}
      isError={vacancyStatus.isError}
    >
      <div className={`
        grid overflow-x-auto grid-flow-col gap-6
        ${(data.isLoading || vacancyStatus.isLoading) && 'pointer-events-none	opacity-50'} 
      `}
      >
        {columns}
      </div>
    </WithPreload>
  </div>
}

export default Candidates
