import React, { useEffect } from 'react'
import Notification from '../components/core/Notifier';
import { Footer, Navbar, Modal } from 'components'
import { PackagesCard } from 'components/Cards'
import {useNavigate} from "react-router-dom"
import {Staking} from "./Staking"
import { useDispatch, useSelector } from 'react-redux'
import GetCategories from 'methods/contracts/actions/getCategories'
import GetUserInfo from 'methods/contracts/actions/getUserInfo'
import GetUserXendBalance from 'methods/contracts/actions/getUserXendBalance'
import GetTotalStaked from 'methods/contracts/actions/getTotalStaked'
import GetUserStakedCategories from 'methods/contracts/actions/getUserStakedCategories'
import { notify } from 'components/core/Notifier'
import { recreateWeb3 } from 'utils/useAuth';
import SmallSideLoader from 'components/core/SmallSideLoader';
import { Tooltip } from '@material-ui/core';
import { QuestionCircleOutlined } from '@ant-design/icons';
import MaskGroup from '../assets/icons/StakingBanner.svg';
import arrowBanner from '../assets/icons/arrowBanner.svg';

interface Props {
    
}

export const Home = (props: Props) => {
    const navigate = useNavigate()

    const [modal, setModal] = React.useState({open: false, type: "",categoryId:null})
    const openModal = (open: boolean, type: string,categoryId:any) => setModal({open, type,categoryId})
    const closeModal = () => setModal({open: false, type: "",categoryId:null})


	const { address,categories,userInfo,xendBalance,totalStakedContract,totalStakedUSD,loadingData} = useSelector((store: any) => store.DashboardReducer)
    
    const dispatch = useDispatch();

    const [wallet, setWallet] = React.useState(false)
    const toggleWallet = () => setWallet(!wallet)
    
    useEffect(() => {
		if (typeof address !== 'undefined' && address) {
           
			dispatch(GetUserInfo(address));
            dispatch(GetUserXendBalance(address));
            dispatch(GetUserStakedCategories(address));
           
		}
	}, [address]);


    useEffect(() => {
        dispatch(GetCategories());
        dispatch(GetTotalStaked());
       
	}, []);

    const goToOriginalStaking = () => {
        
          window.open('https://www.deficliq.com/xend-staking/', "_blank");  
          return;
      }


    return (
        <div className="home">
           
            <Navbar />
            <main className="home-main">
               
                <section className="step-1">
                    <div className="containerBanner">
                    <img src={MaskGroup} alt="banner" className="banner-img" />
             
                    <div style={{cursor:'pointer'}}className="centered-banner" onClick={()=> goToOriginalStaking()}><img src={arrowBanner} className="arrowClassBanner" alt="old staking app" /></div>
                    </div>
                    
                    <div className="locker">
                        <div className="lock-left">
                            <p id="title">Total Value Locked</p>
                            <p className="val">{totalStakedContract} XEND</p>
                            <p className="amount">{totalStakedUSD}</p>
                        </div>
                        <img src="/icons/wallet.svg" alt="wallet" className="wallet-img" />
                    </div>
                </section>

                <section className="step-2">
                    {!address ? 
                        (
                            <>
                                <p id="connect">No wallet connected</p>
                                <p id="dets">Connect wallet to see your balance</p>
                            </>
                        ) :
                        (
                            <div className="non-empty">
                                <div className="left-2">
                                   
                                    <div className="box-2">
                                      
                                        <Tooltip
                                        title='Total XEND staked'
                                        placement="top"
                                        >
                                        <div>
                                        <span className="prop">Staking Balance</span><QuestionCircleOutlined style={{ color: '#FF6600',paddingLeft:'3px' }} />
                                        </div>
                                        </Tooltip>
                                        {!loadingData?<p className="val">{userInfo.staked} XEND</p>:<SmallSideLoader />}
                                        {!loadingData?<p className="amount">{userInfo.stakedUSD}</p>:<SmallSideLoader />}
                                    </div>
                                    <div className="box-2">
                                        <Tooltip
                                        title='The All Time Rewards indicate the overall reward that will be received if all active staking full rewards are paid out. Penalty reward is considered if the final duration of active staking is not reached.'
                                        placement="top"
                                        >
                                        <div>
                                        <span className="prop">All Time Rewards</span><QuestionCircleOutlined style={{ color: '#FF6600',paddingLeft:'3px' }} />
                                        </div>
                                        </Tooltip>
                                        
                                        {!loadingData?<p className="val">{userInfo.reward} XEND</p>:<SmallSideLoader />}
                                        {!loadingData?<p className="amount">{userInfo.rewardUSD}</p>:<SmallSideLoader />}
                                    </div>
                                 
                                </div>
                                <div>

                                </div>
                                <div className="right-2">
                                    <div className="pointer active" onClick={() => navigate("/active-staking")}>
                                        <p className="label">Active Staking</p>
                                        <img src="/icons/arrow-right.svg" alt="click" id="arrow" />
                                    </div>
                                    <div className="pointer" onClick={() => navigate("/history")}>
                                        <p className="label">History</p>
                                        <img src="/icons/arrow-right.svg" alt="click" id="arrow" />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </section>

                <section className="step-3">
                       { 
                categories.map((entry, i) => (
                    <PackagesCard
                    key={entry.id}
                    categoryId={entry.id}
                    type={entry.name}
                    apy={entry.apy}
                    limit={entry.limit}
                    totalStakedInCategory={entry.totalStakedInCategory}
                    buttonText={address?"Stake":"No wallet connected"}                    
                    id="orange-bg"
                    action={() => setModal({open: true, type: "stake",categoryId:i})}
                    address = {address}
                />
                ))
                }
                  
                </section>
            </main>
            <Footer/>

            <Modal
                modalOpen={modal.open}
                modalClose={closeModal}
              
                modalChild={modal.open && modal.type === "stake" && 
                <Staking
                     categoryId={modal.categoryId}
                     categories={categories}
                     userXendBalance={xendBalance}
                     address = {address}
                     action={() => setModal({open: false, type: "stake",categoryId:modal.categoryId})}                      
                 />
                }
                
              
                
                className={`${modal.type === "stake" && "stake-modal"}`}
            />
        </div>
    )
}
