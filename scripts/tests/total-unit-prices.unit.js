import totalUnitPrices from '../total-unit-prices'
import stub from './stub.json'
import { expect } from 'chai'

describe('totalUnitPrices', () => {
  it('it gets the right total price', () => {
    expect(totalUnitPrices(stub)).to.equal("15.10")
  })
})
