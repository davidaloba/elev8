import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchTick } from './thunk'

interface ITick {data: string, loading:boolean}

const initialState: ITick = { data: 'init', loading: false }

const _tickSlice: any = createSlice({
  name: '_tick',

  initialState,

  reducers: {
    _tick: (_tick, action) => {
      _tick.data = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log('hydrate persited _tick state')
      return {
        ...state,
        ...action.payload._tick
      }
    })
    builder.addCase(fetchTick.pending, (_tick: ITick) => {
      _tick.loading = true
      console.log(`is fetching _tick ${_tick.loading}, fetching... `)
    })
    builder.addCase(fetchTick.fulfilled, (_tick: ITick, action) => {
      _tick.loading = false
      _tick.data = action.payload
      console.log(`is fetching _tick ${_tick.loading}, fetching success`)
    })
    builder.addCase(fetchTick.rejected, (_tick: ITick, action) => {
      _tick.loading = false
      console.log(`is fetching _tick ${_tick.loading}, ${action.payload}`)
    })
  }

})

export const { _tick } = _tickSlice.actions

export default _tickSlice.reducer
