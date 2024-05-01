import { Button, DatePicker, Input, NavBar,Toast } from 'antd-mobile'
import Icon from '../components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'

const New = () => {
    //定义一个记录当前是收入还是支出的控制状态
    const [billType,setBillType] = useState('pay')
    //收集money的状态
    const [moneyVale,setMoneyValue] = useState('')
    const setMoneyVal = (val) => {
        setMoneyValue(Number(val))
    }
    //收集类型
    const [useFor,setUseFor] = useState('')
    //控制时间选择器
    const [dateVisible,setDateVisible] = useState(false)
    //收集时间
    const [date,setDate] = useState(()=>{
        return dayjs(new Date()).format('YYYY-MM-DD')
    })
    //时间选择器确认时间
    const onConfirmSure = (val) => {
        setDate(val)
        setDateVisible(false)
    }
    //保存账单
    const dispatch = useDispatch()
    const saveBill = () => {
        if(moneyVale <= 0 || moneyVale === '' || useFor === '') {
            Toast.show({
                content: '当前金额为0元',
                afterClose: () => {
                  console.log('after')
                },
              })
            return 
        }
        const data = {
            "type": billType,
            "money": billType === 'pay' ? -moneyVale : +moneyVale,
            "date": date,
            "useFor": useFor,
        }
        dispatch(addBillList(data))
        console.log(data);
        navigate(-1)
    }
    const navigate = useNavigate()
    return (
        <div className="keepAccounts">
        <NavBar className="nav" onBack={() => navigate(-1)}>
            记一笔
        </NavBar>

        <div className="header">
            <div className="kaType">
            <Button
                shape="rounded"
                className={classNames(billType === 'pay' && 'selected')}
                onClick={() => setBillType('pay') }
            >
                支出
            </Button>
            <Button
                className={classNames(billType === 'income' && 'selected')}
                shape="rounded"
                onClick={() => setBillType('income') }
            >
                收入
            </Button>
            </div>

            <div className="kaFormWrapper">
            <div className="kaForm">
                <div className="date">
                <Icon type="calendar" className="icon" />
                <span className="text" onClick={() => setDateVisible(!dateVisible)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                <DatePicker
                    className="kaDate"
                    title="记账日期"
                    max={new Date()}
                    visible={dateVisible}
                    closeOnMaskClick = {() => {setDateVisible(false)}}
                    onCancel = {() => {setDateVisible(false)}}
                    onConfirm = {(val) => onConfirmSure(val)}
                />
                </div>
                <div className="kaInput">
                <Input
                    className="input"
                    placeholder="0.00"
                    type="number"
                    value={moneyVale}
                    onChange={(val) => {setMoneyVal(val)}}
                    clearable
                />
                <span className="iconYuan">¥</span>
                </div>
            </div>
            </div>
        </div>

        <div className="kaTypeList">
            {billListData[billType].map(item => {
            return (
                <div className="kaType" key={item.type}>
                <div className="title">{item.name}</div>
                <div className="list">
                    {item.list.map(item => {
                    return (
                        <div
                        className={classNames(
                            'item',
                            useFor === item.type ? 'selected' : ''
                        )}
                        key={item.type}
                        onClick={() => setUseFor(item.type)}    
                        >
                        <div className="icon">
                            <Icon type={item.type} />
                        </div>
                        <div className="text">{item.name}</div>
                        </div>
                    )
                    })}
                </div>
                </div>
            )
            })}
        </div>

        <div className="btns">
            <Button className="btn save" onClick={() => {saveBill()}}>
            保 存
            </Button>
        </div>
        </div>
    )
}

export default New