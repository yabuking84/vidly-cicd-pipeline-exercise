function currency(num){
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function price(num){
    return parseFloat(num).toFixed(2);
}

export default {
    currency,
    price
};