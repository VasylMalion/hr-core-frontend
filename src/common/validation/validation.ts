import { Validation } from "common/types/common"

type Rules = {
  required?: boolean
  minLength?: number
  maxLength?: number
  email?: boolean
  mobileNumber?: boolean
  birthDate?: boolean
  date?: boolean
  salary?: true
  password?: true
}

const emailValidation = (value: string) => {
  const re = /^[a-zA-Z0-9._-]+@([A-Za-z]+\.[A-Za-z]+|[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]+)$/
  return re.test(value.toLowerCase())
}

const passwordValidation = (value: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return re.test(value.toLowerCase())
}

const dateValidation = (value: string) => {
  const date = +new Date(value)
  
  const re = /^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/

  return !isNaN(date) && re.test(value)
}

const birthDateValidation = (value: string) => {
  const date = new Date(value)
  const minDate = new Date()
  const maxDate = new Date()

  const minYear = minDate.getFullYear() - 18
  const maxYear = maxDate.getFullYear() - 100

  minDate.setFullYear(minYear)
  maxDate.setFullYear(maxYear)
  
  return date < minDate && date > maxDate
}

export const checkValidation = (value: string, rules: Rules): Validation => {
    let errors: Array<string | [string, number]> = []

    if (rules.required && !value.trim()) {
      errors.push('required')
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors.push(['minLength', rules.minLength])
    }
    
    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors.push(['maxLength', rules.maxLength])
    }

    if (rules.email && value && !emailValidation(value)) {
      errors.push('email')
    }

    if (rules.password && value && !passwordValidation(value)) {
      errors.push('password')
    }

    if (rules.mobileNumber && value && (!value.startsWith('380') || value.length !== 12)) {
      errors.push('mobileNumber')
    }

    if (rules.birthDate && value && !birthDateValidation(value) && dateValidation(value)) {
      errors.push('birthDate')
    }

    if (rules.date && value && !dateValidation(value)) {
      errors.push('date')
    }

    if (rules.salary && value && (+value <= 0 || +value >= 1000000 || +value !== parseInt(value))) {
      errors.push('salary')
    }

    return {
      isValid: !errors.length,
      errors,
    }
}