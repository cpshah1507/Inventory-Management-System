require(["dojox/charting/Chart", "dojox/charting/themes/Claro", "dojo/store/Observable", "dojo/store/Memory", "dojox/charting/StoreSeries", "dojox/charting/plot2d/Lines",
"dojox/charting/axis2d/Default", "dojo/domReady!"], 
					function(Chart, Claro, Observable, Memory, StoreSeries) {
				
    // Initial data
    var data = [
        // This information, presumably, would come from a database or web service
        { id: 1, value: 20, site: 1 },
        { id: 2, value: 16, site: 1 },
        { id: 3, value: 11, site: 1 },
        { id: 4, value: 18, site: 1 },
        { id: 5, value: 26, site: 1 },
        { id: 6, value: 19, site: 2 },
        { id: 7, value: 20, site: 2 },
        { id: 8, value: 28, site: 2 },
        { id: 9, value: 12, site: 2 },
        { id: 10, value: 4, site: 2 }
    ];
    
    
    // Create the data store
    // Store information in a data store on the client side
    var store = Observable(new Memory({
        data: {
            identifier: "id",
            label: "Users Online",
            items: data
        }
    }));
    
    // Create the chart within it's "holding" node
    // Global so users can hit it from the console
    chart = new Chart("chartNode");

    // Set the theme
    chart.setTheme(Claro);

    // Add the only/default plot 
    chart.addPlot("default", {
        type: "Lines",
        markers: true
    });
    
    // Add axes
    chart.addAxis("x", { microTickStep: 1, minorTickStep: 1, max: 60 });
    chart.addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", minorTickStep: 1 });

    // Add the storeseries - Query for all data
    chart.addSeries("y", new StoreSeries(store, { query: { site: 1 } }, "value"));
    //chart.addSeries("y2", new StoreSeries(store, { query: { site: 2 } }, "value"));

    // Render the chart!
    chart.render();
    
    /*
    // Simulate a data chage from a store or service
    var startNumber = data.length;
    var interval = setInterval(function() {
        // Notify the store of a data change
        store.notify({ value: Math.ceil(Math.random()*29), id: ++startNumber, site: 1 });
        store.notify({ value: Math.ceil(Math.random()*29), id: ++startNumber, site: 2 });
        // Stop at 50
        if(startNumber == 120) clearInterval(interval);
    },1000);
    */
});