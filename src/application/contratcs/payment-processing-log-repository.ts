export interface PaymentLogProcessingRepositoryInterface {
  savePaymentProcessingLog (input: PaymentLogProcessingRepositoryInterface.Input): Promise<void>
}

export namespace PaymentLogProcessingRepositoryInterface{
  export type Input = {
    id: string
    input: string
    output: string
    createdAt: Date
  }
}
