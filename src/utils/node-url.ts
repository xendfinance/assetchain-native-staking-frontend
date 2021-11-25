import random from 'lodash/random';

// Array of available nodes to connect to
export const nodes = ["https://data-seed-prebsc-1-s1.binance.org:8545"];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getNodeUrl = () => {
    const randomIndex = random(0, nodes.length - 1);
    return nodes[randomIndex];
};

export default getNodeUrl;
