
export const fetchData = async (url) => {
  const res = await fetch(url).then(
    (data) => data.json()
  )
  return res
}
