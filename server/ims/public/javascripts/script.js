/*
require(["dojo/request", "dojo/domReady!"], function(request){
    request("/getInventory").then(
        function(data){
            rows = data.data;
        },
        function(error){
            console.log("An error occurred: " + error);
        }
    );
});
*/

require(["dgrid/Grid","dijit/layout/TabContainer", "dijit/layout/ContentPane", "dojo/domReady!"], function(Grid, TabContainer, ContentPane){
    var tc = new TabContainer({
        style: "height: 100%; width: 100%;"
    }, "tabs");

    var cp1 = new ContentPane({
         title: "Inventory",
         content: "<div id='InventoryTable'></div>"
    });
    tc.addChild(cp1);

    var cp2 = new ContentPane({
         title: "Orders",
         content: "<div id='OrderTable'></div>"
    });
    tc.addChild(cp2);

    tc.startup();

    var data = [
        { first: 'Bob', last: 'Barker', age: 89 },
        { first: 'Vanna', last: 'White', age: 55 },
        { first: 'Pat', last: 'Sajak', age: 65 }
    ];
 
    var grid = new Grid({
        columns: {
            first: 'First Name',
            last: 'Last Name',
            age: 'Age'
        }
    }, 'InventoryTable');
    grid.renderArray(data);    
});

// jQuery Data Table Code
/*
$( function() {
    $( "#tabs" ).tabs({
    	create: function(event,ui)
    	{
    		$('#InventoryTable').DataTable({
				"ajax": "/getInventory",
				"columns": [{"data":"id"},{"data":"sku"},{"data":"quantity"},{"data":"location"}]
			});
    	}
    });

    dataTablesLoaded = []

    $('.ordersTab').click(function(){
    	if($.inArray("OrderTable",dataTablesLoaded) === -1)
    	{
	    	$('#OrderTable').DataTable({
				"ajax": "/getOrders",
				"columns": [{"data":"id"},{"data":"orderline"},{"data":"sku"},{"data":"quantity"},{"data":"orderstate"}]
			});
			dataTablesLoaded.push("OrderTable");
		}
    });
});
*/