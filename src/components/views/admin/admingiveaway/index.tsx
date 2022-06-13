import { useEffect, useState } from 'react'

import { RootState, useAppSelector } from '@store'
import { fetchAdminGiveaway, fetchData } from '@store/actions'

import { Container } from '@components'

export const AdminGiveaway = () => {
  const { admin, user } = useAppSelector((state: RootState) => state)
  const [tab, setTab] = useState('')
  const [tabData, setTabData] = useState([])

  useEffect(() => {
    fetchData('/api/admin/posts/giveaway', user.userInfo.token, fetchAdminGiveaway)

    const currentGiveaway = admin.giveaway ? admin.giveaway.find(({ slug }) => slug === tab) : null
    currentGiveaway && setTabData(currentGiveaway.data.giveawayEntries)
  }, [tab])

  return (
    <section className="mt-24 mb-12">

      <Container>
        <div className=" flex justify-between items-center mb-8">
            <div className='text-6xl font-bold '>
              Giveaway
            </div>
        </div>
      </Container>

      <Container>
        {!admin.giveaway
          ? <div className=' text-3xl font-bold'><p className='p-4 my-10 border-x'>No Giveaways.. </p>
          </div>
          : <div className="flex justify-around rounded-lg my-10 bg-white py-5 px-10 items-center">
            {admin.giveaway.map(({ slug, title }, index) => {
              return (<div
                className={`py-2 px-6 rounded-2xl text-xl font-semibold uppercase cursor-pointer ${tab === slug && 'bg-green-700 text-white'}`}
                key={index}
                onClick={() => {
                  setTab(slug)
                  window.scrollTo(0, 0)
                }}
              >
                {title}
              </div>)
            })}
          </div>
        }
      </Container>

      <Container>
        <table className='my-10'>
          <thead>
            <tr className='border-2' >
              <th className='p-4 border-x'>USERNAME</th>
              <th className='p-4 border-x'>EMAIL</th>
              <th className='p-4 border-x'>NAME</th>
              <th className='p-4 border-x'>BANK</th>
              <th className='p-4 border-x'>ACCOUNT</th>
            </tr>
          </thead>
          {!tabData
            ? <tbody className=' text-3xl font-bold'>
              <tr className='border-2' ><td className='p-4 border-x'>Loading...</td></tr>
            </tbody>
            : <tbody>
              {tabData.length > 0
                ? (tabData.map((entry) => (
                  <tr key={entry.userName} className='border-2' >
                    <td className='p-4 border-x'>{entry.userName}</td>
                    <td className='p-4 border-x'>{entry.email}</td>
                    <td className='p-4 border-x'>{entry.accountName}</td>
                    <td className='p-4 border-x'>{entry.bankName}</td>
                    <td className='p-4 border-x'>{entry.accountNo}</td>
                  </tr>
                  )))
                : <tr className='border-2 font-italic ' > <div className=' px-10 py-4 italic' >No entries...  </div> </tr>
              }
            </tbody>}
        </table>
      </Container>

    </section>
  )
}
