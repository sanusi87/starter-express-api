'use strict';
const fs = require("fs");
const child_process = require("child_process");
const moment = require("moment");

module.exports.index = (req, res) => {
	res.render('files_index.html', {
		
	});
}

module.exports.files_list = (req, res) => {
	if( req.method.toLowerCase() === 'get' ){
		// fs.readdir("./public/tmp/", (err, files) => {
		// 	if( err ){
		// 		res.json({
		// 			status: 0,
		// 			message: err.toString()
		// 		});
		// 	}else{
		// 		res.json({
		// 			status: 1,
		// 			message: 'Files found!',
		// 			data: files
		// 		});
		// 	}
		// });

		child_process.exec("ls -t ./public/tmp |head -n 20", (err, content) => {
			if( err ){
				res.json({
					status: 0,
					message: err.toString()
				});
			}else{
				// console.log( content );
				var files = content.trim().split("\n");
				var nFiles = [];

				__loop();
				function __loop(){
					if( files.length > 0 ){
						fs.stat( `./public/tmp/${files[0]}`, (err, stats) => {
							if( err ){
								console.log(`./public/tmp/${files[0]}`, err);
							}else{
								var birthDate = moment(stats.birthtime);
								nFiles.push({
									name: files[0],
									created_at: birthDate.format("YYYY-MM-DD HH:mm:ss")
								});
							}

							files.splice(0,1);
							__loop();
						});
					}else{
						res.json({
							status: 1,
							message: 'Files found!',
							data: nFiles
						});
					}
				}
			}
		});
	}else if( req.method.toLowerCase() === 'delete' ){
		fs.unlink( `./public/tmp/${req.params.filename}`, (err) => {
			if( err ){
				res.json({
					status: 0,
					message: err.toString()
				});
			}else{
				res.json({
					status: 1,
					message: `File ${req.params.filename} deleted successfully.`
				});
			}
		});
	}else{
		res.json({
			status: 0,
			message: 'Request method not handled!'
		});
	}
}