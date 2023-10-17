import i18n from "../i18n";
import { Lang } from "./types/common";

export enum TranslationNamespace {
  common = 'common',
  navbar = 'navbar',
  header = 'header',
  candidates = 'candidates',
  vacancies = 'vacancies',
  vacancyDetails = 'vacancyDetails',
  vacancyAdding = 'vacancyAdding',
  login = 'login',
  profile = 'profile',
  employeesList = 'employeesList',
  employeeAdding = 'employeeAdding',
  employeeDetails = 'employeeDetails',
}

export const addTranslationNamespace = (namespace: TranslationNamespace, langEn: {}, langUa: {}) => {
  i18n.addResourceBundle(Lang.en, namespace, langEn, true)
  i18n.addResourceBundle(Lang.ua, namespace, langUa, true)
}
