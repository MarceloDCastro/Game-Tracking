export default function GetOnlyNumbers (string: string) {
  return string.replace(/[^0-9]/g, '')
}
