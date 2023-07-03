import { mock } from 'jest-mock-extended'
import { SavePaymentLogProcessingUseCaseInterface } from '../contratcs/save-payment-processing-log.interface'
import { SavePaymentLogProcessingUseCase } from './save-payment-log-processing.usecase'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'

const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SavePaymentLogProcessingUseCase', () => {
  let sut: SavePaymentLogProcessingUseCase
  let input: SavePaymentLogProcessingUseCaseInterface.Input

  beforeAll(() => {
    sut = new SavePaymentLogProcessingUseCase(uuidGenerator)

    input = {
      input: 'anyInput',
      output: 'anyOutput'
    }
  })

  test('should call uuidGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
