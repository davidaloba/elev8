import { createSlice } from '@reduxjs/toolkit'
import data from '@store/_data'
import db from '@db'

interface IUsers {
  users: ({} | string | boolean | number)[]
}

const initialState: IUsers = {
  users: data.users
}

const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    FETCH_USERS: (state) => {
      // await db.connect()
      // const featuredProductsDocs = await Product.find(
      //   { isFeatured: true },
      //   '-reviews'
      // )
      //   .lean()
      //   .limit(3)
      // const topRatedProductsDocs = await Product.find({}, '-reviews')
      //   .lean()
      //   .sort({
      //     rating: -1
      //   })
      //   .limit(6)
      // await db.disconnect()
      // return {
      //   props: {
      //     featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      //     topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj)
      //   }
      // }
      state.users
    }
  }
})

export const { FETCH_USERS } = counterSlice.actions

export default counterSlice.reducer
