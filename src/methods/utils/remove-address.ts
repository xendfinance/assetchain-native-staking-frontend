import _const from '../_const';

function removeAddress() {
    sessionStorage.removeItem(_const.TOKEN);
}

export default removeAddress;
