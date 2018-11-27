require(["dojox/charting/Chart", "dojox/charting/themes/Tom", "dojo/store/Observable", "dojo/store/JsonRest", "dojox/charting/StoreSeries",
"dojo/dom","dojo/dom-construct","dojo/on", "dojo/request","dojox/charting/plot2d/Lines",
"dojox/charting/axis2d/Default", "dojo/domReady!"], 
					function(Chart, theme, Observable, JsonRest, StoreSeries,dom, domConstruct, on, request) {

//require(["dojo/dom","dojo/dom-construct","dojo/on","dojo/request","dojox/charting/Chart","dojox/charting/themes/Tom","dojox/charting/plot2d/Lines",
//"dojox/charting/plot2d/Markers","dojox/charting/axis2d/Default","dojox/charting/StoreSeries","dojo/store/Observable","dojo/store/Memory","dojo/domReady!"],
//    function(dom, domConstruct, on, request, Chart, theme, StoreSeries,Observable,Memory)
 //   {
        var invRadio = dom.byId("invChartRadio");
        var orderRadio = dom.byId("orderChartRadio");

        on(invRadio,"change",function(isChecked){
            if(isChecked)
            {
                var chart = dom.byId("chartNode");
                domConstruct.empty(chart);
                updateInventoryChart(request, Chart, theme,StoreSeries,Observable,JsonRest);
            }
        });
        on(orderRadio,"change",function(isChecked){
            if(isChecked)
            {
                var chart = dom.byId("chartNode");
                domConstruct.empty(chart);
                updateOrderChart(request, Chart, theme,StoreSeries,Observable,JsonRest);
            }
        });
        updateInventoryChart(request, Chart, theme,StoreSeries,Observable,JsonRest);
    }
);


function updateInventoryChart(request, Chart, theme,StoreSeries,Observable,JsonRest)
{

    //var chartData = [];
  
    // Create the chart within it's "holding" node
    var chart = new Chart("chartNode");

    // Set the theme
    //chart.setTheme(theme);

    // Add the only/default plot
    chart.addPlot("default", {
        type: "Lines",
        markers: true
    });

    // Add axes
    chart.addAxis("x");
    chart.addAxis("y",{ min: 1, max: 20, vertical: true, fixLower: "major", fixUpper: "major" });
    
    // Store information in a data store on the client side
    var store = Observable(new JsonRest({
        target: "/getInventory"
    }));

    // query the store
    var results = store.query({"id":3});
    
    // do something with the initial result set
    results.forEach(function(el,ind) {
        if(ind < 10)
            console.log(el);
    });

    // Add the storeseries - Query for all data
    chart.addSeries("y", new StoreSeries(store, { query: { "id" : "3" } }, "quantity"));
    // Render the chart!
    chart.render();

    //chart.addSeries("y2", new StoreSeries(store, { query: { site: 2 } }, "value"));
    //var store_sample = new RequestMemory({ target: '/getInventory' });
    //chart.addSeries("y", new StoreSeries(store_sample, { query: { quantity: 1 } },"quantity"));

    //chart.addSeries("SKU Quantity",chartData);
    /*
    request.get("/getInventory",{handleAs: "json"}).then(
        function(result){
            
        },
        function(error){
            console.log("An error occurred: " + error);
        }
    );
    */
}


function updateOrderChart(request, Chart, theme,RequestMemory,StoreSeries,Observable,JsonRest)
{
    request.get("/getOrders",{handleAs: "json"}).then(
        function(result){
            var chartData = [];

            result.forEach(function(elem){
                chartData.push(elem['quantity']);
            });

            // Create the chart within it&#x27;s "holding" node
            var chart = new Chart("chartNode");

            // Set the theme
            //chart.setTheme(theme);

            // Add the only/default plot
            chart.addPlot("default", {
                type: "Lines",
                markers: true
            });

            // Add axes
            chart.addAxis("x");
            chart.addAxis("y",{ min: 1, max: 20, vertical: true, fixLower: "major", fixUpper: "major" });

            // Add the series of data
            chart.addSeries("SKU Quantity",chartData);
        
            // Render the chart!
            chart.render();
        },
        function(error){
            console.log("An error occurred: " + error);
        }
    );
}