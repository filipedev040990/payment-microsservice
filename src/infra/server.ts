import 'module-alias/register'
import { app } from './app'

const start = async (): Promise<void> => {
  try {
    const port = process.env.PORT ?? 3000
    app.listen(port, () => console.log(`Server running at port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

void start()
