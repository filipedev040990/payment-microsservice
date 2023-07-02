import { PaymentGateayInterface } from '@/application/contratcs/payment-gateway.interface'

export class FakeyPaymentGateway implements PaymentGateayInterface {
  async processPayment (input: PaymentGateayInterface.Input): Promise<PaymentGateayInterface.Output> {
    const pairsNumbers = [0, 2, 4, 6, 8]
    const lastCardNumber = +input.creditCard.number.slice(-1)

    if (pairsNumbers.includes(lastCardNumber)) {
      return { status: 'approved' }
    }

    return { status: '' }
  }
}
