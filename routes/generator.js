'use strict';

const PDFDocument = require('pdfkit');
const fs = require("fs");
const xl = require('excel4node');

module.exports.pdf = (req, res) => {
	if( req.method.toLowerCase() == 'get' ){
		res.render('generator_pdf.html', {
		
		});
	}else if( req.method.toLowerCase() == 'post' ){
		// console.log(req.body);

		const doc = new PDFDocument({size: 'A4'});
		var tmpFileName = `file_${(new Date()).getTime()}.pdf`;
		var tmpFilePath = `./public/tmp/${tmpFileName}`;
		var stream = doc.pipe(fs.createWriteStream( tmpFilePath ));
		doc.fontSize( req.body.font_size );

		if( req.body.content.length > 0 ){
			var lineHeight = 13;
			for(var i in req.body.content){
				doc.text(req.body.content[i], 56, 81+( lineHeight * parseInt(i) ) );
			}
		}else{
			doc.text('xxxx', 56, 81);
		}
		
		doc.end();
		stream.on('finish', () => {
			fs.readFile( tmpFilePath, (err, __content) => {
				if( err ){
					res.json({
						status: 0,
						message: err.toString()
					});
				}else{
					// res.setHeader('Content-Type', 'application/octet-stream');
					// res.setHeader('Content-Length', __content.length);
					// res.setHeader('Content-Disposition', 'inline;filename='+tmpFileName);
					// res.end(__content);

					res.json({
						status: 1,
						file: `/tmp/${tmpFileName}`
					});
				}
			});
		});
	}else{
		res.json({
			status: 0,
			message: 'Request method not handled!'
		});
	}
}

module.exports.xlsx = (req, res) => {
	if( req.method.toLowerCase() == 'get' ){
		res.render('generator_xlsx.html', {
		
		});
	}else if( req.method.toLowerCase() == 'post' ){
		var wb = new xl.Workbook();
		var style = wb.createStyle({
		font: {
			color: '#000000',
			size: req.body.font_size,
		}
		});
		var ws = wb.addWorksheet("Sheet 1");
		//////// header

		var noOfColumns = parseInt( req.body.no_of_columns );
		if( isNaN( noOfColumns ) || noOfColumns <= 0 ){
			noOfColumns = 4;
		}

		var headerContent = {};
		for(var x=0; x < noOfColumns; x++) {
			headerContent[`column_${x+1}`] = `column_${x+1}`;
		}

		//////// header
		var rowCount = 1;
		var counter = 1;
		for(var i in headerContent){
			ws.cell(rowCount, counter).string( headerContent[i] ).style(style);
			counter++;
		}
		rowCount += 1;

		var noOfRows = parseInt( req.body.no_of_rows );
		if( isNaN( noOfRows ) || noOfRows < 0 ){
			noOfRows = 12;
		}

		for( var i=0; i < noOfRows; i++ ){
			var counter2= 1;
			for(var j in headerContent){
				ws.cell(rowCount, counter2).string( `${rowCount} x ${counter2}` ).style(style);
				counter2++;
			}
			rowCount += 1;
		}

		var tmpFileName = `file_${(new Date()).getTime()}.xlsx`;
		var tmpFilePath = `./public/tmp/${tmpFileName}`;
		wb.write(tmpFilePath, (err) => {
			if( err ){
				res.json({
					status: 0,
					message: err.toString()
				});
			}else{
				res.json({
					status: 1,
					file: `/tmp/${tmpFileName}`
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