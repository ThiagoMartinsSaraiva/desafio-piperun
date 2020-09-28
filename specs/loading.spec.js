import AppLoading from '../src/components/AppLoading'

import { mount } from '@vue/test-utils'

describe('app-loading', () => {
  const wrapper = mount(AppLoading, {
    propsData: {
      isLoading: true
    }
  })

  test('should display loading', () => {
    const container = wrapper.find('div')
    expect(container.exists()).toBeTruthy()
  })

  test('should not display loading', () => {
    const innerWrapper = mount(AppLoading, {
      propsData: {
        isLoading: false
      }
    })

    const container = innerWrapper.find('div')
    expect(container.exists()).toBeFalsy()
  })
})
