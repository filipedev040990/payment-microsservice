import 'module-alias/register'
import { app } from './app'
import { consumeQueuePaymentsToProcess } from './queue/consume-payment-to-process.queue'

const start = async (): Promise<void> => {
  try {
    const port = process.env.PORT ?? 3000
    app.listen(port, () => console.log(`Server running at port ${port}`))

    await consumeQueuePaymentsToProcess()
  } catch (error) {
    console.log(error)
  }
}

void start()
