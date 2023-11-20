import { FunctionComponent, ReactNode, useEffect, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from 'assets/svgs/CloseIcon'
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
    const handleClickOutside = (event: Event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed w-full h-full top-0 right-0 z-20 flex justify-center items-center bg-gray-300'>
      <div
        ref={modalRef}
        className='
          max-h-[80vh] max-w-[40rem] min-w-[18rem] min-h-[15rem] m-8
          flex flex-col rounded-lg border border-gray-300 bg-white
          dark:text-white dark:bg-dark-200 dark:border-gray-200
        '
      >
        <div
          className='p-5 border-b border-b-gray-300 dark:border-b-white text-xl flex justify-between items-center'
        >
          {title}
          <CloseIcon className='w-4 h-4 cursor-pointer fill-current dark:fill-white' onClick={onClose} />
        </div>
        <div className='p-5 border-b border-b-gray-300 dark:border-b-white font-[ceraProLight] flex grow'>
          {body}
        </div>
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
