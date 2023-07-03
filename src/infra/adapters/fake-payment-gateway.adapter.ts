import { PaymentGatewayInterface } from '@/application/contratcs/payment-gateway.interface'

export class FakeyPaymentGateway implements PaymentGatewayInterface {
  async processPayment (input: PaymentGatewayInterface.Input): Promise<PaymentGatewayInterface.Output> {
    const pairsNumbers = [0, 2, 4, 6, 8]
    const lastCardNumber = +input.creditCard.number.slice(-1)

    if (pairsNumbers.includes(lastCardNumber)) {
      return { status: 'approved' }
    }

    return { status: 'refused', reason: 'Saldo insuficiente' }
  }
}
