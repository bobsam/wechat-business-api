module.exports = function(koaApp){
	koaApp.proxy = true;
	// app.mongoose.Promise = global.Promise;
	
	// if(process.env.NODE_ENV != 'test'){
	// 	app.mongoose.connect(app.config.mongodb); 
	// }

	// 特殊异常补log
	process.on('unhandledRejection', function (reason, promise) {
		app.logger.error('unhandledRejection',{reason,promise});
	})

	process.on('uncaughtException', function(err) {
		app.logger.error('uncaughtException',{err});
	})
};