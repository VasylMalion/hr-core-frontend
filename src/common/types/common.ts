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

export type Candidate = {
  id: number
  avatar: string
  name: string
  surname: string
  birthDate: string
  rating: number
  stages: Stage,
  createdAt: string,
  appliedAt: string,
  owner: number
}

export type Job = {
  id: number
  img: string
  createdAt: string,
  type: string
  position: string
  location: string
  description: string
  candidatesCount: number
}

export type UserInfo = {
  email: string,
  phone: string,
  name: string
  surname: string
  birthDate: Date 
  gender: string 
  address: string 
  department: string 
  position: string 
  role: string 
  startDate: Date 
}

export enum GenderTypes {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}