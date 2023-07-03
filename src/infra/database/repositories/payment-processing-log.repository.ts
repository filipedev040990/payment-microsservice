import { SavePaymentLogProcessingRepositoryInterface } from '@/application/contratcs/payment-processing-log-repository'
import { prismaClient } from '../prisma-client.repository'

export class PaymentProcessingLogRepository implements SavePaymentLogProcessingRepositoryInterface {
  async savePaymentProcessingLog (input: SavePaymentLogProcessingRepositoryInterface.Input): Promise<void> {
    await prismaClient.paymentLogs.create({ data: input })
  }
}
