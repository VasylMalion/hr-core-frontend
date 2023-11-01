import { FunctionComponent, ReactNode, useEffect, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as CloseIcon } from 'assets/svgs/close.svg'
import { TranslationNamespace } from 'common/translations'
import { Button } from 'ui-components'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  body: string | ReactNode
  buttons?: ReactNode
}

const Modal: FunctionComponent<ModalProps> = ({ isOpen, onClose, title, body, buttons }) => {
  const { t } = useTranslation(TranslationNamespace.uiComponents)

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
  }, [onClose]);

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed w-full h-full top-0 right-0 z-20 flex justify-center items-center bg-gray-300'>
      <div
        ref={modalRef}
        className='
          max-h-[80vh] max-w-[40rem] min-w-[20rem] min-h-[15rem]
          flex flex-col rounded-lg border border-gray-300 bg-white
        '
      >
        <div className='p-5 border-b border-b-gray-300 text-xl flex justify-between items-center'>
          {title}
          <CloseIcon className='w-4 h-4 cursor-pointer' onClick={onClose} />
        </div>
        <div className='p-5 border-b border-b-gray-300 font-[ceraProLight] flex grow'>{body}</div>
        <div className='p-5'>
          {buttons ? (
            <div className='flex justify-center'>
              {buttons}
            </div>
          ) : (
            <Button textAlign='center' className='mx-auto' onClick={onClose}>
              {t('ok')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
