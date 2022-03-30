import { createSlice } from '@reduxjs/toolkit'
import data from '@store/_data'
import db from '@db'

interface IPosts {
  posts: ({} | string | boolean | number)[];
}

const initialState: IPosts = {
  posts: data.posts
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    FETCH_POSTS: (state) => {
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
      state.posts
    }
  }
})

export const { FETCH_POSTS } = counterSlice.actions

export default counterSlice.reducer
