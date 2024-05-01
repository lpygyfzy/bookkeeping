import { NavBar,DatePicker } from "antd-mobile"
import { useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import './index.scss'
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import _ from "lodash"
import MonthBill from "./components/MonthBill"
const Year = () => {
    //取出数据
    const billList = useSelector(state => state.bill.billList)
    //计算数据 按月份来组合数据
    const monthGroup = useMemo(() => {
      return _.groupBy(billList,item => dayjs(item.date).format('YYYY'))
    },[billList])
    
    //定义一个控制时间选择器的状态
    const [dateVisible,setDateVisible] = useState(false)
    //定义一个控制年月的状态
    const [yearMonthStr,setYearMonthStr] = useState(() => {
      return dayjs(new Date()).format('YYYY')
    })
    //定义当月的
    const [monthList,setMontList] = useState([])
    
    const monthResult = useMemo(() => {
      const pay = monthList.filter(item => item.type === 'pay').reduce((a, c) =>a + c.money,0)
      const income = monthList.filter(item => item.type === 'income').reduce((a, c) =>a + c.money,0)
      return {
        pay,
        income,
        tatal: pay + income
      }
    },[monthList]) 

    //初始化渲染 副作用钩子
    useEffect(() => {
      const date = dayjs().format('YYYY')
      if(monthGroup[date]) {
        setMontList(monthGroup[date])
      }
    },[monthGroup])

    //点击选择时间
    const onConfirmSure = (val) => {
        const str = dayjs(val).format('YYYY')
        console.log(monthGroup[str]);
        if(monthGroup[str]){
          setMontList(monthGroup[str])
        }
        //拼接文案
        setYearMonthStr(str)
        setDateVisible(false)
    }

    //计算数据 按每日来组合数据
    const dayGroup = useMemo(() => {
      const dayList = _.groupBy(monthList,item => dayjs(item.date).format('YYYY-MM'))
      const dateArr = Object.keys(dayList)
      return {
        dayList,
        dateArr
      }
    },[monthList])
    console.log('billList',dayGroup);
    return (
        <div className="monthlyBill">
        <NavBar className="nav" backArrow={false}>
          年度收支
        </NavBar>
        <div className="content">
          <div className="header">
            {/* 时间切换区域 */}
            <div className="date" onClick={() => {setDateVisible(true)}}>
              <span className="text">
                {yearMonthStr}年账单
              </span>
              <span className={classNames('arrow',dateVisible && 'expand')} ></span>
            </div>
            {/* 统计区域 */}
            <div className='twoLineOverview'>
              <div className="item">
                <span className="money">{monthResult.pay.toFixed(2)}</span>
                <span className="type">支出</span>
              </div>
              <div className="item">
                <span className="money">{monthResult.income.toFixed(2)}</span>
                <span className="type">收入</span>
              </div>
              <div className="item">
                <span className="money">{monthResult.tatal.toFixed(2)}</span>
                <span className="type">结余</span>
              </div>
            </div>
            {/* 时间选择器 */}
            <DatePicker
              className="kaDate"
              title="记账日期"
              precision="year"
              visible={dateVisible}
              closeOnMaskClick = {() => {setDateVisible(false)}}
              onCancel = {() => {setDateVisible(false)}}
              onConfirm = {(val) => onConfirmSure(val)}
              max={new Date()}
            />
          </div>
          {/** 渲染列表*/}
          {
            dayGroup.dateArr.map(keys => {
              return <MonthBill key={keys} date={keys} billList= {dayGroup.dayList[keys]}/>
            })
          }
          
        </div>
        </div >
    )
}

export default Year