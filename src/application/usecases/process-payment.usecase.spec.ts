import { PaymentGatewayInterface } from '../contratcs/payment-gateway.interface'
import { ProcessPaymentUseCaseInterface } from '../contratcs/process-payment-usecase.interface'
import { ProcessPaymentUseCase } from './process-payment.usecase'
import { mock } from 'jest-mock-extended'

const fakeGateway = mock<PaymentGatewayInterface>()

describe('ProcessPaymentUseCase', () => {
  let sut: ProcessPaymentUseCase
  let input: ProcessPaymentUseCaseInterface.Input

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

    fakeGateway.processPayment.mockResolvedValue({
      status: 'approved',
      reason: undefined
    })
  })

  test('should call Payment Gateway once and with correct values', async () => {
    await sut.execute(input)

    expect(fakeGateway.processPayment).toHaveBeenCalledTimes(1)
    expect(fakeGateway.processPayment).toHaveBeenCalledWith(input)
  })

  test('should return a correct response of gateway', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      status: 'approved',
      reason: undefined
    })
  })
})
