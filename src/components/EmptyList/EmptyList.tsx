import { FunctionComponent, ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace, addTranslationNamespace } from 'common/translations'
import { ReactComponent as NoResultIcon } from 'assets/svgs/no-result.svg'

import emptyListEn from './EmptyList_en.json'
import emptyListUa from './EmptyList_en.json'

type EmptyListProps = {
  className?: ReactNode
}

const EmptyList: FunctionComponent<EmptyListProps> = ({ className }) => {

  const { t } = useTranslation(TranslationNamespace.emptyList)

  return (
    <div className={`${className} flex flex-col justify-center items-center my-10 mx-4`}>
      <NoResultIcon className='w-[10rem] h-[10rem] md:w-[13rem] md:h-[13rem]' />
      <div className='text-center mb-8'>
        <div className='text-[2rem] mb-2'>{t('sorry')}</div>
        <div>{t('noResult')}</div>
      </div>
    </div>
  )
}

export default memo(EmptyList)

addTranslationNamespace(TranslationNamespace.emptyList, emptyListEn, emptyListUa)