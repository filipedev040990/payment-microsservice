import { DecryptDataInterface } from '@/application/contratcs/decrypt-data.interface'
import CryptoJS from 'crypto-js'

export class CryptoJsAdapter implements DecryptDataInterface {
  constructor (private readonly key: string) { }

  decrypt (input: string): any {
    const key = CryptoJS.enc.Utf8.parse(this.key)

    const decryptedData = CryptoJS.AES.decrypt(input, key, {
      mode: CryptoJS.mode.ECB
    })

    return decryptedData.toString(CryptoJS.enc.Utf8)
  }
}
