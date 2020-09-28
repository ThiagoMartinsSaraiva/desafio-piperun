import AppNotifier from '../src/components/AppNotifier'

import { mount } from '@vue/test-utils'

describe('app-notifier', () => {
  const wrapper = mount(AppNotifier, {
    propsData: {
      title: 'Sucesso',
      message: 'Message',
      type: 'ok',
      show: true
    }
  })

  const container = wrapper.find('div')

  test('should render title prop correctly', () => {
    const title = wrapper.find('.title')
    expect(title.text()).toBe('Sucesso')
  })

  test('should render message prop correctly', () => {
    const message = wrapper.find('.message')
    expect(message.text()).toBe('Message')
  })

  test('should add class "ok" correctly', () => {
    expect(container.classes('ok')).toBeTruthy()
  })

  test('should display notification', () => {
    expect(container.exists()).toBeTruthy()
  })

  test('should not display notification', () => {
    const innerWrapper = mount(AppNotifier, {
      propsData: {
        title: 'Erro',
        message: 'Error Message',
        type: 'error',
        show: false
      }
    })

    const container = innerWrapper.find('div')
    expect(container.exists()).toBeFalsy()
  })

})
