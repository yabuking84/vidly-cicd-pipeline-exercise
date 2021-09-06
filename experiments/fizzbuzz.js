
function fizzbuzz(arg){
    if(typeof arg !== 'number')
    throw new Error('Input should be a number.');

    if(arg % 3 === 0 && arg % 5 === 0)
    return 'Fizzbuzz';

    if(arg % 3 === 0)
    return 'Fizz';

    if(arg % 5 === 0)
    return 'Buzz';

    return arg;

}


export default fizzbuzz;