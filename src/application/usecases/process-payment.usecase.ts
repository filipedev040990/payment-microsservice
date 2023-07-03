import { PaymentGatewayInterface } from '../contratcs/payment-gateway.interface'
import { ProcessPaymentUseCaseInterface } from '../contratcs/process-payment-usecase.interface'

export class ProcessPaymentUseCase implements ProcessPaymentUseCaseInterface {
  constructor (private readonly paymentGateway: PaymentGatewayInterface) {}
  async execute (input: ProcessPaymentUseCaseInterface.Input): Promise<ProcessPaymentUseCaseInterface.Output> {
    return await this.paymentGateway.processPayment(input)
  }
}
