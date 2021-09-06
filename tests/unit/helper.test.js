import helper from '../../modules/helper.js';

describe('currency()',()=>{
    it('should round to 2 decimal points as currency',()=>{
        let result = helper.currency(20.005);
        expect(result).toBe(20.01);

        result = helper.currency(20.013);
        expect(result).toBe(20.01);
    });
});