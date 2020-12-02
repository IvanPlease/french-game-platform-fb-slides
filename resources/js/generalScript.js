var libraries = [
    {src: "resources/js/backgroundChanger.js",
    response: "Background changer library loaded"},
    {src: "resources/js/canvasDown.js",
    response: "Canvas downloader library loaded"},
    {src: "resources/js/rangeInputs.js",
    response: "Handling of range inputs loaded"},
    {src: "resources/js/textareaInput.js",
    response: "Textarea input formating library loaded"},
    {src: "resources/js/utilityColor.js",
    response: "Utility library for colors loaded"},
];

$(document).ready(function(){
    $.each(libraries, function(key, value){
        $.getScript(value.src, function(){
            console.log("["+key+"] "+value.response);
        });
    });
    $(".info").on("click", function(){
        $("#infoModal").modal("show");
    });
});