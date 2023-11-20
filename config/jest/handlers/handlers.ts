import { handlers as candidateHandlers } from './candidateHandlers'
import { handlers as vacancyHandlers } from './vacancyHandlers'

export const handlers = [...candidateHandlers, ...vacancyHandlers]
