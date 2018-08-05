var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


//var http = require('http');
//var net = require('net');

// Postgres connection to DB
var pg = require('pg');
var conString = "postgres://postgres:admin@127.0.0.1/wms";

pg.defaults.poolSize = 1;

/********************************************************************************************/
/*********************************** Database Routes*****************************************/
/********************************************************************************************/

router.get('/wms',function(req,res,next) {
	// get a pg client from the connection pool
 	//this initializes a connection pool
	//it will keep idle connections open for a (configurable) 30 seconds
	//and set a limit of 1 (also configurable)
	pg.connect(conString, function (err, client, done) {
		var handleError = function (err) {
		    // no error occurred, continue with the request
		    if (!err) return false;
		    if (client) {
		        done(client);
		    }
		    res.writeHead(500, { 'content-type': 'text/plain' });
		    res.end('An error occurred');
		    return true;
		};
	    // handle an error from the connection
	    if (handleError(err)) return;	      
	    done();        
	    res.render('wms', { title: 'WMS' , dbConnection: 'Successful'});	
	});  
});


router.get('/ecsconsole',function(req,res,next) {
	pg.connect(conString, function (err, client, done) {
		var handleError = function (err) {
		    // no error occurred, continue with the request
		    if (!err) return false;
		    if (client) {
		        done(client);
		    }
		    res.writeHead(500, { 'content-type': 'text/plain' });
		    res.end('An error occurred');
		    return true;
		};
	    // handle an error from the connection
	    if (handleError(err)) return;	      
	    done();     

		res.render('ecsconsole', { title: 'Cortex Console' , dbConnection: 'Successful'});	
	});  
});
