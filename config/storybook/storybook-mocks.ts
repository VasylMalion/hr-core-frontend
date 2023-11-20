import { setupWorker } from 'msw'

const worker = setupWorker()

export const mswDecorator = (Story: () => any) => {
  worker.start()

  return Story()
}
