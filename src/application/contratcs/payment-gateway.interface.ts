export interface PaymentGateayInterface {
  processPayment (input: PaymentGateayInterface.Input): Promise<PaymentGateayInterface.Output>
}

export namespace PaymentGateayInterface {
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
    reason?: string
  }
}
