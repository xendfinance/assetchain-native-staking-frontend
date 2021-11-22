import React from 'react'
import {Button, Input, Filter} from "components"

interface Props {
    
}

const filterOptions = [
    {label: "Gold", value: "gold"},
    {label: "Silver", value: "silver"},
    {label: "Diamond", value: "diamond"},
]

const InputLabel = () => {
    return (
        <div className="input-label">
            <p id="label-left">Stake Amount</p>
            <p id="label-right">
            Available amount: 
            <span id="suffix-span">0 XEND</span>
        </p>
        </div>
        
    )
}

export const Staking = (props: Props) => {
    const [check, setCheck] = React.useState(false)


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
                        label={<InputLabel />}
                        placeholder="Enter Stake Amount"
                        className="stake-input"
                    />
                </div>
            </div>
            <div className="stake-right">
                <p className="stake-title">Summary</p>
                <div className="box">
                    <img src="/icons/rings.svg" alt="rings" className="rings" />
                    <div className="items-main">
                        <div className="row">
                            <p className="item">Stake Date</p>
                            <p className="val">2021-08-20   13:54</p>
                        </div>
                        <div className="row">
                            <p className="item">value Date</p>
                            <p className="val">2021-08-20  13:54</p>
                        </div>
                        <div className="row">
                            <p className="item">Interest Period</p>
                            <p className="val">15 Days</p>
                        </div>
                        <div className="row">
                            <p className="item">Interest End Date</p>
                            <p className="val">2021-08-20  13:54</p>
                        </div>
                    </div>
                </div>
                <div className="row-box">
                    <p id="item">Best Deal Reward (APY)</p>
                    <p id="val">15% APY</p>
                </div>
                <div className="row-box">
                    <p id="item">Est. Accumulated Interest</p>
                    <p id="val">0.0000000 XEND</p>
                </div>
                <div className="check">
                    <img 
                        src={check ? "" : "/icons/unchecked.svg"} 
                        alt="check" className="check-img" 
                        onClick={() => setCheck(!check)}
                    />
                    <p id="agree">I have read and I agree to the above stated statement</p>
                </div>
                <Button
                    text="Stake"
                    type="button"
                    className="stake-btn"
                />
            </div>
        </div>
    )
}
