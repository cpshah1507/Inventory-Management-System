require(["dgrid/Grid","dijit/layout/TabContainer", "dijit/layout/ContentPane", "dojo/request","dojo/aspect","dijit/form/Button", "dojo/domReady!"],
    function(Grid, TabContainer, ContentPane, request, aspect, Button){

    var button1 = new Button({
        label: "Overview",
        onClick: function(){ console.log("First button was clicked!"); }
    }, "btn1");
    button1.startup();

    var button2 = new Button({
        label: "Charts",
        onClick: function(){ console.log("Second button was clicked!"); }
    }, "btn2");
    button2.startup();

    var button3 = new Button({
        label: "Details",
        onClick: function(){ console.log("Third button was clicked!"); }
    }, "btn3");
    button3.startup();


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