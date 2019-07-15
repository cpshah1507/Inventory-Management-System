require(["dojo/dom","dojo/on","dojo/dom-construct","dojo/parser","dijit/registry","dijit/Dialog","dijit/Tooltip","dstore/RequestMemory","dojo/domReady!"],
    function(dom,on,domConstruct,parser, registry, Dialog, Tooltip, RequestMemory)
    {
        parser.parse();

        var skulabel = registry.byId('skuLabel');
        var getDetailsBtn = dom.byId('getDetailsBtn');

        on(getDetailsBtn, "click", function(evt)
        {            
            var requestURL = "/getInventoryDetails?sku=" + skulabel.get("value");            
            store = new RequestMemory({target: requestURL});

            var sku_id = "defaultID", sku_label = "defaultLabel", sku_quantity = 0, sku_loc = "defaultLocation";

            store.forEach(function (object) {
                console.log(object);
                sku_id = object.id;
                sku_label = object.sku;
                sku_quantity = object.quantity;
                sku_loc = object.location;

                console.log("opening dialog");
                myDialog = new Dialog({
                    title: "SKU Details",
                    content: "<label>ID:</label><span>"+sku_id+"</span><br/><label>Label:</label><span>"+sku_label+"</span><br/><label>Quantity:</label><span>"
                        +sku_quantity+"</span><br/><label>Location:</label><span>"+sku_loc+"</span>",
                    style: "width: 300px"
                });
    
                myDialog.show();
            });
        });
    
        // Create a new Tooltip
        var tip = new Tooltip({
            // Label - the HTML or text to be placed within the Tooltip
            label: '<div class="myTipType">Sample Tooltip Content</div>',
            // Delay before showing the Tooltip (in milliseconds)
            showDelay: 250,
            // The nodes to attach the Tooltip to
            // Can be an array of strings or domNodes
            connectId: ["nameTip"]
        });
    }
);