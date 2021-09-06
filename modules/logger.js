import winston from 'winston';
import winstonMongodb from 'winston-mongodb';



const format = winston.format;

const printFormat = format.printf((info) => {
    const log = `[${info.timestamp}] ${info.level}: (${info.label}) ${info.message}`;
  
    return info.stack ? `${log} ${info.stack}` : log;
});
  


const logger = winston.createLogger({
    level: 'info',
    meta: true,   
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({ 
            level: 'info',
            filename: 'logs/winston/all.log',
            format: format.combine(
                // format.errors({ stack: true }), // <-- needed if you want error stack on printFormat
                format.timestamp(), // <-- needed if you want timestamp on printFormat
                // format.json() // <-- not sure it works with printFormat
                printFormat
            )
        }),
        new winston.transports.File({ 
            name: 'error', 
            filename: 'logs/winston/errors.log',
            level: 'error',
            format: format.combine(
                format.errors({ stack: true }), // <-- use errors format
                format.timestamp(),
                format.json()
                // printFormat // <-- commented out because it will log as what printFormat function states
            )
        }),
        new winston.transports.MongoDB({
            db: 'mongodb://mongodb/vidly',
            options: {
                'useNewUrlParser': true,
                'useUnifiedTopology': true
            },
            metaKey:'meta',
            level: 'error',
            format: format.combine(
                printFormat
            )
        })
    ]
});


function error(error){
    
    logger.log({
        level: 'error',
        label: error.name,
        message: error.message,
        meta: {
            stack: error.stack
        }
    });

}

function initHandleExceptions(){

    // handle UncaughtException Errors
    process.on('uncaughtException',(ex)=>{
        logger.error(ex);
        // process.exit(1);
    });

    // handle UnhandledRejection Errors
    process.on('unhandledRejection',(ex)=>{
        logger.error(ex);
        // process.exit(1);
    });

}

export default {
    error,
    initHandleExceptions
};