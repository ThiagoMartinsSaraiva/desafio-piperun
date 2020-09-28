import AppButton from '../src/components/AppButton'

import { mount } from '@vue/test-utils'

describe('app-button', () => {
  const wrapper = mount(AppButton, {
    propsData: {
      text: 'Click me',
      disabled: true,
      classes: 'btn-submit'
    }
  })

  test('should render text prop correctly', () => {
    expect(wrapper.text()).toBe('Click me')
  })

  test('default type should be "button"', () => {
    expect(wrapper.vm.type).toBe('button')
  })

  test('should be able to change the type to "submit"', () => {
    const innerWrapper = mount(AppButton, {
      propsData: {
        text: 'Click me',
        type: 'submit'
      }
    })

    expect(innerWrapper.vm.type).toBe('submit')
  })

  test('should be disabled', () => {
    expect(wrapper.vm.disabled).toBeTruthy()
  })

  test('should add class "btn-submit" correctly', () => {
    const button = wrapper.find('button')

    expect(button.classes('btn-submit')).toBeTruthy()
  })
})
