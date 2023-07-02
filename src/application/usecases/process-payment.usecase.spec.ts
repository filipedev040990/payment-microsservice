import { PaymentGateayInterface } from '../contratcs/payment-gateway.interface'
import { ProcessPaymentUseCaseinterface } from '../contratcs/process-payment-usecase.interface'
import { ProcessPaymentUseCase } from './process-payment.usecase'
import { mock } from 'jest-mock-extended'

const fakeGateway = mock<PaymentGateayInterface>()

describe('ProcessPaymentUseCase', () => {
  let sut: ProcessPaymentUseCase
  let input: ProcessPaymentUseCaseinterface.Input

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(fakeGateway)

    input = {
      payer: {
        name: 'Any Payer',
        document: 'anyDocument'
      },
      creditCard: {
        brand: 'anyBrand',
        number: 'anyNumber',
        cvv: 'anyCvv',
        expiration: '2023-12'
      }
    }
  })

  test('should call Payment Gateway once and with correct values', async () => {
    await sut.execute(input)

    expect(fakeGateway.processPayment).toHaveBeenCalledTimes(1)
    expect(fakeGateway.processPayment).toHaveBeenCalledWith(input)
  })
})