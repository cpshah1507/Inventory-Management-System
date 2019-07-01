require(["dojo/dom","dojo/on","dojo/dom-construct","dojo/parser","dijit/registry", "dojo/_base/declare","dgrid/Grid","dgrid/Keyboard","dgrid/Selection","dijit/layout/TabContainer", 
"dijit/layout/ContentPane","dojo/request","dojo/aspect","dstore/Memory","dstore/RequestMemory","dgrid/OnDemandGrid",
"dojo/parser", "dijit/form/TextBox", "dijit/form/Button","dijit/registry","dojo/domReady!"],
    function(dom, on, domConstruct, parser, registry, declare, Grid, Keyboard, Selection, TabContainer, ContentPane, request,
        aspect, Memory,RequestMemory, OnDemandGrid, Button)
{

    parser.parse();
    // Search button functionality
    var searchButton = dom.byId('searchInputBtn');
    var searchBoxInput = registry.byId('searchInput');

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
        domConstruct.empty("InventoryTable");
        updateInvetory(declare,RequestMemory,OnDemandGrid, Keyboard, Selection, request,"/getInventory");   
    });

    aspect.after(cp2, "_onShow", function() {
        searchBoxInput.set("value","");
        domConstruct.empty("OrderTable");
        updateOrders(declare,RequestMemory,OnDemandGrid, Keyboard, Selection, request);
    });

    updateInvetory(declare,RequestMemory,OnDemandGrid, Keyboard, Selection,request,"/getInventory");
    
    

    on(searchButton, "click", function(evt)
    {
        domConstruct.empty("InventoryTable");
        updateInvetory(declare,RequestMemory,OnDemandGrid, Keyboard, Selection,request,"/searchInventoryBySKU?searchParam=" + searchBoxInput.get("value"));
    });

});

function updateInvetory(declare, RequestMemory,OnDemandGrid, Keyboard, Selection, request, requestURL)
{
    // Create a new constructor by mixing in the components
    //var CustomGrid = declare([ Grid, Keyboard, Selection ]);
        
    var grid = new OnDemandGrid({
        collection: new RequestMemory({ target: requestURL }),
        columns: {
            id: 'ID',
            sku: 'SKU',
            quantity: 'Quantity',
            location: 'Location'
        },
        loadingMessage: "Loading...",
        errorMessage: "Error loading.",
        noDataMessage: 'No results found.',
        selectionMode: 'single'
        //,
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
    /*
    grid.on('.dgrid-row:click', function (event) {
        var row = grid.row(event);
        console.log('Row clicked:', row.id);
    }); 
    */
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
        },
        loadingMessage: "Loading...",
        errorMessage: "Error loading.",
        noDataMessage: 'No results found.'
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