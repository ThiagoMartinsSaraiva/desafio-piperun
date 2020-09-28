import ActivitiesList from '../src/components/ActivitiesList'

import { mount } from '@vue/test-utils'
import Vue from 'vue'

Vue.filter('format-date', val => {
  return new Date(val).toLocaleString()
})

describe('activities-list', () => {
  const wrapper = mount(ActivitiesList, {
    propsData: {
      items: [
        {
          id: 0,
          status: 2,
          title: 'titulo',
          description: 'descrição',
          owner: {
            name: 'thiago'
          },
          start_at: '2020-09-22T23:40:00-03:00'
        }
      ]
    }
  })

  test('list should not be empty', () => {
    const list = wrapper.find('.table-body')

    expect(list.exists()).toBeTruthy()
  })

  test('list should be empty', () => {
    const innerWrapper = mount(ActivitiesList, {
      propsData: {
        items: []
      }
    })
    const list = innerWrapper.find('table-body')

    expect(list.exists()).toBeFalsy()
  })

  test('should add class "completed" when completed', () => {
    const tableRowData = wrapper.find('.table-row-data')

    expect(tableRowData.classes('completed')).toBeTruthy()
  })
})
