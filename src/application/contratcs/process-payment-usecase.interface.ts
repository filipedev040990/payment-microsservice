export interface ProcessPaymentUseCaseInterface {
  execute (input: ProcessPaymentUseCaseInterface.Input): Promise<ProcessPaymentUseCaseInterface.Output>
}

export namespace ProcessPaymentUseCaseInterface {
  export type Input = {
    payer: {
      name: string
      document: string
    }
    creditCard: {
      brand: string
      number: string
      cvv: string
      expiration: string
    }
  }

  export type Output = {
    status: string
  }
}
