export enum Lang {
  en = 'en',
  ua = 'ua',
}

export enum Stage {
  SHORTLIST = 'SHORTLIST',
  PREINTERVIEW = 'PREINTERVIEW',
  INTERVIEW = 'INTERVIEW',
  TEST = 'TEST',
  APPLIED = 'APPLIED',
  NOT_APPLIED = 'NOT_APPLIED',
}

export type Task = {
  id: string
  candidate: Candidate
  column: Stage
  isOpen?: boolean
}

export type Desk = {
  _id: string
  tasks: Array<Task>
}

export type Vacancy = {
  id: number
  type: string
  position: string
  location: string
  department: string
  description: string
  candidatesCount: number
  status: VacancyStatus
  createdBy: {
    id: string
    name: string
    surname: string
  }
  assignedTo: {
    id: string
    name: string
    surname: string
  }
  createdAt: Date
  updatedAt: Date
  salaryMin: number
  salaryMax: number
  deadlineDate: Date
  desk: Desk
}

export type Column = {
  id: number
  title: string
  items: Array<Task>
}

export enum VacancyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type UserInfo = {
  id: string
  email: string,
  phone: string,
  name: string
  surname: string
  birthDate: Date 
  gender: string 
  address: string 
  department: string 
  position: string 
  mobileNumber: string
  role: string 
  startDate: Date 
}

export type Candidate = {
  id: string
  name: string
  birthDate: Date 
  gender: string 
  email: string,
  mobileNumber: string
  location: string 
  position: string 
  salary: number
}

export type Status = {
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
}

export enum GenderTypes {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}