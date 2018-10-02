require(["dojo/dom","dojo/dom-construct","dojo/on","dojo/request","dojo/aspect","dojox/charting/Chart","dojox/charting/themes/Tom","dojox/charting/plot2d/Lines","dojox/charting/plot2d/Markers",
    "dojox/charting/axis2d/Default","dojo/domReady!"],
    function(dom, domConstruct, on, request, aspect, Chart, theme)
    {
        var invRadio = dom.byId("invChartRadio");
        var orderRadio = dom.byId("orderChartRadio");

        on(invRadio,"change",function(isChecked){
            if(isChecked)
            {
                var chart = dom.byId("chartNode");
                domConstruct.empty(chart);
                updateInventoryChart(request, aspect, Chart, theme);
            }
        });
        on(orderRadio,"change",function(isChecked){
            if(isChecked)
            {
                var chart = dom.byId("chartNode");
                domConstruct.empty(chart);
                updateOrderChart(request, aspect, Chart, theme);
            }
        });
        updateInventoryChart(request, aspect, Chart, theme);
    }
);


function updateInventoryChart(request, aspect, Chart, theme)
{
    request.get("/getInventory",{handleAs: "json"}).then(
        function(result){
            var chartData = [];

            result['data'].forEach(function(elem){
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


function updateOrderChart(request, aspect, Chart, theme)
{
    request.get("/getOrders",{handleAs: "json"}).then(
        function(result){
            var chartData = [];

            result['data'].forEach(function(elem){
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