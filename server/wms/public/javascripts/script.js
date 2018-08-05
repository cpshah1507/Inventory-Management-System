var tableData = [["1","SKU1","3","Loc-1"],["2","SKU2","5","Loc-2"];

$( function() {
    $( "#tabs" ).tabs();

	$('#InventoryTable').DataTable({
	    data: tableData
	});
});

