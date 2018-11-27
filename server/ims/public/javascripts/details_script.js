require(["dojo/dom-construct","dijit/Dialog","dojo/domReady!"],
    function(domConstruct,Dialog){
        myDialog = new Dialog({
            title: "My Dialog",
            content: "Test content.",
            style: "width: 300px"
        });
    }
);