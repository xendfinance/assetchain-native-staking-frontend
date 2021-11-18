
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
	
  
    

	const [connectInfo, setConnectInfo] = useState({ network: null, protocol: null, wallet: null, chainId: null })	



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
					desc="You can connect your wallet to a different protocol to increase your earning"
					visible={open}
					width="992px"
					close={() => setOpen(false)}>
					<div>
						<InfoWrapper>
							By connecting a wallet, you agree and acknowledge that you have read and accept Xend Finance's
							&nbsp; <a href="#" style={{ textDecoration: "underline", color: "#6F89E4" }}>Terms of Service</a> and <a href="#" style={{ textDecoration: "underline", color: "#6F89E4" }}>Privacy Policy</a>
						</InfoWrapper>
					</div>

					<SectionWrapper>
						<SectionHeader>
							<div className="number">1</div>
							<div className="modal-title">Choose Network</div>
						</SectionHeader>
						<SectionBodyNetwork>
							<CardWrapperNetwork
									onClick={() => {setConnectInfo({
										...connectInfo,
										network: 'bsc',
										chainId: 97,
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
							</CardWrapperNetwork>
						
						
						</SectionBodyNetwork>
					</SectionWrapper>

					

					<SectionWrapper>
						<SectionHeader>
							<div className="number">2</div>
							<div className="modal-title">Choose Wallet</div>
						</SectionHeader>
						<SectionBody>
							{
								connectors.map((entry, i) => (
									<CardWrapper
										key={i}
										
										onClick={() => {

											// 1. should connect to the right network
											// 2. switch to correct address
											// 3. continue with wallet connection

											dispatch(Login(entry.connectorId, connectInfo.chainId, entry.title));

										    window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId);
											 setOpen(false);
											//window.location.reload();
										}
										}>
										<img width={40} src={entry.image} alt={entry.title} />
										<div style={{ color:'#edecec' }} className="chain-name">{entry.title}</div>
									</CardWrapper>
								))
							}
						</SectionBody>
					</SectionWrapper>
				</Modal>
			) : (
				<Modal
					title="Connected account"
					desc={`You are connected with ${walletInUse}`}
					visible={open}
					close={() => setOpen(false)}>
					<CardContainer>
						<ConnectInfoWrapper>
							<div>
								<p style={{ color:'#edecec' }}>Network</p>
								{chainId === 97 ? <p style={{ color:'#edecec' }}>Binance Smart Chain</p> : null}							
								

							</div>
						</ConnectInfoWrapper>

						<AddressInfoWrapper>
							<p style={{ color:'#edecec' }}>Address</p>
							<AddressContainer>
								<div>
									<p style={{ color:'#edecec' }}>{address}</p>
								</div>
								<img style={{ backgroundColor:'#edecec' }} src={Copy} alt="copy" />
							</AddressContainer>
						</AddressInfoWrapper>
					</CardContainer>

					<ActionContainer>						
						<div onClick={disconnectWallet}>
							<img style={{ backgroundColor:'#edecec' }} src={Disconnect} alt="disconnect" />
							<p style={{ color:'#edecec' }}>Disconnect</p>
						</div>
					</ActionContainer>
                   
				</Modal >
			)}
		</>
	)
}


export default ConnectionModal;




const InfoWrapper = styled.div`
	padding: 28px;
	background:#27282C;
	border-radius: 6px;
	color: #edecec;
	font-size: 20px;
	font-weight: 600;
	line-height: 138%;
`


const CardWrapperNetwork = styled.button`
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
	margin-right: 15px;
  	height: 78px;
	font-size: 18px;
	font-weight: 500;
	background: #27282C;
	border: 1px solid ${p => p.theme.border};
	box-sizing: border-box;
	box-shadow: 0px 3.51724px 36.0517px rgba(0, 0, 0, 0.06);
	border-radius: 14.7847px;
	padding: 16px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
		background: ${p => p.theme.disabledBtnBg};
	}

	@media (min-width: 768px){
		width: 32%;
	}

	& .chain-name {
		margin-left: 16px;
		color: #edecec;
	}

	& .apy {
		color: ${p => p.theme.fontAlt};
		font-size: 14px;
		font-weight: 600;
	}

	& .check {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(30%, -30%);
	}
`

const CardWrapper = styled.button`
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
  	height: 78px;
	font-size: 18px;
	font-weight: 500;
	background: #27282C;
	border: 1px solid ${p => p.theme.border};
	box-sizing: border-box;
	box-shadow: 0px 3.51724px 36.0517px rgba(0, 0, 0, 0.06);
	border-radius: 14.7847px;
	padding: 16px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
		background: ${p => p.theme.disabledBtnBg};
	}

	@media (min-width: 768px){
		width: 32%;
	}

	& .chain-name {
		margin-left: 16px;
		color: ${p => p.theme.fontAlt};
	}

	& .apy {
		color: ${p => p.theme.fontAlt};
		font-size: 14px;
		font-weight: 600;
	}

	& .check {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(30%, -30%);
	}
`

const SectionWrapper = styled.div`
	margin-top: 40px;
`

const SectionHeader = styled.div`
	display: flex;
	margin: 16px 0px;
	align-items: center;

	& .number {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 26px;
		width: 26px;
		background: ${p => p.theme.background};
		color: ${p => p.theme.fontAlt};
		font-weight: 600;
		font-size: 18px;
		border-radius: 50%;
		color:#edecec;
	}

	& .modal-title {
		font-weight: 600;
		font-size: 18px;
		margin-left: 20px;
		color:#edecec;
	}
`

const SectionBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;

	@media (min-width: 768px){
		flex-direction: row;
		justify-content: space-between;
	}
`


const SectionBodyNetwork = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;

	@media (min-width: 768px){
		flex-direction: row;
		
	}
`


const CardContainer = styled.div`	
	margin-top: 32px;
	border: 1px solid ${p => p.theme.border};
	box-sizing: border-box;
	box-shadow: 0px 3.51724px 36.0517px rgba(0, 0, 0, 0.06);
	border-radius: 14.7847px;
	padding: 24px;
`

const ConnectInfoWrapper = styled.div`
	display: flex;
	margin-bottom: 60px;

	& > div {
		height: 48px;
		display: flex;
		flex-direction: column;
		flex: auto;
		justify-content: space-between;
	}
`


const AddressInfoWrapper = styled.div`
	margin: 8px 0;

	& p {
		margin-bottom: 16px;
	}
`

const AddressContainer = styled.div`
	display: flex;
	align-items: center;

	& > div {
		border: 1px solid ${p => p.theme.border};
		box-sizing: border-box;
		flex-grow: 1;
		border-radius: 34px;
		padding: 16px;
		display: flex;
		margin-right: 16px;
		overflow-x: auto;
		justify-content: center;
		align-items: center;
		
		& > p {
			margin: 0;
			color: ${p => p.theme.fontAlt};
		}
	}
`

const ActionContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;

	& div {
		cursor: pointer;
		display: flex;
		align-items: center; 
		margin-bottom: 10px;

		& p {
			margin-left: 8px
		}
	}

	@media (min-width: 768px){
		flex-direction: row;
		justify-content: space-between;
	}
`