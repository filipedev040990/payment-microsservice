import { SavePaymentLogProcessingRepositoryInterface } from '../contratcs/payment-processing-log-repository'
import { SavePaymentLogProcessingUseCaseInterface } from '../contratcs/save-payment-processing-log-usecase.interface'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'

export class SavePaymentLogProcessingUseCase implements SavePaymentLogProcessingUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SavePaymentLogProcessingRepositoryInterface
  ) {}

  async execute (input: SavePaymentLogProcessingUseCaseInterface.Input): Promise<void> {
    await this.repository.savePaymentProcessingLog({
      id: this.uuidGenerator.generate(),
      input: input.input,
      output: input.output,
      createdAt: new Date()
    })
  }
}
