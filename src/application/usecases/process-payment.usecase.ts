import { PaymentGateayInterface } from '../contratcs/payment-gateway.interface'
import { ProcessPaymentUseCaseinterface } from '../contratcs/process-payment-usecase.interface'

export class ProcessPaymentUseCase implements ProcessPaymentUseCaseinterface {
  constructor (private readonly paymentGateway: PaymentGateayInterface) {}
  async execute (input: ProcessPaymentUseCaseinterface.Input): Promise<ProcessPaymentUseCaseinterface.Output> {
    return await this.paymentGateway.processPayment(input)
  }
}
