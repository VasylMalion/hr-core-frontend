import { FunctionComponent, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { TranslationNamespace } from 'common/translations'
import { FieldError } from 'common/types/common'

type FieldErrorsProps = {
  isValid: boolean
  errors?: Array<FieldError>
}

const FieldErrors: FunctionComponent<FieldErrorsProps> = ({ isValid, errors }) => {
  const { t } = useTranslation(TranslationNamespace.validation)

  const errorsList = !isValid && errors?.map(item => {
    if (Array.isArray(item)) {
      return <div>{t(item[0], { value: item[1] })}</div>
    }
    return <div>{t(item)}</div>
  })

  return <div className='text-red text-sm'>{errorsList}</div>
}

export default memo(FieldErrors)
