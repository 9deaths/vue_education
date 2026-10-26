/** Форматирует номер карты в группы по 4 цифры (не более 16 цифр). */
export function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

/** Проверяет номер карты по алгоритму Луна (ровно 16 цифр). */
export function isValidCardNumber(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 16) {
    return false
  }

  let sum = 0
  let double = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i] ?? 0)
    if (double) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    double = !double
  }

  return sum % 10 === 0
}

/** Проверяет срок карты. */
export function isValidExpiry(value: string): boolean {
  const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
  if (!match) {
    return false
  }

  const month = Number(match[1])
  const year = 2000 + Number(match[2])

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (year < currentYear) {
    return false
  }
  if (year === currentYear && month < currentMonth) {
    return false
  }

  return true
}
