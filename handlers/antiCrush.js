module.exports = (client) => {
    process.on('unhandledRejection', (reason, p) => {
        client.loger.log(' [antiCrash] :: Unhandled Rejection/Catch');
         client.loger.log(reason, p);
     });
     process.on("uncaughtException", (err, origin) => {
        client.loger.log(' [antiCrash] :: Uncaught Exception/Catch');
        client.loger.log(err);
     }) 
     process.on('uncaughtExceptionMonitor', (err, origin) => {
        client.loger.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        client.loger.log(err, origin);
     });
     process.on('multipleResolves', (type, promise, reason) => {
        client.loger.log(' [antiCrash] :: Multiple Resolves');
        client.loger.log(type, promise, reason);
     });
 }