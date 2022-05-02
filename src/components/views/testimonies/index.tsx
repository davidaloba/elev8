import { useState } from 'react'
import data from '@db/data'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'

export const Testimonies = () => {
  const people = data.testimonies
  const [index, setIndex] = useState(0)
  const { name, job, text } = people[index]

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0
    }
    if (number < 0) {
      return people.length - 1
    }
    return number
  }

  const nextPerson = () => {
    setIndex((index) => {
      const newIndex = index + 1
      return checkNumber(newIndex)
    })
  }

  const prevPerson = () => {
    setIndex((index) => {
      const newIndex = index - 1
      return checkNumber(newIndex)
    })
  }

  return (
    <article className="flex flex-col justify-center">
      <div className="relative border-full mx-auto mb-10">
        <Image src='/avatar.png' alt={name} className="mx-auto" width='96' height='96 ' />
        {/* <span className="absolute top-0 left-0 w-10 h-10 grid place-items-center border full text-center">
          <FaQuoteRight />
        </span> */}
      </div>
      <h4 className="mb-1 text-center uppercase">{name}</h4>
      <p className="mb-4 uppercase text-xl text-center text-orange-500">{job}</p>
      <p className=" text-center mb-6">{text}</p>
      <div className=" mx-auto button-container">
        <button className="border-0 p-0 mr-2" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="border-0 p-0 ml-2" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>

    </article>
  )
}
