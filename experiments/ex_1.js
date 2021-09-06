import ex2 from './ex_2.js';

function action_ex1(arg){
    console.log(`ex1.js ${arg}`);
    ex2.action_ex2('from ex1.js');
}

export default {
    action_ex1
};