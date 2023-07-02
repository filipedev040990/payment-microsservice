export interface ProcessPaymentUseCaseinterface {
  execute (input: ProcessPaymentUseCaseinterface.Input): Promise<ProcessPaymentUseCaseinterface.Output>
}

export namespace ProcessPaymentUseCaseinterface {
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
