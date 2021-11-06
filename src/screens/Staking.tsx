import React from 'react'
import {Button, Input, Filter} from "components"

interface Props {
    
}

const filterOptions = [
    {label: "Gold", value: "gold"},
    {label: "Silver", value: "silver"},
    {label: "Diamond", value: "diamond"},
]

export const Staking = (props: Props) => {
    return (
        <div className="staking-modal">
            <div className="stake-left">
                <p className="left-title">XEND Staking</p>
                <p id="label">Type</p>
                <p id="type-val">Locked</p>
                <Filter
                    label="Select Package"
                    options={filterOptions}
                />
                <Input
                    name="type"
                    label="Type"
                />
            </div>
            <div className="stake-right"></div>
        </div>
    )
}
