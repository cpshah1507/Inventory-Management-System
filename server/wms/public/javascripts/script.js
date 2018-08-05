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
				"columns": [{"data":"id"},{"data":"orderline"},{"data":"sku"},{"data":"quantity"}]
			});
			dataTablesLoaded.push("OrderTable");
		}
    });
});

