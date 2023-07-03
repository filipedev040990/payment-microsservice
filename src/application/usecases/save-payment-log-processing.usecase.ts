import { SavePaymentLogProcessingUseCaseInterface } from '../contratcs/save-payment-processing-log.interface'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'

export class SavePaymentLogProcessingUseCase implements SavePaymentLogProcessingUseCaseInterface {
  constructor (private readonly uuidGenerator: UUIDGeneratorInterface) {}
  async execute (input: SavePaymentLogProcessingUseCaseInterface.Input): Promise<void> {
    this.uuidGenerator.generate()
  }
}
