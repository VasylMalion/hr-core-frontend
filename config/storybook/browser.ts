import { setupServer } from 'msw/node'
import { handlers } from '../jest/handlers/handlers'

export const worker = setupServer(...handlers)
