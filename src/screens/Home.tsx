import React, { useEffect } from 'react'
import { Footer, Navbar, Modal } from 'components'
import { PackagesCard } from 'components/Cards'
import redBg from "../images/card-orange-bg.svg"
import orangeBg from "../images/orange-bg.png"
import blueBg from "../images/card-blue-bg.svg"
import blackBg from "../images/card-black-bg.svg"
import blackBg2 from "../images/card-black-bg.png"
import {useNavigate} from "react-router-dom"
import {Staking} from "./Staking"
import { useDispatch, useSelector } from 'react-redux'
import GetCategories from 'methods/contracts/actions/getCategories'
import GetUserInfo from 'methods/contracts/actions/getUserInfo'

interface Props {
    
}

export const Home = (props: Props) => {
    const navigate = useNavigate()

    const [modal, setModal] = React.useState({open: false, type: ""})
    const openModal = (open: boolean, type: string) => setModal({open, type})
    const closeModal = () => setModal({open: false, type: ""})

	const { address,categories,userInfo} = useSelector((store: any) => store.DashboardReducer)
    
    const dispatch = useDispatch();

    const [wallet, setWallet] = React.useState(true)
    const toggleWallet = () => setWallet(!wallet)
    
    useEffect(() => {
		if (typeof address !== 'undefined' && address) {
			dispatch(GetUserInfo(address))
		}
	}, [address]);


    useEffect(() => {
        dispatch(GetCategories());

	}, []);


    return (
        <div className="home">
            <Navbar wallet={wallet} toggleWallet={toggleWallet} />
            <main className="home-main">
                <section className="step-1">
                    <p id="topic">Stake XEND and Earn upto 70% APY in XEND Token</p>
                    <div className="locker">
                        <div className="lock-left">
                            <p id="title">Total Value Locked</p>
                            <p id="value">$2,000,000</p>
                        </div>
                        <img src="/icons/wallet.svg" alt="wallet" className="wallet-img" />
                    </div>
                </section>

                <section className="step-2">
                    {!address ? 
                        (
                            <>
                                <p id="connect">Connect Wallet</p>
                                <p id="dets">Connect wallet to see your balance</p>
                            </>
                        ) :
                        (
                            <div className="non-empty">
                                <div className="left-2">
                                   
                                    <div className="box-2">
                                        <p className="prop">Staking Balance</p>
                                        <p className="val">{userInfo.staked} XEND</p>
                                        <p className="amount">$ 499,000</p>
                                    </div>
                                    <div className="box-2">
                                        <p className="prop">Accumulated Interest</p>
                                        <p className="val">{userInfo.reward} XEND</p>
                                        <p className="amount">$ 499,000</p>
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
                    type={entry.name}
                    apy={entry.apy}
                    buttonText={address?"Stake":"Connect Wallet"}                    
                    id="orange-bg"
                    action={() => setModal({open: true, type: "stake"})}
                    address = {address}
                />
                ))
                }
                    {/* <PackagesCard
                        type={categories.}
                        apy={7}
                        buttonText="Connect Wallet"
                        id="orange-bg"
                        action={() => setModal({open: true, type: "stake"})}
                    />
                    <PackagesCard
                        type="Diamond"
                        apy={11}
                        buttonText="Stake"
                        action={() => setModal({open: true, type: "stake"})}
                        id="blue-bg"
                    />
                    {console.log("image check-", redBg)}
                    <PackagesCard
                        type="Silver"
                        apy={15}
                        buttonText="Connect Wallet"
                        id="black-bg"
                        action={() => setModal({open: true, type: "stake"})}
                    /> */}
                </section>
            </main>
            <Footer/>

            <Modal
                modalOpen={modal.open}
                modalClose={closeModal}
                // closeIcon
                // title={`${modal.type === "stake"  && "staking-modal"}`}
                modalChild={modal.open && modal.type === "stake" &&
               
                    categories.map((entry, i) => (
                        <Staking
                        type={entry.name}
                        apy={entry.apy}                       
                    />
                    ))
                    }
                
                className={`${modal.type === "stake" && "stake-modal"}`}
            />
        </div>
    )
}
