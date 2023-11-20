export const mockTranslations = jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))

export const mockNavigation = (fn: jest.Mock) =>
  jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => fn,
  }))

export const mockRedux = jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as any),
  useDispatch: () => jest.fn(),
}))

export const mockUuid = jest.mock('uuid', () => ({ v4: () => jest.fn() }))
