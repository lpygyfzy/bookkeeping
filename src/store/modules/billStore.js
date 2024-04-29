import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const billStore = createSlice({
    name:"bill",
    initialState:{
        billList:[]
    },
    reducers: {
        setBillLsit (state,action) {
            state.billList = action.payload
        }
    }
})
//结构
const { setBillLsit } = billStore.actions
//异步请求
const getBillList = () => {
    return async(dispath) => {
      const res = await axios.get("http://localhost:8888/ka")
      dispath(setBillLsit(res.data))
    }
}
export {getBillList}

const reducer = billStore.reducer
export default reducer