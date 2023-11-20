import { FunctionComponent, ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  TranslationNamespace,
  addTranslationNamespace,
} from 'common/translations'
import NoResultIcon from 'assets/svgs/NoResultIcon'

import emptyListEn from './EmptyList_en.json'
import emptyListUa from './EmptyList_en.json'

type EmptyListProps = {
  className?: ReactNode
}

const EmptyList: FunctionComponent<EmptyListProps> = ({ className }) => {
  const { t } = useTranslation(TranslationNamespace.emptyList)

  return (
    <div
      className={`${className} flex flex-col justify-center items-center my-10 mx-4 dark:text-white`}
      data-testid="empty-list"
    >
      <NoResultIcon className="w-40 h-40 md:w-52 md:h-52 stroke-black dark:stroke-white" />
      <div className="text-center mb-8">
        <div className="text-3xl mb-2">{t('sorry')}</div>
        <div>{t('noResult')}</div>
      </div>
    </div>
  )
}

export default memo(EmptyList)

addTranslationNamespace(
  TranslationNamespace.emptyList,
  emptyListEn,
  emptyListUa
)
