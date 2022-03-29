import index from './'

describe('Redux Store', () => {
  it('should create store with counter reducer', () => {
    const currentState = index.getState()
    expect(currentState).toHaveProperty('counter')
  })
})
