import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import { getVuexStore } from '@/store'
import { mount } from '@vue/test-utils'
import RestorationType from '@/components/Restoration/RestorationType.vue'

// mock the console.warn function to hide "[Vuetify] Unable to locate target XXX"
console.warn = jest.fn()

Vue.use(Vuetify)
Vue.use(Vuelidate)

const vuetify = new Vuetify({})
const store = getVuexStore()

describe('Restoration Type component', () => {
  let wrapperFactory: any

  beforeEach(() => {
    store.state.stateModel.restoration = {
      type: 'fullRestoration',
      expiry: null,
      relationships: [],
      restorationTypeValid: true
    }
    wrapperFactory = () => mount(RestorationType, {
      store,
      vuetify
    })
  })

  it('renders the component properly', () => {
    // verify the component is rendered
    const wrapper = wrapperFactory()
    expect(wrapper.find('#restoration-type').exists()).toBe(true)
  })

  it('selects the full restoration button if draft was a full restoration.', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.vm.$data.selectRestorationType).toEqual('fullRestoration')
  })

  it('selects the limited restoration button if draft was a limited restoration.', () => {
    store.state.stateModel.restoration.type = 'limitedRestoration'
    const wrapper = wrapperFactory()
    expect(wrapper.vm.$data.selectRestorationType).toEqual('limitedRestoration')
  })

  it('changes the restoration type from full to limited when the corresponding button is pressed.', async () => {
    const wrapper = wrapperFactory()
    const input = wrapper.find('#limited-radio-button')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.vm.$data.selectRestorationType).toEqual('limitedRestoration')
    expect(store.state.stateModel.restoration.type).toEqual('limitedRestoration')
    expect(store.state.stateModel.restoration.relationships).toEqual([])
  })

  it('changes the restoration type from limited to full when the corresponding button is pressed.', async () => {
    store.state.stateModel.restoration.type = 'limitedRestoration'
    const wrapper = wrapperFactory()
    const input = wrapper.find('#full-radio-button')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.vm.$data.selectRestorationType).toEqual('fullRestoration')
    expect(store.state.stateModel.restoration.type).toEqual('fullRestoration')
    expect(store.state.stateModel.restoration.expiry).toEqual(null)
  })
})
