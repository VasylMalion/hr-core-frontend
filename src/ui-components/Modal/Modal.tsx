import { FunctionComponent, ReactNode, useEffect, useRef } from "react"
import Button from "ui-components/Button/Button"

import { ReactComponent as CloseIcon } from "assets/svgs/close.svg"


type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  body: string | ReactNode
  buttons?: ReactNode
}

const Modal: FunctionComponent<ModalProps> = ({ isOpen, onClose, title, body, buttons }) => {

  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ onClose ]);

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed w-full h-full top-0 right-0 z-10 flex justify-center items-center bg-[#00000033]'>
      <div ref={modalRef} className='max-h-[80vh] max-w-[40rem] min-w-[20rem] min-h-[16rem] flex flex-col rounded-lg	border border-[#091e4214] bg-white'>
        <div className='p-[1.25rem] border-b border-b-[#091e4214] text-[20px] flex justify-between items-center'>
          {title}
          <CloseIcon className='w-[1rem] h-[1rem] cursor-pointer' onClick={onClose} />
        </div>
        <div className='p-[1.25rem] border-b border-b-[#091e4214] font-[ceraProLight] flex grow'>{body}</div>
        <div className='p-[1.25rem]'>
          {buttons || (
            <Button textAlign='center' className='mx-auto' onClick={onClose}>
              Ok
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
