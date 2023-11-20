import { Candidate, UserInfo, Vacancy, VacancyStatus } from './types/common'

export const userMock: UserInfo = {
  id: '1',
  email: 'test@example.com',
  phone: '+1234567890',
  name: 'John',
  surname: 'Doe',
  birthDate: new Date('1990-05-14T10:00:00.000Z'),
  gender: 'MALE',
  address: '123 Main Street',
  department: 'Engineering',
  position: 'Software Developer',
  mobileNumber: '+1234567890',
  role: 'USER',
  startDate: new Date('2018-07-01T10:00:00.000Z'),
}

export const adminMock: UserInfo = {
  ...userMock,
  role: 'ADMIN',
}

export const mockCandidate: Candidate = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  birthDate: new Date('1990-05-14T10:00:00.000Z'),
  gender: 'MALE',
  email: 'john@example.com',
  mobileNumber: '+1234567890',
  location: 'Some City',
  position: 'Software Developer',
  salary: 50000,
}

export const authSliceMock = {
  userToken: 'qwewqe',
  userInfo: userMock,
  isCollapsed: false,
  success: true,
  loading: false,
  error: '',
}

export const authSliceAdminMock = {
  userToken: 'qwewqe',
  userInfo: adminMock,
  isCollapsed: false,
  success: true,
  loading: false,
  error: '',
}

export const mockCandidatesSmall = {
  candidates: [
    mockCandidate,
    {
      ...mockCandidate,
      id: 2,
      surname: 'Doe2',
    },
    {
      ...mockCandidate,
      id: 3,
      surname: 'Doe3',
    },
  ],
  count: 1,
}

export const mockCandidatesLarge = {
  candidates: [
    mockCandidate,
    {
      ...mockCandidate,
      id: 2,
      surname: 'Doe2',
    },
    {
      ...mockCandidate,
      id: 3,
      surname: 'Doe3',
    },
  ],
  count: 3,
}

const mockVacancy = {
  id: 1,
  type: 'Full-time',
  position: 'Software Engineer',
  location: 'New York',
  department: 'Engineering',
  description: 'Join our talented team as a Software Engineer!',
  candidatesCount: 5,
  status: VacancyStatus.ACTIVE,
  createdBy: {
    id: '123',
    name: 'John',
    surname: 'Doe',
  },
  assignedTo: {
    id: '456',
    name: 'Alice',
    surname: 'Smith',
  },
  createdAt: '2023-11-07T13:49:44.126Z',
  updatedAt: '2023-11-07T13:49:44.126Z',
  salaryMin: 80000,
  salaryMax: 120000,
  deadlineDate: '2023-11-15T22:00:00.000Z',
  desk: '654a4077cbe7b00a842c8b08',
}

export const mockVacanciesShort = {
  vacancies: [
    mockVacancy,
    {
      ...mockVacancy,
      id: 2,
      position: 'Software Engineer 2',
      location: 'New York 2',
      description: 'Join our talented team as a Software Engineer! 2',
    },
    {
      ...mockVacancy,
      id: 3,
      position: 'Software Engineer 3',
      location: 'New York 3',
      description: 'Join our talented team as a Software Engineer! 3',
    },
  ],
  count: 1,
}

export const mockVacanciesLarge = {
  vacancies: [
    mockVacancy,
    {
      ...mockVacancy,
      id: 2,
      position: 'Software Engineer 2',
      location: 'New York 2',
      description: 'Join our talented team as a Software Engineer! 2',
    },
    {
      ...mockVacancy,
      id: 3,
      position: 'Software Engineer 3',
      location: 'New York 3',
      description: 'Join our talented team as a Software Engineer! 3',
    },
    {
      ...mockVacancy,
      id: 3,
      position: 'Software Engineer 4',
      location: 'New York 4',
      description: 'Join our talented team as a Software Engineer! 4',
    },
  ],
  count: 2,
}

export const mockEmployeesShort = {
  users: [
    userMock,
    {
      ...userMock,
      id: 2,
      surname: 'Doe 2'
    },
    {
      ...userMock,
      id: 3,
      surname: 'Doe 3'
    },
  ],
  count: 1,
}

export const mockEmployeesLarge = {
  users: [
    userMock,
    {
      ...userMock,
      id: 2,
      surname: 'Doe 2'
    },
    {
      ...userMock,
      id: 3,
      surname: 'Doe 3'
    },
    {
      ...userMock,
      id: 4,
      surname: 'Doe 3'
    },
  ],
  count: 2,
}
