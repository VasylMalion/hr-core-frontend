import { FunctionComponent, DragEvent, useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import Avatarcon from 'assets/images/avatar.png'
import { Task, Column } from 'common/types/common'
import { Button, Modal } from 'ui-components'
import { RoutePaths } from 'containers/AppRouter'
import { useDeleteTaskMutation } from 'services/VacancyService'

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

const Task: FunctionComponent<TaskProps> = 
  ({ item, desk, refetch, setDesk, column, dropHandler, dragStartHandler, dragOverHandler, }) => {
  const { t } = useTranslation(TranslationNamespace.vacancyDetails)
  const { id: vacancyId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState<boolean>()
  const [deleteItem, data] = useDeleteTaskMutation()

  const onClick = () => {
    let it: Task = null

    for (let index = 0; index < desk.length; ++index) {
      const result = desk[index].items.find((task: Task) => task.id === item.id)
      if (result) it = result
    }

    const column = desk.find(column => column.title === it.column)
    const columnIndex = desk.findIndex(column => column.title === it.column)

    const task = column.items.find(task => task.id === item.id)
    const taskIndex = column.items.findIndex(task => task.id === item.id)

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
          ]
        },
        ...desk.slice(columnIndex + 1),
      ])
    }
  }

  const showCandidate = () => {
    const path = generatePath(RoutePaths.CANDIDATE_DETAILS, { id: item.candidate.id })
    navigate(path)
  }

  return (
    <>
      <div className='w-full p-2 bg-[#FAFBFC] rounded-[10px] cursor-pointer'
        onDrop={(e) => dropHandler(e, column, item)}
        onDragStart={(e) => dragStartHandler(e, column, item)}
        onDragOver={(e) => dragOverHandler(e)}
        draggable={true}
      >
        <div className='flex items-center gap-2' onClick={onClick}>
          <img src={Avatarcon} className='w-[38px] h-[38px]' />
          <div>
            <div className='text-[1rem] text-[#333333]'>{item.candidate.name}</div>
            <div className='text-[12px] text-[#6F767E]'>{item.candidate.position}</div>
          </div>
        </div>
        {
          item.isOpen && (
            <div className='flex flex-col gap-2 mt-2'>
              <Button className='!py-2 !px-4 w-full' onClick={showCandidate}>
                {t('showCandidate')}
              </Button>
              <Button
                type='secondary'
                onClick={() => setIsOpenModal(true)}
                className='!py-2 !px-4 w-full border-red border-[1px] text-red'
              >
                {t('deleteItem')}
              </Button>
            </div>
          )
        }
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
              textAlign='center'
              onClick={() => deleteItem({ id: item.id, vacancyId })}
            >
              {t('yes')}
            </Button>
            <Button
              textAlign='center'
              type='secondary'
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
    <div className='min-h-[30rem] bg-red w-[200px] rounded-[10px] bg-white p-[10px]'
      onDrop={(e) => dropCardHandler(e, column)}
      onDragOver={(e) => dragOverHandler(e)}
    >
      <div className="rounded-[10px] bg-[#FAFBFC] mb-6">
        <div className='h-[6px] bg-red rounded-t-[10px]'></div>
        <div className="py-[0.5rem] px-[1rem] flex items-center border-x border-b border-[#EFEFEF] justify-between rounded-b-[5px]">
          <div>{t(`stages.${column.title}`)}</div>
          <div className='w-[25px] h-[28px] bg-[#EFEFEF] flex items-center justify-center rounded-[5px]'>
            {column.items?.length}
          </div>
        </div>
      </div>
      <div className='grid gap-2'>
        {column?.items?.map(item => <Task
          item={item}
          refetch={refetch}
          dropHandler={dropHandler}
          dragStartHandler={dragStartHandler}
          dragOverHandler={dragOverHandler}
          setDesk={setDesk}
          column={column}
          desk={desk}
        />)}
      </div>
    </div>
  )
}

export default ColumnItem