export interface PaymentGatewayInterface {
  processPayment (input: PaymentGatewayInterface.Input): Promise<PaymentGatewayInterface.Output>
}

export namespace PaymentGatewayInterface {
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
