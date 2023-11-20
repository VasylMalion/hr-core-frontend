import 'whatwg-fetch'
import '@testing-library/jest-dom'
import { server } from './mockHttpServer'
import { setupStore } from '../../src/store/store'

const store = setupStore({})

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => server.close())
