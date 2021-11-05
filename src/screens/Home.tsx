import React from 'react'
import { Footer, Navbar } from 'components'
import { PackagesCard } from 'components/Cards'
import redBg from "../images/card-orange-bg.svg"
import blueBg from "../images/card-blue-bg.svg"
import blackBg from "../images/card-black-bg.svg"
import blackBg2 from "../images/card-black-bg.png"

interface Props {
    
}

export const Home = (props: Props) => {
    const [wallet, setWallet] = React.useState(true)
    const toggleWallet = () => setWallet(!wallet)

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
                    {!wallet ? 
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
                                        <p className="val">300 XEND</p>
                                        <p className="amount">$ 499,000</p>
                                    </div>
                                    <div className="box-2">
                                        <p className="prop">Accumulated Interest</p>
                                        <p className="val">300 XEND</p>
                                        <p className="amount">$ 499,000</p>
                                    </div>
                                </div>
                                <div className="right-2">
                                    <div className="pointer active">
                                        <p className="label">Active Staking</p>
                                        <img src="/icons/arrow-right.svg" alt="click" id="arrow" />
                                    </div>
                                    <div className="pointer">
                                        <p className="label">History</p>
                                        <img src="/icons/arrow-right.svg" alt="click" id="arrow" />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </section>

                <section className="step-3">
                    <PackagesCard
                        type="Silver"
                        apy={7}
                        buttonText="Connect Wallet"
                        // action={}
                        backgroundImage={redBg}
                        // backgroundColor="#FF6600"
                    />
                    <PackagesCard
                        type="Diamond"
                        apy={11}
                        buttonText="Stake"
                        // action={}
                        backgroundImage={blueBg}
                        // backgroundColor="#1C3BA6"
                    />
                    {console.log("image check-", redBg)}
                    <PackagesCard
                        type="Silver"
                        apy={15}
                        buttonText="Connect Wallet"
                        // action={}
                        backgroundImage={blackBg2}
                        backgroundColor=""
                    />
                </section>
            </main>
            <Footer/>
        </div>
    )
}
