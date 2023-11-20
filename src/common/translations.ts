import i18n from '../i18n'
import { Lang } from './types/common'

export enum TranslationNamespace {
  common = 'common',
  uiComponents = 'uiComponents',
  validation = 'validation',
  navbar = 'navbar',
  header = 'header',
  dashboard = 'dashboard',
  candidates = 'candidates',
  candidateAdding = 'candidateAdding',
  candidateDetails = 'candidateDetails',
  vacancies = 'vacancies',
  vacancyDetails = 'vacancyDetails',
  vacancyAdding = 'vacancyAdding',
  login = 'login',
  profile = 'profile',
  employees = 'employees',
  employeeAdding = 'employeeAdding',
  employeeDetails = 'employeeDetails',
  emptyList = 'emptyList',
}

export const addTranslationNamespace = (
  namespace: TranslationNamespace,
  langEn: {},
  langUa: {}
) => {
  i18n.addResourceBundle(Lang.en, namespace, langEn, true)
  i18n.addResourceBundle(Lang.ua, namespace, langUa, true)
}
