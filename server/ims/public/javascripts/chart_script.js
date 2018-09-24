require(["dojo/request","dojo/aspect","dojox/charting/Chart","dojox/charting/themes/Tom","dojox/charting/plot2d/Columns","dojox/charting/plot2d/Markers",
    "dojox/charting/axis2d/Default","dojo/domReady!"],
    function(request, aspect, Chart, theme)
    {
        // Define the data
        var chartData = [10000,9200,11811,12000,7662,13887,14200,12222,12000,10009,11288,12099];

        // Create the chart within it&#x27;s "holding" node
        var chart = new Chart("chartNode");

        // Set the theme
        chart.setTheme(theme);

        // Add the only/default plot
        chart.addPlot("default", {
            type: "Columns",
            markers: true,
            gap: 5
        });

        // Add axes
        chart.addAxis("x");
        chart.addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major" });

        // Add the series of data
        chart.addSeries("Monthly Sales",chartData);

        // Render the chart!
        chart.render();
    }
);




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