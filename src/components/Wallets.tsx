import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Wallet } from '../assets/icons/wallet.svg';
import Metamask from '../images/metamask.svg';
import connectors from '../utils/connector-config';
import { useWeb3React } from '@web3-react/core';
import truncateAddress from '../methods/utils/truncate-address';
import retrieveAddress from 'methods/utils/retrieve-address';
import _const from 'methods/_const';
import saveAddress from 'methods/utils/save-address';
import getNativeBalance from 'methods/redux/actions/getBalances';
import { reacquireEmit } from 'methods/utils/event-fnc-recall';
import { assignAddresses } from 'methods/utils/protocol-settings';
import { addSettingsObjectToStorage } from 'methods/utils/intro-settings';
import {Button, CapsuleBtn} from "components"



interface WalletProps {
	setOpen?: Function;
	modal?: boolean;
	open?: Function;
	close?: Function;
	icon?: string;
	truncated?: string;
}

const ConnectWallet = () => (
    <div className="connect-wallet">
        <img src="/icons/connect-wallet.svg" alt="wallet" className="wallet-img" />
        <span>Connect Wallet</span>
    </div>
)

const CapsuleText = ({icon, truncated}: WalletProps) => {
	return (
		<div className="cap-text">
			<img src={icon} alt="icon" id="wall-icon" />
			<span id="truncated">{truncated}</span>
		</div>
	)
	
}


const Wallets: FC<WalletProps> = ({ setOpen, modal, open, close }) => {
	const dispatch = useDispatch();
	const { account } = useWeb3React();

	const { address, walletInUse,nativeBalance,chainId} = useSelector((store: any) => store.DashboardReducer)

	const [width, setWidth] = useState<number>(window.innerWidth);

	const [walletLogo, setWalletLogo] = useState('');
	const [networkLogo, setNetworkLogo] = useState('');
	console.log("wall logo--", walletLogo)




	function addressWork() {
		const localAddress = retrieveAddress();
		if(localAddress){
		dispatch({
				type: _const.ADDRESS,
				payload: {
					address: localAddress,
				},
			});
		}
	
	}

	// main function handling the connection into the app
	const insideConnectWallet = (account: any) => {
		//console.log("Account Got ", account);
		saveAddress(account);
		dispatch({
			type: _const.ADDRESS,
			payload: { address: account },
		});

		const connectionDetails = JSON.parse(localStorage.getItem("CONNECTION_DETAILS"));
		if(connectionDetails){
			dispatch(getNativeBalance(address,connectionDetails.chainId));
		
			let path = window.location.pathname;
		    path = path.length > 1 ? path.substring(1) : path;
		    reacquireEmit(path);
		}else{

			dispatch(getNativeBalance(address,chainId));
		
			let path = window.location.pathname;
			path = path.length > 1 ? path.substring(1) : path;
			reacquireEmit(path);
		}

	}

	useEffect(() => {
		if (typeof address !== 'undefined' && address) {
			insideConnectWallet(address);
			
		}
	}, [address]);


	// runs once whenever the account is changed
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			window.ethereum.on('accountsChanged', () => {
				
				if (typeof account !== 'undefined' && account) {
					insideConnectWallet(account);
				}
			});
		}
	}, []);


	// runs once when the network is changed
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			window.ethereum.on('chainChanged', () => {
			
				if (typeof account !== 'undefined' && account) {
					insideConnectWallet(account);
				}
			});
		}
		// eslint-disable-next-line
	}, []);

	// runs once when metamask is disconnected
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			window.ethereum.on('disconnect', () => {
				
			});
		}
		// eslint-disable-next-line
	}, []);




	useEffect(() => {
		assignAddresses();
		addressWork();
		addSettingsObjectToStorage();

		// eslint-disable-next-line
	}, []);


	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	function handleRejectedCall() {
		
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		window.addEventListener('unhandledrejection', handleRejectedCall);

		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};

	}, []);


	const isMobile: boolean = width <= 768;
	function checkNetworkChainId() {
		if (isMobile) {
			return true;
		} else {
			if (typeof window.ethereum !== 'undefined') {
				const cc = window.ethereum.chainId;
				const co = _const.NETWORK_CHAINID;
				return !(typeof cc === 'string' && cc !== co);
			} else {
				const cc = 97;
				const co = _const.NETWORK_CHAINID;
				return !(typeof cc === 'string' && cc !== co);
			}
		}
	}




	useEffect(() => {
	
		const connectedWallet = connectors.filter(x => x.title === walletInUse);
		connectedWallet[0] && setWalletLogo(connectedWallet[0]?.image);
		
        
		// const connectionDetails = JSON.parse(localStorage.getItem("CONNECTION_DETAILS"));
		// if(connectionDetails){
		// 	if(connectionDetails.chainId == 56){
		// 		setNetworkLogo(BSC);
		// 	}else{
		// 		setNetworkLogo(Polygon);
		// 	}			
		// }else{
		// 	if(chainId == 56){
		// 		setNetworkLogo(BSC);
		// 	}else{
		// 		setNetworkLogo(Polygon);
		// 	}
		// }		

	}, [address, walletInUse])




	return (
		<>
		{!address ?
			(
				<Button
					text={<ConnectWallet />}
					tertiary
					type="button"
					onClick={() => open && open({open: true, type: "connect-wallet"})}
					// onClick={() => setOpen(true)}
				/>
			)
					
			: (
				<CapsuleBtn
					leftText={nativeBalance}  
					rightText={< CapsuleText icon={walletLogo} truncated={truncateAddress(address)}  />}
					onClick={() => open && open({open: true, type: "disconnect"})}
					// onClick={() => setOpen(true)}
				/>
			)
					
		}
		</>
	)
}

export default Wallets;


const ConnectWalletStyle = styled.button`
	border: 2px solid cyan;
	margin-left: 15px;
	display: flex;
	align-items: center;
	background: linear-gradient(100.89deg, #9C3F00 3.11%, #FF6600 122.62%);;
	min-width: max-content;
	max-height: 46px;
	border-radius: 38px;
	color: white;
	padding: 10px;
	font-weight: 600;
	font-size: 12px;
	cursor: pointer;

	& > div {
		display: inline-flex;
		align-items: center;
	}

	& .wallet {
		background-color: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		padding: 0px;
		border-radius: 52px;
		margin-left: 10px;
	}

	& figure {
		margin-right: 7px;
		background: transparent;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;

		& svg {
			width: 18px;
		}
	}

	& figure.connected {
		background: white;
	}

	

	& figure.connectedNetwork {
		background: white;
		width: 40px;
        height:40px;
	}

	@media (min-width: 900px) {
		padding: 10px;
		background: linear-gradient(
			100.89deg, rgb(32, 66, 184) 3.11%, rgb(255, 102, 0) 122.62%);
		font-size: 14px;

		& .wallet figure {
			& img {
				width: 18px;
			}
		}
	}

	@media (min-width: 300px) {
		padding: 10px;
		background: linear-gradient(
			100.89deg, rgb(32, 66, 184) 3.11%, rgb(255, 102, 0) 122.62%);
		font-size: 14px;

		& .wallet figure {
			& img {
				width: 18px;
			}
		}
	}
`;

