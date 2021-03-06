var isChanging = false;
var scale = .7;

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

function handleMove(e){
    if(!isChanging) return;
    checkPercent(e);
}

function checkPercent(e){
    var percent = ((e.val() - e.attr("min")) /
    (e.attr("max") - e.attr("min"))) * 100;
    if(e.attr("id") == "distanceFrom"){
        var w,h, margin;
        h = e.val() * scale;
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