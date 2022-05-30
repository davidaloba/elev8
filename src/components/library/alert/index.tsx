import { Container } from '@components'

export const Alert = ({ formErrors }) => {
  return (
    <>
      <div
        className={'bg-accent-1 border-accent-2' }
      >
        <Container>
          {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
              return (
                <div key={i} className="py-2 text-center text-xl text-red-600 font-semibold ">{fieldName} {formErrors[fieldName]}</div>
              )
            } else {
              return ''
            }
          })}
        </Container>
      </div>
    </>
  )
}
