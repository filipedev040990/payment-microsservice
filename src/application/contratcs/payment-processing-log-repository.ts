export interface SavePaymentLogProcessingRepositoryInterface {
  savePaymentProcessingLog (input: SavePaymentLogProcessingRepositoryInterface.Input): Promise<void>
}

export namespace SavePaymentLogProcessingRepositoryInterface{
  export type Input = {
    id: string
    input: string
    output: string
    createdAt: Date
  }
}
