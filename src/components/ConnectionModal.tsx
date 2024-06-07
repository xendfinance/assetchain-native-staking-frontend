
import { disconnect } from 'methods/redux/actions/contract-setup';
import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import connectors, { connectorLocalStorageKey } from '../utils/connector-config';

// import { disconnect } from '../methods/redux/actions/contract-setup';
 import BSC from '../assets/icons/bsc.svg';

 import Check from '../assets/icons/check.svg';
 import Copy from '../assets/icons/copy.svg';
 import Disconnect from '../assets/icons/disconnect.svg';
import Modal from '../components/core/Modal';
import { getCurrentSelectedNetwork } from '../methods/utils/get-current-network-selected';
import { Login } from 'utils/useAuth';
 


interface ConnectionModalProps {
	open: boolean
	setOpen: Function
}


const ConnectionModal: FC<ConnectionModalProps> = ({ open, setOpen }) => {
	const dispatch = useDispatch();

	const address = useSelector((store: any) => store.DashboardReducer.address);
	const walletInUse = useSelector((store: any) => store.DashboardReducer.walletInUse);
	
  
    

	const [connectInfo, setConnectInfo] = useState({ network: 'bsc', protocol: null, wallet: null, chainId: 56 })	



	const [currentNetwork, setCurrentNetwork] = useState(getCurrentSelectedNetwork());
	const {chainId} = useSelector((store: any) => store.DashboardReducer)

	const disconnectWallet = () => {		
		setOpen(false);
		dispatch(disconnect());
		setTimeout(() => {
			window.location.reload();
		}, 500)
	}

    
	return (
		<>
	
			{!address ? (
				<Modal
					title="Connect Wallet"
					desc="You can connect your wallet to start staking your XEND"
					visible={open}
					//width="992px"
					close={() => setOpen(false)}>
					<div>
						<div className="InfoWrapper">
							By connecting a wallet, you agree and acknowledge that you have read and accept Xend Finance's
							&nbsp; <a href="https://xend.finance/terms" style={{ textDecoration: "underline", color: "#6F89E4" }}>Terms of Service</a> and <a href="https://xend.finance/policy" style={{ textDecoration: "underline", color: "#6F89E4" }}>Privacy Policy</a>
						</div>
					</div>

					<div className="SectionWrapper">
						<div className="SectionHeader">
							<div className="number">1</div>
							<div className="modal-title">Choose Network</div>
						</div>
						<div className="SectionBodyNetwork">
							<div className="CardWrapper"
									onClick={() => {setConnectInfo({
										...connectInfo,
										network: 'bsc',
										chainId: 56,
										protocol: null,										
									})								
								   
								    }									
									}>
                                
								{
									connectInfo.network === 'bsc' &&
									<img className="check" src={Check} alt="check" />
								}
								<img src={BSC} width={40} alt='binance' />
								<div className="chain-name">Binance Smart Chain</div>
							</div>
						
						
						</div>
					</div>

					

					<div className="SectionWrapper">
						<div className="SectionHeader">
							<div className="number">2</div>
							<div className="modal-title">Choose Wallet</div>
						</div>
						<div className="SectionBodyNetwork">
							{
								connectors.map((entry, i) => (
									<div className="CardWrapper"
										key={i}
										
										onClick={() => {

											dispatch(Login(entry.connectorId, connectInfo.chainId, entry.title));

										    window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId);
											 setOpen(false);
											
										}
										}>
										<img width={40} src={entry.image} alt={entry.title} />
										<div style={{ color:'#edecec' }} className="chain-name">{entry.title}</div>
									</div>
								))
							}
						</div>
					</div>
				</Modal>
			) : (
				<Modal
					title="Connected account"
					desc={`You are connected with ${walletInUse}`}
					visible={open}
					close={() => setOpen(false)}>
					<div className="CardContainer">
						<div className="ConnectInfoWrapper">
							<div>
								<p style={{ color:'#edecec' }}>Network</p>
								{chainId === 56 ? (<p style={{ color:'#edecec' }}>Binance Smart Chain</p>) : null}							
							</div>
						</div>

						<div className="AddressInfoWrapper">
							<p style={{ color:'#edecec' }}>Address</p>
							<div className="AddressContainer">
								<div>
									<p style={{ color:'#edecec' }}>{address}</p>
								</div>
								<img  src={Copy} alt="copy" />
							</div>
						</div>
					</div>

					<div className="ActionContainer">						
						<div onClick={disconnectWallet}>
							<img  src={Disconnect} alt="disconnect" />
							<p>Disconnect</p>
						</div>
					</div>
                   
				</Modal >
			)}
		</>
	)
}


export default ConnectionModal;

