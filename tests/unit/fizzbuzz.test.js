// this is needed because ES6 modules is being used
import {jest} from '@jest/globals';

import fizzbuzz from '../../experiments/fizzbuzz.js';
import lib from '../../experiments/jest-mock/lib.js';
import mail from '../../experiments/jest-mock/mail.js';
import db from '../../experiments/jest-mock/db.js';


// you should create it() more or equal to execution paths
describe('fizzbuzz()',()=>{
    it('should throw Error if input type is not a number',()=>{
        expect(()=>{
            fizzbuzz('5000');
        }).toThrow();
    });

    it('should return Fizzbuzz if input is divisible by 3 and 5',()=>{
        const rslt = fizzbuzz(15);
        expect(rslt).toBe('Fizzbuzz');
    });

    it('should return Fizz if input is divisible by 3',()=>{
        const rslt = fizzbuzz(9);
        expect(rslt).toBe('Fizz');
    });

    it('should return Buzz if input is divisible by 5',()=>{
        const rslt = fizzbuzz(10);
        expect(rslt).toBe('Buzz');
    });

    it('should return input if not divisible by 3 or 5',()=>{
        const rslt = fizzbuzz(7);
        expect(rslt).toBe(7);
    });
});


// Mock functions
describe('Mock Functions', ()=>{

    // this will test lib.notifyCustomer() if mail.send() was called, hence mailSent variable
    it('should send and email to the customer',()=>{
        
        db.getCustomerSync = function(id) {
            return {id:id,email:'b@c.com'};
        };

        const customer = db.getCustomerSync(1);

        // this will replace mail.send() inside lib.notifyCustomer()'s' 
        let mailSent = false;
        mail.send = function(email,message){
            mailSent = true;
        };
        
        lib.notifyCustomer({
            orderId:123,
            customerId: customer.id,
            email: customer.email
        });

        expect(mailSent).toBe(true);
    });
});


// Jest Mock functions
describe('Jest Mock Functions', ()=>{

    // this will test lib.notifyCustomer() if mail.send() was called
    it('should send and email to the customer',()=>{
        
        db.getCustomerSync = jest.fn().mockReturnValue({id:1,email:'b@c.com'});
        const customer = db.getCustomerSync(1);

        // this will replace mail.send() inside lib.notifyCustomer()'s' 
        mail.send = jest.fn();

        
        lib.notifyCustomer({
            orderId:123,
            customerId: customer.id,
            email: customer.email
        });

        // use this to mock call with parameters, 
        // but this will work well with numbers, boolean than strings
        // expect(mail.send).toHaveBeenCalledWith('email','message..');
        
        // this will check if 'b@c.com' and 'Order was placed successfully!' was passed
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('b@c.com');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/i); // <-- i means case insensitive
    });
});