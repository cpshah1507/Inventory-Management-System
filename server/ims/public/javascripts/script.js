require(["dgrid/Grid","dijit/layout/TabContainer", "dijit/layout/ContentPane", "dojo/request","dojo/aspect", "dojo/domReady!"],
    function(Grid, TabContainer, ContentPane, request, aspect){
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
        updateInvetory(Grid, request);   
    });

    aspect.after(cp2, "_onShow", function() {
        updateOrders(Grid, request);
    });

    updateInvetory(Grid,request);
});

function updateInvetory(Grid, request)
{
    request.get("/getInventory",{handleAs: "json"}).then(
        function(result){
            var grid = new Grid({
                columns: {
                    id: 'ID',
                    sku: 'SKU',
                    quantity: 'Quantity',
                    location: 'Location'
                }
            }, 'InventoryTable');
            grid.renderArray(result['data']);    
        },
        function(error){
            console.log("An error occurred: " + error);
        }
    );
}

function updateOrders(Grid, request)
{
    request.get("/getOrders",{handleAs: "json"}).then(
        function(result){
            var grid = new Grid({
                columns: {
                    orderline: 'OrderLine',
                    sku: 'SKU',
                    quantity: 'Quantity',
                    orderstate: 'Order State'
                }
            }, 'OrderTable');
            grid.renderArray(result['data']);    
        },
        function(error){
            console.log("An error occurred: " + error);
        }
    );
}