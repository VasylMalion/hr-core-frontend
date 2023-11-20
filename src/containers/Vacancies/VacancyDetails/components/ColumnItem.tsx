import { FunctionComponent, DragEvent, useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import AvatarIcon from 'assets/images/avatar.png'
import AvatarWhiteIcon from 'assets/images/avatar-white.png'
import { Task, Column, Theme } from 'common/types/common'
import { Button, Modal } from 'ui-components'
import { RoutePaths } from 'containers/AppRouter'
import { useDeleteTaskMutation } from 'services/VacancyService'
import { LOCAL_STORAGE_THEME_KEY } from 'common/constants'

type ColumnItemProps = {
  dragStartHandler: (e: DragEvent, column: Column, item: Task) => void
  dragOverHandler: (e: DragEvent) => void
  dropCardHandler: (e: DragEvent, column: Column) => void
  dropHandler: (e: DragEvent, column: Column, item: Task) => void
  setDesk: (desk: Array<Column>) => void
  refetch: () => void
  column: Column
  desk: Array<Column>
}

type TaskProps = {
  item: Task
} & Omit<ColumnItemProps, 'dropCardHandler'>

const TaskItem: FunctionComponent<TaskProps> = ({
  item,
  desk,
  refetch,
  setDesk,
  column,
  dropHandler,
  dragStartHandler,
  dragOverHandler,
}) => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)
  const { id: vacancyId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState<boolean>()
  const [deleteItem, data] = useDeleteTaskMutation()

  const isDarkTheme =
    localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === Theme.DARK

  const onClick = () => {
    let it: Task = null

    for (let index = 0; index < desk.length; ++index) {
      const result = desk[index].items.find((task: Task) => task.id === item.id)
      if (result) it = result
    }

    const column = desk.find((column) => column.title === it.column)
    const columnIndex = desk.findIndex((column) => column.title === it.column)
    const task = column.items.find((task) => task.id === item.id)
    const taskIndex = column.items.findIndex((task) => task.id === item.id)

    if (task) {
      setDesk([
        ...desk.slice(0, columnIndex),
        {
          ...column,
          items: [
            ...column.items.slice(0, taskIndex),
            {
              ...task,
              isOpen: !task.isOpen,
            },
            ...column.items.slice(taskIndex + 1),
          ],
        },
        ...desk.slice(columnIndex + 1),
      ])
    }
  }

  const showCandidate = () => {
    const path = generatePath(RoutePaths.CANDIDATE_DETAILS, {
      id: item.candidate.id,
    })
    navigate(path)
  }

  return (
    <>
      <div
        className="w-full p-2 bg-gray-100 dark:bg-dark-300 rounded-lg cursor-pointer"
        onDrop={(e) => dropHandler(e, column, item)}
        onDragStart={(e) => dragStartHandler(e, column, item)}
        onDragOver={(e) => dragOverHandler(e)}
        draggable={true}
      >
        <div className="flex items-center gap-2" onClick={onClick}>
          <img
            draggable={false}
            src={isDarkTheme ? AvatarWhiteIcon : AvatarIcon}
            className="w-9 h-9"
          />
          <div>
            <div className="text-base text-gray-600 dark:text-white">
              {item.candidate.name + ' ' + item.candidate.surname}
            </div>
            <div className="text-xs text-gray-500">
              {item.candidate.position}
            </div>
          </div>
        </div>
        {item.isOpen && (
          <div className="flex flex-col gap-2 mt-2">
            <Button className="!py-2 !px-4 w-full" onClick={showCandidate}>
              {t('showCandidate')}
            </Button>
            <Button
              type="secondary"
              onClick={() => setIsOpenModal(true)}
              className="!py-2 !px-4 w-full border-red border text-red"
            >
              {t('deleteItem')}
            </Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title={t('attention')}
        body={t('deleteTaskDescription')}
        buttons={
          <>
            <Button
              isLoading={data.isLoading}
              textAlign="center"
              onClick={() => deleteItem({ id: item.id, vacancyId })}
            >
              {t('yes')}
            </Button>
            <Button
              textAlign="center"
              type="secondary"
              onClick={() => setIsOpenModal(false)}
            >
              {t('no')}
            </Button>
          </>
        }
      />
      <Modal
        isOpen={data.isSuccess}
        onClose={refetch}
        title={t('successTitle')}
        body={t('deleteTaskSuccess')}
      />
      <Modal
        isOpen={data.isError}
        onClose={refetch}
        title={t('failTitle')}
        body={t('failDescription')}
      />
    </>
  )
}

const ColumnItem: FunctionComponent<ColumnItemProps> = ({
  dropHandler,
  dragStartHandler,
  dragOverHandler,
  dropCardHandler,
  setDesk,
  refetch,
  column,
  desk,
}) => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)

  return (
    <div
      className="min-h-medium w-[12.5rem] rounded-lg bg-white p-3 dark:bg-dark-100"
      onDrop={(e) => dropCardHandler(e, column)}
      onDragOver={(e) => dragOverHandler(e)}
    >
      <div className="rounded-lg bg-gray-100 dark:bg-dark-300 mb-6">
        <div className={`h-1.5 ${column.color} rounded-t-lg`}></div>
        <div className="py-2 px-4 flex items-center border-x border-b border-gray-200 justify-between rounded-b-md">
          <div>{t(`stages.${column.title}`)}</div>
          <div className="w-6 h-7 bg-gray-200 dark:text-dark-300 flex items-center justify-center rounded-md">
            {column.items?.length || '0'}
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        {column?.items?.map((item) => (
          <TaskItem
            item={item}
            refetch={refetch}
            dropHandler={dropHandler}
            dragStartHandler={dragStartHandler}
            dragOverHandler={dragOverHandler}
            setDesk={setDesk}
            column={column}
            desk={desk}
          />
        ))}
      </div>
    </div>
  )
}

export default ColumnItem
