import { checkValidation } from './validation'

describe('checkValidation', () => {
  it('Test reqired', () => {
    expect(checkValidation('1', { required: true })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('', { required: true })).toEqual({
      errors: ['required'],
      isValid: false,
    })
    expect(checkValidation('  ', { required: true })).toEqual({
      errors: ['required'],
      isValid: false,
    })
  })

  it('Test minLength', () => {
    expect(checkValidation('12345', { minLength: 5 })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('1234', { minLength: 5 })).toEqual({
      errors: [['minLength', 5]],
      isValid: false,
    })
    expect(checkValidation('123456', { minLength: 5 })).toEqual({
      errors: [],
      isValid: true,
    })
  })

  it('Test maxLength', () => {
    expect(checkValidation('12345', { maxLength: 5 })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('1234', { maxLength: 5 })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('123456', { maxLength: 5 })).toEqual({
      errors: [['maxLength', 5]],
      isValid: false,
    })
  })

  it('Test email', () => {
    expect(checkValidation('v@gmail.com', { email: true })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('vgmail.com', { email: true })).toEqual({
      errors: ['email'],
      isValid: false,
    })
    expect(checkValidation('v@gmail', { email: true })).toEqual({
      errors: ['email'],
      isValid: false,
    })
    expect(checkValidation('@gmail.com', { email: true })).toEqual({
      errors: ['email'],
      isValid: false,
    })
  })

  it('Test password', () => {
    expect(checkValidation('12345678q', { password: true })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('12378q', { password: true })).toEqual({
      errors: ['password'],
      isValid: false,
    })
    expect(checkValidation('12345678', { password: true })).toEqual({
      errors: ['password'],
      isValid: false,
    })
    expect(checkValidation('12345678,!', { password: true })).toEqual({
      errors: ['password'],
      isValid: false,
    })
  })

  it('Test mobileNumber', () => {
    expect(checkValidation('380990804928', { mobileNumber: true })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('3809908047', { mobileNumber: true })).toEqual({
      errors: ['mobileNumber'],
      isValid: false,
    })
    expect(checkValidation('3809908047333', { mobileNumber: true })).toEqual({
      errors: ['mobileNumber'],
      isValid: false,
    })
    expect(checkValidation('752154878521', { mobileNumber: true })).toEqual({
      errors: ['mobileNumber'],
      isValid: false,
    })
  })

  it('Test birthDate', () => {
    expect(checkValidation('2000/11/16', { birthDate: true })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('2020/11/16', { birthDate: true })).toEqual({
      errors: ['birthDate'],
      isValid: false,
    })
    expect(checkValidation('2050/11/16', { birthDate: true })).toEqual({
      errors: ['birthDate'],
      isValid: false,
    })
  })

  it('Test date', () => {
    expect(checkValidation('2023/11/16', { date: true })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('qweqweqw', { date: true })).toEqual({
      errors: ['date'],
      isValid: false,
    })
  })

  it('Test salary', () => {
    expect(checkValidation('0', { salary: true })).toEqual({
      errors: ['salary'],
      isValid: false,
    })
    expect(checkValidation('30000', { salary: true })).toEqual({
      errors: [],
      isValid: true,
    })
    expect(checkValidation('1000000', { salary: true })).toEqual({
      errors: ['salary'],
      isValid: false,
    })
  })
})
