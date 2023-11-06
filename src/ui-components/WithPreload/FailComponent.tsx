import { FunctionComponent, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import { ReactComponent as AttentionIcon } from 'assets/svgs/attention.svg'
import { Button } from 'ui-components'

const FailComponent: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.uiComponents)

  return (
    <div className='flex flex-col justify-center items-center my-10 mx-4'>
      <AttentionIcon className='w-40 h-40 md:w-52 md:h-60' />
      <div className='text-center mb-8'>
        <div className='text-3xl mb-2'>{t('failTitle')}</div>
        <div>{t('failDescription')}</div>
      </div>
      <div>
        <Button onClick={() => location.reload()}>
          {t('tryAgain')}
        </Button>
      </div>
    </div>
  )
}

export default memo(FailComponent)
