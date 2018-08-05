var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

//var http = require('http');
//var net = require('net');

// Postgres connection to DB
var pg = require('pg');
var conString = "postgres://postgres:admin@127.0.0.1/wms";

pg.defaults.poolSize = 1;

/********************************************************************************************/
/*********************************** Database Routes*****************************************/
/********************************************************************************************/

router.get('/',function(req,res,next) {
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




// Get Inventory Table data
router.get('/getInventory',function(req,res,next) {			
	pg.connect(conString, function (err, client, done)
	{
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

	    // Set Search Path
	    client.query("SELECT * FROM Inventory", function(err,result)
	    {
	    	// handle an error from the query
			if(err)
				console.log(err);

		    if (handleError(err)) return;	
		    
		     done();	        		    
		    res.setHeader('Content-Type', 'application/json');    		
    		res.send(result);		        		    		    
	    });
	});	
});


module.exports = router;

