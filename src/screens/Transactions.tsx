import React from 'react'
import {Navbar, Table, Footer} from "components"
import { useNavigate, useLocation } from 'react-router'
import {HistoryTableHeader, StakingTableHeader, tableDummyData} from "components/TableData"

interface Props {
    page?: string;
}

export const Transactions = (props: Props) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    return (
        <div className="transactions">
            <Navbar />
            <div className="transaction-main">
                <div className="header">
                    <img src="/icons/back-arrow" alt="back" className="back-img" 
                        onClick={() => navigate(-1)}
                    />
                    <div className="page-dets">
                        <p id="topic">{pathname === "/history" ? "History" : "Active Staking"}</p>
                        <p id="sub-topic">
                            {pathname.includes("/history") ? "Your staking history" : "Details of your active staking"}
                        </p>
                    </div>
                </div>
                <div className="table-section">
                    <Table
                        header={pathname.includes('/history') ? HistoryTableHeader : StakingTableHeader}
                        data={tableDummyData.map((data: any, i: any) => ({
                            ...data,
                            date: data?.date,
                            coin: data.coin,
                            package: data.package,
                            amount: data.amount,
                            locked: data.lock
                        }))}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}
