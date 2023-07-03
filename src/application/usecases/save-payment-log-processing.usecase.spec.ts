import { mock } from 'jest-mock-extended'
import { SavePaymentLogProcessingUseCaseInterface } from '../contratcs/save-payment-processing-log-usecase.interface'
import { SavePaymentLogProcessingUseCase } from './save-payment-log-processing.usecase'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'
import { PaymentLogProcessingRepositoryInterface } from '../contratcs/payment-processing-log-repository'
import MockDate from 'mockdate'

const uuidGenerator = mock<UUIDGeneratorInterface>()
const repository = mock<PaymentLogProcessingRepositoryInterface>()

describe('SavePaymentLogProcessingUseCase', () => {
  let sut: SavePaymentLogProcessingUseCase
  let input: SavePaymentLogProcessingUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SavePaymentLogProcessingUseCase(uuidGenerator, repository)

    input = {
      input: 'anyInput',
      output: 'anyOutput'
    }

    uuidGenerator.generate.mockReturnValue('anyUuid')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call uuidGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call repository.savePaymentProcessingLog once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.savePaymentProcessingLog).toHaveBeenCalledTimes(1)
    expect(repository.savePaymentProcessingLog).toHaveBeenCalledWith({
      id: 'anyUuid',
      input: 'anyInput',
      output: 'anyOutput',
      createdAt: new Date()
    })
  })
})
