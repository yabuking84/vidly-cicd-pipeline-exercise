import ex1 from './ex_1.js';
import ex2 from './ex_2.js';

ex2.action_ex2 = function(){
    console.log('replaced in ex3.js');
};

ex1.action_ex1('from ex3.js');