/**
 * This function is exposes web3 with the right provider 
 */

async function exposedWeb3() {
	try {

		const web3Instance = window.APPWEB3;
		return web3Instance

	} catch (err) {
		console.error(err)
		const web3Instance = window.APPWEB3;
		return web3Instance
	}

}

export default exposedWeb3;
