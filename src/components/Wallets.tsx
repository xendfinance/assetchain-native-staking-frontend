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
import { recreateWeb3 } from 'utils/useAuth';





interface WalletProps {
	setOpen: Function
}


const Wallets: FC<WalletProps> = ({ setOpen }) => {
	const dispatch = useDispatch();
	const { account } = useWeb3React();

	const { address, walletInUse,nativeBalance,chainId} = useSelector((store: any) => store.DashboardReducer)

	const [width, setWidth] = useState<number>(window.innerWidth);

	const [walletLogo, setWalletLogo] = useState('');
	const [networkLogo, setNetworkLogo] = useState('');




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
	
		const connectionDetails = JSON.parse(localStorage.getItem("CONNECTION_DETAILS"));
		if(connectionDetails){
			const connectedWallet = connectors.filter(x => x.title === connectionDetails.walletName);
			connectedWallet[0] && setWalletLogo(connectedWallet[0].image);
			
		}else{
			const connectedWallet = connectors.filter(x => x.title === walletInUse);
		    connectedWallet[0] && setWalletLogo(connectedWallet[0].image);
        
		}		

	}, [address, walletInUse])




	return (
		<>
			<div className="ConnectWalletStyle" onClick={() => setOpen(true)}>
                  
				{!address ?
					(<div>
						<figure>
							<Wallet />
						</figure>
						<p>Connect Wallet</p>
					</div>
					) : (
						<div>
							<span>{nativeBalance}</span>
							<div className="wallet">
								<figure className="connected">
									<img src={walletLogo} width={20} alt="" />
								</figure>
								<span>{truncateAddress(address)}</span>
							</div>
						</div>
					)
				}

			</div>
		</>
	)
}

export default Wallets;


