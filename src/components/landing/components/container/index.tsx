
const Container = ({ children, id }) => {
  return <section id={id || ''} className="flex flex-col items-center justify-center sm:max-w-xl md:max-w-full lg:max-w-[1366px] mx-auto  py-24  lg:py-48 md:px-8">{children}</section>
}
export default Container
