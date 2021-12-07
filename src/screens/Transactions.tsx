import React, { useEffect } from 'react'
import {Navbar, Table, Footer} from "components"
import { useNavigate, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import GetUserStakedCategories from 'methods/contracts/actions/getUserStakedCategories'

interface Props {
    page?: string;
}

export const Transactions = (props: Props) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const { userCategories,userCategoriesWithdraw,address,loadingData} = useSelector((store: any) => store.DashboardReducer)

    const dispatch = useDispatch();
 

    return (
        <div className="transactions">
            <Navbar />
            <div className="transaction-main">
                <div className="header">
                    <img src="/icons/back-arrow.svg" alt="back" className="back-img" 
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
                        //header={pathname.includes('/history') ? HistoryTableHeader : StakingTableHeader}
                        header={pathname.includes('/history') ? "History" : "ActiveStaking"}
                        address={address}
                        data={userCategories}
                        dataWithdraw={userCategoriesWithdraw}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}
