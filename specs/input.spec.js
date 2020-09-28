import AppInput from '../src/components/AppInput'

import { mount } from '@vue/test-utils'

describe('app-input', () => {
  const wrapper = mount(AppInput, {
    propsData: {
      type: 'email',
      placeholder: 'Placeholder test',
      label: 'Label test',
      value: '',
      required: true
    }
  })

  const input = wrapper.find('input')
  const label = wrapper.find('label')

  test('should be able to bind placeholder', () => {
    expect(input.attributes('placeholder')).toBe('Placeholder test')
  })

  test('should be able to bind input type', () => {
    expect(input.attributes('type')).toBe('email')
  })

  test('should be able to bind label', () => {
    expect(label.text()).toBe(`Label test${input.attributes('required') ? ' *' : ''}`)
  })

  test('should be able to bind required', () => {
    expect(input.attributes('required')).toBeTruthy()
  })

})
