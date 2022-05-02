import { Container } from '@components'

export const Alert = ({ children }) => {
  return (
    <>
      <div
        className={'bg-accent-1 border-accent-2' }
      >
        <Container>
          <div className="py-2 text-center text-xl text-red-600 font-semibold ">An Alert!!</div>
        </Container>
      </div>
    </>
  )
}
