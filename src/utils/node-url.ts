import random from 'lodash/random';

// Array of available nodes to connect to
export const nodes = ["https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed.binance.org"];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getNodeUrl = () => {
    const randomIndex = random(0, nodes.length - 1);
    return nodes[randomIndex];
};

export default getNodeUrl;
