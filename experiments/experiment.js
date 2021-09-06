// Debugger
import debug from '../modules/debug.js';


function returnClass(){
    return TestClass;
}


class TestClass {
    constructor(str){
        this.vars = str;
    }
}


const Yo = returnClass();

var hey1 = new Yo('111');
var hey2 = new Yo('2');

debug.start(hey1.vars);
debug.start(hey2.vars);
  

// asdsd