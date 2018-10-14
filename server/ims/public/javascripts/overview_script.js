require(["dojo/_base/declare","dgrid/Grid","dgrid/Keyboard","dgrid/Selection","dijit/layout/TabContainer", "dijit/layout/ContentPane",
    "dojo/request","dojo/aspect","dstore/Memory","dstore/RequestMemory","dgrid/OnDemandGrid", "dojo/domReady!"],
    function(declare, Grid, Keyboard, Selection, TabContainer, ContentPane, request, aspect, Memory,RequestMemory, OnDemandGrid){

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

    aspect.after(cp1, "_onShow", function() {
        updateInvetory(declare,RequestMemory,OnDemandGrid, Keyboard, Selection, request);   
    });

    aspect.after(cp2, "_onShow", function() {
        updateOrders(declare,RequestMemory,OnDemandGrid, Keyboard, Selection, request);
    });

    updateInvetory(declare,RequestMemory,OnDemandGrid, Keyboard, Selection,request);

    /*
    var employees = [
            {name:'Jim', department:'accounting'},
            {name:'Bill', department:'engineering'},
            {name:'Mike', department:'sales'},
            {name:'John', department:'sales'}
        ];
    var employeeStore = new Memory({data:employees, idProperty: 'name'});
    var salesEmployees = employeeStore.filter({department:'sales'});
    salesEmployees.forEach(function(employee){
        // this is called for each employee in the sales department
        console.log(employee.name);
    });
    */


});

function updateInvetory(declare, RequestMemory,OnDemandGrid, Keyboard, Selection, request)
{
    // Create a new constructor by mixing in the components
    //var CustomGrid = declare([ Grid, Keyboard, Selection ]);
    
    var grid = new OnDemandGrid({
    collection: new RequestMemory({ target: '/getInventory' }),
    columns: {
        id: 'ID',
        sku: 'SKU',
        quantity: 'Quantity',
        location: 'Location'
    }
    //,
    //selectionMode: 'single',
    // for Keyboard; allow only row-level keyboard navigation
    //cellNavigation: false
    }, 'InventoryTable');
    grid.on('dgrid-select', function (event) {
        // Report the item from the selected row to the console.
        console.log('Row selected: ', event.rows[0].data);
    });
    grid.on('dgrid-deselect', function (event) {
        console.log('Row de-selected: ', event.rows[0].data);
    });
    grid.on('.dgrid-row:click', function (event) {
        var row = grid.row(event);
        console.log('Row clicked:', row.id);
    }); 
    grid.startup();
}

function updateOrders(declare, RequestMemory,OnDemandGrid, Keyboard, Selection, request)
{
     // Create a new constructor by mixing in the components
    //var CustomGrid = declare([ Grid, Keyboard, Selection ]);

    var grid = new OnDemandGrid({
        collection: new RequestMemory({ target: '/getOrders' }),
        columns: {
            orderline: 'OrderLine',
            sku: 'SKU',
            quantity: 'Quantity',
            orderstate: 'Order State'
        }
        //,
        //selectionMode: 'single',
        // for Keyboard; allow only row-level keyboard navigation
        //cellNavigation: false
    }, 'OrderTable');
    grid.on('dgrid-select', function (event) {
        // Report the item from the selected row to the console.
        console.log('Row selected: ', event.rows[0].data);
    });
    grid.on('dgrid-deselect', function (event) {
        console.log('Row de-selected: ', event.rows[0].data);
    });
    grid.startup();
}