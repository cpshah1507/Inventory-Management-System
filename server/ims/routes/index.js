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
var conString = "postgres://postgres:admin@127.0.0.1/ims";

pg.defaults.poolSize = 1;

var ECT = require('ect');
var path = require('path');
// view engine setup
var renderer = ECT({
    root: path.join(__dirname, '/../views'),
    ext: '.ect'
});

router.get('/',routeHome);
router.get('/overview',routeHome);

function routeHome(req,res,next)
{
	// Get a pg client from the connection pool
 	// this initializes a connection pool
	// it will keep idle connections open for a (configurable) 30 seconds
	// and set a limit of 1 (also configurable)
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
	    renderer.render('index', { title: 'IMS' , dbConnection: 'Successful'},function(err,html){
	        if (err)
	        {
	            console.log("Error" + err);
	        }
	        res.end(html);
	    });	
	});  
}

router.get('/charts',function(req,res,next){
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
	    renderer.render('charts', { title: 'IMS' , dbConnection: 'Successful'},function(err,html){
	        if (err)
	        {
	            console.log("Error" + err);
	        }
	        res.end(html);
	    });	
	});
});

router.get('/details',function(req,res,next){
	renderer.render('details', function(err,html){
		if (err)
		{
			console.log("Error" + err);
		}
		res.end(html);
	});	
});

/********************************************************************************************/
/*********************************** Database Routes*****************************************/
/********************************************************************************************/

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
		    final_result = {"data":result.rows};
			//res.send(final_result);		    			  		    		    
    		res.send(result.rows);
	    });
	});	
});

// Get Inventory Table data with filter for chart
router.get('/getInventoryWithFilter',function(req,res,next) {			
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

		var minQ = req.query.minQ;
		var maxQ = req.query.maxQ;
		console.log("minQ: " + minQ + ", maxQ:" + maxQ);

		var dbQuery = "SELECT * FROM Inventory where quantity >= " + minQ + " and quantity <= " + maxQ;
		console.log(dbQuery);
	    // Set Search Path
	    client.query(dbQuery, function(err,result)
	    {
	    	// handle an error from the query
			if(err)
				console.log(err);

		    if (handleError(err)) return;	
			
		    done();	        		    
		    res.setHeader('Content-Type', 'application/json');    	
		    final_result = {"data":result.rows};
			//res.send(final_result);		    			  		    		    
    		res.send(result.rows);
	    });
	});	
});

// Get Inventory Details
router.get('/getInventoryDetails',function(req,res,next) {			
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

		var skulabel = req.query.sku;

	    // Set Search Path
	    client.query("SELECT * FROM Inventory where sku='" + skulabel +"'", function(err,result)
	    {
	    	// handle an error from the query
			if(err)
				console.log(err);

		    if (handleError(err)) return;	
		    
		     done();	        		    
		    res.setHeader('Content-Type', 'application/json');    	
		    final_result = {"data":result.rows};
			//res.send(final_result);		    			  		    		    
    		res.send(result.rows);
	    });
	});	
});

// Get Inventory Table data based on search query
router.get('/searchInventoryBySKU',function(req,res,next) {			
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

		var searchQuery = req.query.searchParam;
		//console.log("SearchParam: " + searchQuery);

		var dbQuery = "SELECT * FROM Inventory where SKU ilike '" + searchQuery + "%'"; 
		console.log(dbQuery);
	    // Set Search Path
	    client.query(dbQuery, function(err,result)
	    {
	    	// handle an error from the query
			if(err)
				console.log(err);

		    if (handleError(err)) return;	
		    
		     done();	        		    
		    res.setHeader('Content-Type', 'application/json');    	
		    final_result = {"data":result.rows};
			//res.send(final_result);				
    		res.send(result.rows);
	    });
	});	
});

// Get Order Table data
router.get('/getOrders',function(req,res,next) {			
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
	    client.query("SELECT * FROM Orders", function(err,result)
	    {
	    	// handle an error from the query
			if(err)
				console.log(err);

		    if (handleError(err)) return;	
		    
		     done();	        		    
		    res.setHeader('Content-Type', 'application/json');    	
		    final_result = {"data":result.rows};
    		//res.send(final_result);		
    		res.send(result.rows);        		    		    
	    });
	});	
});

module.exports = router;

