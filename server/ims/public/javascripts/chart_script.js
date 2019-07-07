require(["dojox/charting/Chart", "dojox/charting/themes/Claro", "dojo/store/Observable", "dojo/store/JsonRest",
"dojox/charting/StoreSeries","dojo/dom","dojo/on", "dojo/dom-construct", "dojo/parser","dojo/store/Memory",
"dijit/form/ComboBox","dijit/registry","dojo/request","dojox/charting/plot2d/Lines","dojox/charting/plot2d/Pie",
"dojox/charting/plot2d/Areas","dojox/charting/plot2d/Bars","dojox/charting/axis2d/Default","dojo/domReady!"], 
function(Chart, theme, Observable, JsonRest, StoreSeries,dom, on, domConstruct, parser, Memory, ComboBox, registry, request)
{
    parser.parse();
    var invRadio = dom.byId("invChartRadio");
    var orderRadio = dom.byId("orderChartRadio"); 
    var minQtyInput = registry.byId('minQtySearch');
    var maxQtyInput = registry.byId('maxQtySearch');
    var filterChartButton = dom.byId('filterChartBtn');

    var stateStore = new Memory({
        data: [
            {name:"LineChart", id:"LC"},
            {name:"PieChart", id:"PC"},
            {name:"AreaChart", id:"AC"},
            {name:"BarsChart", id:"BC"}
        ]
    });

    var comboBox = new ComboBox({
        id: "plotTypeSelect",
        name: "plotType",
        value: "LineChart",
        store: stateStore,
        searchAttr: "name"
    }, "plotTypeSelect").startup();

    on(filterChartButton, "click", function(evt)
    {
        var minQ = parseInt(minQtyInput.get("value"));
        var maxQ = parseInt(maxQtyInput.get("value"));

        // Validate quantity input
        if(isNaN(minQ) || isNaN(maxQ) || minQ > maxQ)
        {
            alert('Invalid input for min and max quantity');
            return;
        }

        var chartType = getChartType(dijit.byId('plotTypeSelect').get('value'));

        var chart = dom.byId("chartNode");
        domConstruct.empty(chart);
        updateInventoryChart(request, Chart, theme, chartType, StoreSeries,Observable,JsonRest,minQ,maxQ);            
    });
    
    /*
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
    */
});


function updateInventoryChart(request, Chart, theme, ChartType, StoreSeries,Observable,JsonRest, minQ, maxQ)
{

    //var chartData = [];
  
    // Create the chart within it's "holding" node
    var chart = new Chart("chartNode");

    // Set the theme
    chart.setTheme(theme);

    // Add the only/default plot
    chart.addPlot("default", {
        type: ChartType,
        markers: true
    });

    // Add axes
    chart.addAxis("x");    
    chart.addAxis("y",{ min: minQ-1, max: maxQ+1, vertical: true, fixLower: "major", fixUpper: "major" });
    
    // Generate target URL based on search parameters
    var targetURL = "/getInventoryWithFilter?minQ=" + minQ + "&maxQ=" + maxQ;

    // Store information in a data store on the client side
    var store = Observable(new JsonRest({
        target: targetURL
    }));

    /*
    // query the store
    //var results = store.query({ "id" : "3"});    
    var results = store.query({});    
    
    // do something with the initial result set
    results.forEach(function(el,ind) {
        if(ind < 10)
            console.log(el);
    });
    */

    // Add the storeseries - Query for all data
    //chart.addSeries("y", new StoreSeries(store, { query: { "id" : "3" } }, "quantity"));    
    chart.addSeries("y", new StoreSeries(store,{}, "quantity"));

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

function getChartType(plotSelection)
{
    if(plotSelection == "LineChart")
        return "Lines";
    else if(plotSelection == "PieChart")
        return "Pie";
    else if(plotSelection == "AreaChart")
        return "Areas";
    else if(plotSelection == "BarsChart")
        return "Bars";
}