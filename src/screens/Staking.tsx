import React, { useEffect,useState } from 'react'
import {Button, Input, Filter} from "components"
import moment from 'moment';
import Check from '../assets/icons/check.svg';
import { useDispatch } from 'react-redux';
import PerformStaking from 'methods/contracts/actions/performStaking';
import Tooltip from "@material-ui/core/Tooltip";
import { QuestionCircleOutlined } from '@ant-design/icons';
// import { notification } from "antd";
// import Web3 from "web3";



interface Props {
    categories?: any;    
    categoryId?: number;   
    userXendBalance?:any; 
    address?:any;
}

let xendBalanceOfUser;


const InputLabel = () => {
    return (
        <div className="input-label">
            <p id="label-left">Stake Amount</p>
            <p id="label-right">
            Available amount: 
            <span id="suffix-span">{xendBalanceOfUser} XEND</span>
        </p>
        </div>
        
    )
}





export const Staking = ({categories,categoryId,userXendBalance,address}: Props) => {
    const [check, setCheck] = useState(false)
    const [amount, setAmount] = useState('0');
    const dispatch = useDispatch();
   
    const [accumlatedIntrest, setAccumlatedIntrest] = useState('0.00');
    const selectedCategory = categories.filter(c => 
        c.id == categoryId
     )
     
    xendBalanceOfUser = userXendBalance;    
    

    const currentDate = moment().format('YYYY-MM-DD HH:mm'); 
   
    const minmumWithdrawalDate = moment(currentDate).add(selectedCategory[0].withdrawTime, 'seconds').format('YYYY-MM-DD HH:mm');
    const endDate = moment(currentDate).add(selectedCategory[0].period, 'days').format('YYYY-MM-DD HH:mm');

    const penaltyReward = ((selectedCategory[0].tokenPenaltyPercent * 365)/(selectedCategory[0].period * 100000))*100;
    

    const performStaking = () => {
        let amountAdded: number = +amount;
        let periodStaking = Number(selectedCategory[0].period)
        
        if (amountAdded > 0  && amount !== "") {
          
            dispatch(PerformStaking({ amount: amount,period:periodStaking, client: address }))
            
        }
    }


    useEffect(() => {
       
        let amountAdded: number = +amount;
        if (amountAdded > 0  && amount !== "") {
            
            const percentageValue = (amountAdded/100)* selectedCategory[0].apy;
           

            const finalValue = (percentageValue/365) * selectedCategory[0].period;
            setAccumlatedIntrest(finalValue.toFixed(2));
        }else{
            setAccumlatedIntrest('0.00');
        }
       

    }, [amount])

    return (
        <div className="staking">
            <div className="stake-left">
                <div className="left-main">
                    <p className="stake-title">XEND Staking</p>
                    <Input
                        name="type"
                        label="Type"
                        value="Locked"
                        className="stake-type"
                        disabled
                    />                  
                    <Input
                        name="amount"
                        label={<InputLabel
                               
                            />}
                        placeholder="Enter Stake Amount"
                        className="stake-input"
                        
                        onChange={(e: any) => setAmount(e.target.value)}
                    />
                </div>
            </div>
            <div className="stake-right">
                <p className="stake-title">Summary</p>
                <div className="box">
                    <img src="/icons/rings.svg" alt="rings" className="rings" />
                    <div className="items-main">
                        <div className="row">
                            <p className="item">Start Date</p>
                            <p className="val">{currentDate}</p>
                        </div>
                        <div className="row">
                            <p className="item">End Date</p>
                            <p className="val">{endDate}</p>
                        </div>
                        <div className="row">
                            <p className="item">Period</p>
                            <p className="val">{selectedCategory[0].period} Days</p>
                        </div>
                        <div className="row">
                            <p className="item">
                            <Tooltip
                                title='The minimum withdrawal period before you can withdraw your staked tokens. NOTE: withdrawing before end date will lead to slash of reward'
                                placement="top"
                                >
                                <div>
                                <span>Minimum Withdrawal Date</span><QuestionCircleOutlined style={{ color: '#FF6600',paddingLeft:'3px' }} />
                                </div>
                            </Tooltip>
                              </p>
                            <p className="val">{minmumWithdrawalDate}</p>
                        </div>
                        <div className="row">
                            <p className="item">Withdrawal Penalty(APR)</p>
                            <p className="val">{Number(penaltyReward).toFixed(2)}% APR</p>
                        </div>
                    </div>
                </div>
                <div className="row-box">
                    <p id="item">Best Deal Reward (APR)</p>
                    <p id="val">{selectedCategory[0].apy} % APR</p>
                </div>
                <div className="row-box">
                    <p id="item">Est. Accumulated Interest</p>
                    <p id="val">{accumlatedIntrest} XEND</p>
                </div>
                <div className="check">
                    <img 
                        src={check ? "" :Check } 
                        alt="check" className="check-img" 
                        onClick={() => setCheck(!check)}
                    />
                    <p id="agree">I have read and I agree to the above stated statement</p>
                </div>
                <Button                    
                    text="Stake"
                    type="button"
                    className="stake-btn"
                    onClick={Number(amount) > 0  ? () => performStaking() : undefined  }
                   
                />
            </div>
        </div>
    )
}
