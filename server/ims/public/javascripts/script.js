require(["dijit/form/Button", "dojo/domReady!"],
    function(Button){

    var button1 = new Button({
        label: "Overview",
        onClick: function(){
            window.location.href = "/overview";
        }
    }, "btn1");
    button1.startup();

    var button2 = new Button({
        label: "Charts",
        onClick: function(){
            window.location.href = "/charts";
        }
    }, "btn2");
    button2.startup();

    var button3 = new Button({
        label: "Details",
        onClick: function(){ console.log("Third button was clicked!"); }
    }, "btn3");
    button3.startup();
});