// formats numbers as currency using javascrips toLocaleString function on a string value
function commas(x?: any, decimal?: number) {
    if (x && decimal) {
        return parseFloat(String(x).match(/^-?\d+(?:\.\d{0,2})?/)[0]).toLocaleString('en', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    } else if (x) {
        return parseFloat(String(x).match(/^-?\d+(?:\.\d{0,4})?/)[0]).toLocaleString('en', { maximumFractionDigits: 4, minimumFractionDigits: 4 });
    } else return '0.00';
   
}

export default commas;

//parseFloat(String(x)).toLocaleString('en', { maximumFractionDigits: 2, minimumFractionDigits: 2 });