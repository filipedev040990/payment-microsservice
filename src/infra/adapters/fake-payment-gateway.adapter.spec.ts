import { PaymentGatewayInterface } from '@/application/contratcs/payment-gateway.interface'
import { FakeyPaymentGateway } from './fake-payment-gateway.adapter'

describe('FakeyPaymentGateway', () => {
  let sut: FakeyPaymentGateway
  let input: PaymentGatewayInterface.Input

  beforeEach(() => {
    sut = new FakeyPaymentGateway()

    input = {
      payer: {
        name: 'Any Payer',
        document: 'anyDocument'
      },
      creditCard: {
        brand: 'master',
        number: '5533810961168330',
        cvv: '286',
        expiration: '2024-12'
      }
    }
  })

  test('should return approved if last card number is even', async () => {
    expect(await sut.processPayment(input)).toEqual({ status: 'approved' })
  })

  test('should return refused and reason if last card number is not even', async () => {
    input.creditCard.number = '5533810961168331'

    expect(await sut.processPayment(input)).toEqual({ status: 'refused', reason: 'Saldo insuficiente' })
  })
})
