import _const from '../_const';

/**
 * Returns the string of the logged in clients address
 */
function retrieveAddress(): string {
    const token = sessionStorage.getItem(_const.TOKEN);
    if (token) {
        return token;
    } else return '';
}

export default retrieveAddress;
