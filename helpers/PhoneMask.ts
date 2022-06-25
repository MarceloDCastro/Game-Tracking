import GetOnlyNumbers from './getOnlyNumbers'

export default function PhoneMask (phoneNumber: string): string {
  phoneNumber = GetOnlyNumbers(phoneNumber)
  if (phoneNumber.length <= 10) {
    return phoneNumber
      .replace(/\D+/g, '')
      .replace(/(\d{2})/, '($1) ')
      .replace(/(\d{4})(\d)/, '$1$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  } else {
    return phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  }
}
