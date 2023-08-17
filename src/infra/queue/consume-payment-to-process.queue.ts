import { ProcessPaymentUseCase } from '@/application/usecases/process-payment.usecase'
import { FakeyPaymentGateway } from '../adapters/fake-payment-gateway.adapter'
import { RabbitmqAdapter } from '../adapters/rabbitmq.adapter'
import config from '../config'
import { ProcessPaymentUseCaseInterface } from '@/application/contratcs/process-payment-usecase.interface'
import { PaymentProcessingLogRepository } from '../database/repositories/payment-processing-log.repository'
import { SavePaymentLogProcessingUseCase } from '@/application/usecases/save-payment-log-processing.usecase'
import { UUIDGenerator } from '../adapters/uuid-generator.adapter'
import axios from 'axios'
import { GetTokenUseCase } from '@/application/usecases/get-token.usecase'
import { NodeCacheAdapter } from '../adapters/nodeCache.adapter'

type DecryptedCard = {
  data: {
    brand: string
    number: string
    cvv: string
    expiryYear: string
    expiryMonth: string
  }
}

export const consumeQueuePaymentsToProcess = async (): Promise<void> => {
  const queue = new RabbitmqAdapter(config.rabbitmq.uri)
  const logRepository = new PaymentProcessingLogRepository()
  const uuidGenerator = new UUIDGenerator()
  const savePaymentLogUseCase = new SavePaymentLogProcessingUseCase(uuidGenerator, logRepository)

  await queue.start()

  await queue.consume('payment_to_process', async (message: any) => {
    const payment = JSON.parse(message.content.toString())
    const paymentGateway = new FakeyPaymentGateway()
    const processPayment = new ProcessPaymentUseCase(paymentGateway)

    const processPaymentInput = await makeProcessPaymentInput(payment)

    let paymentProcessed: ProcessPaymentUseCaseInterface.Output
    let output: string

    try {
      paymentProcessed = await processPayment.execute(processPaymentInput)

      output = JSON.stringify(paymentProcessed)

      const queuePayload = makeQueuePayload(payment, paymentProcessed, uuidGenerator)

      await queue.publish('payments', 'payment_processed', JSON.stringify(queuePayload))
    } catch (error) {
      console.log(error)
      output = JSON.stringify(error)
    }

    await savePaymentLogUseCase.execute({
      input: JSON.stringify(payment),
      output
    })
  })
}

const makeProcessPaymentInput = async (payment: any): Promise<any> => {
  const credentials = {
    appId: config.application.appId,
    secretKey: config.application.secretKey
  }

  const cache = new NodeCacheAdapter()

  const getTokenUseCase = new GetTokenUseCase(credentials, cache)

  const token = await getTokenUseCase.execute(config.cache.cardEncryptorKey)

  const externalIdentifier: string = payment.creditCard.externalIdentifier

  const options = {
    method: 'get',
    url: `${config.cardEncryptorUrl}/card/${externalIdentifier}`,
    headers: { authorization: `Bearer ${token}` }
  }

  const decryptedCard: DecryptedCard = await axios(options)

  return {
    payer: {
      name: payment.payer.name,
      document: payment.payer.document
    },
    creditCard: {
      brand: decryptedCard.data.brand,
      number: decryptedCard.data.number,
      cvv: decryptedCard.data.cvv,
      expiration: `${decryptedCard.data.expiryYear}-${decryptedCard.data.expiryMonth}`
    }
  }
}

const makeQueuePayload = (payment: any, paymentProcessed: any, uuidGenerator: UUIDGenerator): any => ({
  identifier: uuidGenerator.generate(),
  status: paymentProcessed.status,
  reason: paymentProcessed.reason ?? undefined,
  charge: {
    id: payment.charge.id,
    clientId: payment.charge.clientId,
    payerId: payment.charge.payerId,
    totalValue: payment.charge.totalValue,
    paymentMethod: payment.charge.paymentMethod
  },
  client: {
    id: payment.client.id,
    identifier: payment.client.identifier,
    name: payment.client.name,
    email: payment.client.email,
    document: payment.client.document,
    birthDate: payment.client.birthDate,
    phoneNumber: payment.client.phoneNumber
  },
  payer: {
    id: payment.payer.id,
    personType: payment.payer.personType,
    name: payment.payer.name,
    email: payment.payer.email,
    document: payment.payer.document,
    phoneNumber: payment.payer.phoneNumber,
    cep: payment.payer.cep,
    street: payment.payer.street,
    number: payment.payer.number,
    complement: payment.payer.complement,
    neighborhood: payment.payer.neighborhood,
    city: payment.payer.city,
    state: payment.payer.state
  },
  creditCard: {
    id: payment.creditCard.id,
    payerId: payment.creditCard.payerId,
    externalIdentifier: payment.creditCard.externalIdentifier
  }
})
