// Libraries
import axios from '@/utils/axios-auth'
import { Component, Vue } from 'vue-property-decorator'
import { NameRequestStates } from '@/enums/nameRequestStates'

/**
 * Name request mixin for processing NR responses
 */
@Component
export default class NameRequestMixin extends Vue {
  /**
   * Returns True if the Name Request data is valid.
   * @param nr the name request response payload
   * */
  isNrValid (nr: any): boolean {
    return (nr &&
      nr.state &&
      nr.expirationDate &&
      nr.names?.length > 0 &&
      nr.nrNum &&
      nr.requestTypeCd)
  }

  /**
   * Method to check if a name request response payload is consumable
   * @param nr the name request response payload
   */
  isNRConsumable (nr : any) : { isConsumable: boolean, expired: boolean, approved: boolean } {
    // Ensure a name request payload is provided
    if (!nr) {
      throw new Error('isNRConsumable() : no NR provided')
    }
    // Check if NR response has expired
    if (new Date(nr.expirationDate) < new Date()) {
      return { isConsumable: false, expired: true, approved: false }
    }

    // If the NR root state is not APPROVED, this NR is not consumable
    if (nr.state !== NameRequestStates.APPROVED) {
      return { isConsumable: false, expired: false, approved: false }
    }

    // Check if the name request has already been consumed
    let hasBeenConsumed = false
    nr.names.forEach((name: { consumptionDate: any; }) => {
      if (name.consumptionDate) {
        hasBeenConsumed = true
      }
    })
    if (hasBeenConsumed) {
      return { isConsumable: false, expired: false, approved: true }
    }

    return { isConsumable: true, expired: false, approved: true }
  }
}