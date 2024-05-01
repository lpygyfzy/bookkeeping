import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { billTypeToName } from '@/pages/components'
import Icon from '@/pages/components/Icon'
import './index.scss'

const MonthBill = ({date,billList}) => {
    //定义箭头的状态 
    const [displayVisible, setDisplayVisible] = useState(false)
    //计算当日数据
    const monthResult = useMemo(() => {
        const pay = billList.filter(item => item.type === 'pay').reduce((a, c) =>a + c.money,0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) =>a + c.money,0)
        return {
          pay,
          income,
          tatal: pay + income
        }
      },[billList]) 
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon" >
          <span className="date">{date}</span>
          <span className={classNames('arrow',displayVisible && 'expand')} onClick={() => setDisplayVisible(!displayVisible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{monthResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{monthResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{monthResult.tatal.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{display: displayVisible ? 'block' : 'none'}}>
        
        {billList.map(item => {
            return (
            <div className="bill" key={item.id}>
                <Icon type={item.useFor}/>
                <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
                </div>
                <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
                </div>
            </div>
            )
        })}
        </div>
    </div>
  )
}
export default MonthBill