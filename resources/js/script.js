var isChanging = false;
var scale = [.7, 3.4];
var map = {16: false, 17: false, 188: false, 190: false};
$('input[type="range"]').each(function(){
    $(this).on("mousemove", function(){
        handleMove($(this));
    });
    $(this).on("mousedown", function(){
        isChanging = true;
    });
    $(this).on("mouseup", function(){
        isChanging = false;
    });
    $(this).on("mouseleave", function(){
        isChanging = false;
    });
    $(this).on("change", function(){
        checkPercent($(this));
    });
    $(this).on("keydown", function(e){
        if(e.keyCode == 37 || e.keyCode == 39){
            checkPercent($(this));
        }
    });
    checkPercent($(this));
});

$(".info").on("click", function(){
    $("#infoModal").modal("show");
})

$(".background-picker").on("change", function(){
    $(".picture").css("background", "linear-gradient(-45deg, "+hexToHSL($(this).val(), 0)+" 0%, "+hexToHSL($(this).val(), 1)+" 50%, "+hexToHSL($(this).val(), 2)+" 100%)");
});
$(".border-picker").on("change", function(){
    var color = $(this).val();
    $(".picture-border").css("border-color", color);
    $("#bottom-text-border").find("div").each(function(){
        $(this).css("border-color", color);
    });
});
$(".font-picker").on("change", function(){
    $(".text-inside").css("color", $(this).val());
});

$("#dwl-btn").on('click', function(){
    var name = $("#fileNameInput").val();
    if(name == ""){
        name = generateName(15);
    }
    html2canvas(document.querySelector("#download_picture")).then(canvas => {
        download(canvas, name);
    });
});
$(".text-inside").on("keydown", function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if (map[16] && map[17] && map[190]) {
            $(this).css("font-size", parseInt($(this).css("font-size").slice(0,-2)) + 1 +"px");
            map[190]=false;
        }else if(map[16] && map[17] && map[188]){
            $(this).css("font-size", parseInt($(this).css("font-size").slice(0,-2)) - 1 +"px");
            map[188]=false;
        }
    }
}).on("keyup", function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});

function download(canvas, filename) {
    var lnk = document.createElement('a'), e;

    lnk.download = filename;
    lnk.href = canvas.toDataURL("image/png;base64");
  
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
}

function generateName(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var cLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * cLength));
    }
    return result;
 }

function checkPercent(e){
    var percent = ((e.val() - e.attr("min")) /
    (e.attr("max") - e.attr("min"))) * 100;
    if(e.attr("id") == "distanceFrom"){
        var w,h, margin;
        h = e.val() * scale[0];
        w = e.val();
        margin = w*-1 + "px " + parseInt(h+15) + "px 40px " + parseInt(h+15) + "px";
        $(".picture-border").height("calc(100% - "+w*2+"px)");
        $(".picture-border").width("calc(100% - "+h*2+"px)");
        $(".picture-border").css("margin", w+"px "+h+"px");
        console.log(margin);
        $("#bottom-text-border-container").css("margin", margin);
        $("#bottom-text-border-container").css("width", "calc(100% - " + parseInt(h+15)*2 + "px)");
    }else if(e.attr("id") == "widthFrom"){
        var text = $("#bottom-text-border-container").css("margin-top").slice(0,-2);
        margin = -50 - e.val() + "px";
        $(".picture-border").css("border-width", e.val());
        $("#bottom-text-border").find("div").each(function(){
            $(this).css("border-width", e.val());
        });
        $("#bottom-text-border-container").css("margin-top", margin);
        checkPercent($("#distanceFrom"));
    }
    e.css("--webkitProgressPercent", percent+"%");
}

function handleMove(e){
    if(!isChanging) return;
    checkPercent(e);
}

function hexToHSL(hex, add) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);
  
    adding = (add == 1) ? 20: (add == 2) ? 10:0;

    l += adding;

    return "hsl(" + h + "," + s + "%," + l + "%)";
}