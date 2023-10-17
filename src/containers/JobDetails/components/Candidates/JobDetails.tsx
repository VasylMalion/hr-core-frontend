import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent, useState } from "react";
import Typography from "ui-components/Typography/Typography";

import jobDetailsEn from './JobDetails_en.json'
import jobDetailsUa from './JobDetails_ua.json'
// import { GetAllJobsQuery } from "services/JobService";
import TabNavigation from "ui-components/TabOptions/TabNavigation";
import { useTranslation } from "react-i18next";
import Avatarcon from "assets/images/avatar.png"

type CardProps = {
  dropHandler: any
  dragStartHandler: any
  dragEndHandler: any
  dragOverHandler: any
  item: any
}

type BoardProps = {
  id: number
  title: string
  items: Array<{
    id: number
    title: string
  }>
  dropHandler: any
  dragStartHandler: any
  dragEndHandler: any
  dragOverHandler: any
  dropCardHandler: any
  board: any
}

const Candidates: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.jobDetails)

  const [boardsMock, setBoardsMock] = useState([
    { id: 1, title: '1', items: [{ id: 1, title: '1' }, { id: 2, title: '2' }, { id: 3, title: '3' }] },
    { id: 2, title: '2', items: [{ id: 10, title: '1wqeq' }, { id: 20, title: '2' }, { id: 30, title: '3' }] },
    { id: 3, title: '3', items: [{ id: 11, title: '1' }, { id: 21, title: '2' }, { id: 31, title: '3qwe' }] },
    { id: 4, title: '4', items: [{ id: 12, title: '1' }, { id: 22, title: '2wqe' }, { id: 32, title: '3' }] },
    { id: 5, title: '5', items: [{ id: 13, title: '1qwe' }, { id: 23, title: '2' }, { id: 33, title: '3' }] },
    { id: 6, title: '6', items: [{ id: 14, title: '1' }, { id: 25, title: '2' }, { id: 36, title: '3' }] },
  ])

  const dropHandler = (e: Event, board: any, item: any) => {
    e.stopPropagation()
    const index = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(index, 1)

    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex, 0, currentItem)

    setBoardsMock(boardsMock.map(b => {

      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }

      return b
    }))
  }

  const dragStartHandler = (e: Event, board: any, item: any) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  const dragEndHandler = (e: Event) => { }

  const dragOverHandler = (e: Event) => {
    e.preventDefault()
  }

  const dropCardHandler = (e: Event, board: any) => {
    e.stopPropagation()
    board.items.push(currentItem)
    const index = currentBoard.items.indexOf(currentItem)

    currentBoard.items.splice(index, 1)

    setBoardsMock(boardsMock.map(b => {

      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }

      return b
    }))
  }

  const [currentBoard, setCurrentBoard] = useState<{
    id: number
    title: string
    items: Array<{
      id: number
      title: string
    }>
  }>(null)
  const [currentItem, setCurrentItem] = useState<{ id: number, title: string }>(null)

  // border: 1px solid #D3D3D3;
  // border-top: none;
  // border-radius: 0 0px 5px 5px;

  const Board: FunctionComponent<BoardProps> = ({ id, title, items, dropHandler,
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropCardHandler,
    board, }) => (
    <div className='min-h-[30rem] bg-red w-[200px] rounded-[10px] bg-white p-[10px]'
      onDrop={(e) => dropCardHandler(e, board)}
      onDragOver={(e) => dragOverHandler(e)}
    >
      <div className="rounded-[10px] bg-[#FAFBFC] mb-6">
        <div className='h-[6px] bg-red rounded-t-[10px]'></div>
        <div className="py-[0.5rem] px-[1rem] flex items-center border-x border-b border-[#EFEFEF] justify-between rounded-b-[5px]">
          <div>{title}</div>
          <div className='w-[25px] h-[28px] bg-[#EFEFEF] flex items-center justify-center rounded-[5px]'>{items.length}</div>
        </div>
      </div>
      <div className='grid gap-2'>
        {items.map(item => (
          <div className='w-full p-2 bg-[#FAFBFC] rounded-[10px]'
            onDrop={(e) => dropHandler(e, board, item)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            draggable={true}
          >
            <div className='flex items-center gap-2'>
              <img src={Avatarcon} className='w-[38px] h-[38px]' />
              <div>
                <div className='text-[1rem] text-[#333333]'>{item.title}</div>
                <div className='text-[12px] text-[#6F767E]'>UI/UX Designer</div>
              </div>
            </div>
          </div>
        )
        )}
      </div>
    </div>
  )

  const boards = boardsMock.map(item => <Board
    id={item.id}
    title={item.title}
    items={item.items}
    dropHandler={dropHandler}
    dragStartHandler={dragStartHandler}
    dragEndHandler={dragEndHandler}
    dragOverHandler={dragOverHandler}
    dropCardHandler={dropCardHandler}
    board={item}
  />)


  return <div className='my-6 '>
    <div className='grid overflow-x-auto grid-flow-col gap-6'>
      {boards}
    </div>
  </div>
}

export default Candidates

addTranslationNamespace(TranslationNamespace.jobDetails, jobDetailsEn, jobDetailsUa)
