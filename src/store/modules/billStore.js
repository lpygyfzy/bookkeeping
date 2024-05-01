import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const billStore = createSlice({
    name:"bill",
    initialState:{
        billList:[]
    },
    reducers: {
        //储存列表数据
        setBillLsit (state,action) {
            state.billList = action.payload
        },
        //增加列表数据
        addBill (state,action) {
            state.billList.push(action.payload)
        }
    }
})
//结构
const { setBillLsit,addBill } = billStore.actions
//异步请求
const getBillList = () => {
    return async(dispath) => {
      const res = await axios.get("http://localhost:8888/ka")
      dispath(setBillLsit(res.data))
    }
}
//异步发送
const addBillList = (data) => {
    return async(dispath) => {
      const res = await axios.post("http://localhost:8888/ka",data)
      dispath(addBill(res.data))
    }
}
export {getBillList,addBillList}

const reducer = billStore.reducer
export default reducer