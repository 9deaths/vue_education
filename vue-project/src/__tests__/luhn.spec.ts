import { describe, it, expect } from 'vitest'
import { formatCardNumber, isValidCardNumber, isValidExpiry } from '../utils/luhn'

describe('isValidCardNumber', () => {
  it('принимает валидный номер', () => {
    expect(isValidCardNumber('4111111111111111')).toBe(true)
  })

  it('принимает номер с пробелами', () => {
    expect(isValidCardNumber('4111 1111 1111 1111')).toBe(true)
  })

  it('отклоняет неверный номер', () => {
    expect(isValidCardNumber('4111111111111112')).toBe(false)
  })

  it('отклоняет слишком короткий номер', () => {
    expect(isValidCardNumber('4111')).toBe(false)
  })
})

describe('formatCardNumber', () => {
  it('группирует цифры по четыре', () => {
    expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111')
  })

  it('обрезает до 16 цифр', () => {
    expect(formatCardNumber('41111111111111119999')).toBe('4111 1111 1111 1111')
  })
})

describe('isValidExpiry', () => {
  /** Срок через N лет от текущей даты в формате MM/ГГ. */
  function futureExpiry(offsetYears = 2): string {
    const date = new Date()
    date.setFullYear(date.getFullYear() + offsetYears)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear() % 100).padStart(2, '0')
    return `${month}/${year}`
  }

  it('принимает будущий срок', () => {
    expect(isValidExpiry(futureExpiry())).toBe(true)
  })

  it('отклоняет месяц больше 12', () => {
    expect(isValidExpiry(`13/${futureExpiry().slice(3)}`)).toBe(false)
  })

  it('отклоняет прошедший срок', () => {
    expect(isValidExpiry('01/20')).toBe(false)
  })

  it('отклоняет неверный формат', () => {
    expect(isValidExpiry('1/30')).toBe(false)
  })
})
