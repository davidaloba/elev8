import { render } from '@test'

import { Layout } from './index'

describe('Layout component testing with testing-library', () => {
  const component = render(<Layout />)

  it('renders without crashing', () => {
    expect(component).toBeTruthy()
  })
})
