require(["dojo/dom-construct","dijit/Dialog","dijit/Tooltip","dojo/domReady!"],
    function(domConstruct,Dialog, Tooltip)
    {
        myDialog = new Dialog({
            title: "My Dialog",
            content: "Test content.",
            style: "width: 300px"
        });
    
        // Create a new Tooltip
        var tip = new Tooltip({
            // Label - the HTML or text to be placed within the Tooltip
            label: '&lt;div class="myTipType"&gt;This is the content of my Tooltip!&lt;/div&gt;',
            // Delay before showing the Tooltip (in milliseconds)
            showDelay: 250,
            // The nodes to attach the Tooltip to
            // Can be an array of strings or domNodes
            connectId: ["myElement1","myElement2"]
        });
    }
);