import { createSlice } from '@reduxjs/toolkit'
import { Actions, } from './Actions'
import Cookies from 'js-cookie'

export const Reducer = createSlice({
  name: 'General',

  initialState: {
    token: Cookies.get('token') ? Cookies.get('token') : null,
    userId: Cookies.get('userId') ? Cookies.get('userId') : null,
    userName: Cookies.get('userName') ? Cookies.get('userName') : null,
    delarName: Cookies.get('delarName') ? Cookies.get('delarName') : null,
    dealerId: Cookies.get('dealerId') ? Cookies.get('dealerId') : null,
    authLevel: Cookies.get('authLevel') ? Cookies.get('authLevel') : null,

  },
  reducers: Actions,
})

export const { setReduxToken, setAuthLevel } = Reducer.actions

export default Reducer.reducer