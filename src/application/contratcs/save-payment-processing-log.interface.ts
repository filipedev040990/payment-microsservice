export interface SavePaymentLogProcessingUseCaseInterface {
  execute(input: SavePaymentLogProcessingUseCaseInterface.Input): Promise<void>
}

export namespace SavePaymentLogProcessingUseCaseInterface {
  export type Input = {
    input: string
    output: string
  }
}
