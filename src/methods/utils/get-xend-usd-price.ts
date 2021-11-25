import axios from 'axios';

export const getCoinGeckoPrice = async (coinId: string) => {
	try {

		let url = "https://api.coingecko.com/api/v3/coins/markets"

		const res = await axios.get(url, {
			params: {
				vs_currency: "usd",
				ids: coinId,
				order: "market_cap_desc",
				per_page: 5,
				page: 1,
				sparkline: false
			}
		})

		const data = res.data;
		if (Array.isArray(data) && data.length > 0) {
			let currentPrice = data[0].current_price
			return currentPrice;
		} else return null;

	} catch (e) {
		return null;
	}
}