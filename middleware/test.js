// Debugger
import debug from '../modules/debug.js';

function test(req,res,next){
    debug.start('middleware test...');
    next();
}

const var1 = "var1xxx";
const var2 = "var2xxcc";


export {var1,var2};
export default test;