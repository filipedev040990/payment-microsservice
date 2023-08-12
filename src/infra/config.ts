export default {
  server: {
    port: 3333
  },
  rabbitmq: {
    uri: 'amqp://admin:admin@rabbitmq:5672'
  },
  cardEncryptorUrl: 'http://card-encryptor:3000/api/v1',
  cache: {
    cardEncryptorKey: 'cardEncryptorToken',
    cardEncryptorTtl: 24 * 60 * 60
  },
  application: {
    appId: '0c7b097a-3414-4526-859c-d389ff7cd228',
    secretKey: 'payment-microsservice'
  }
}
