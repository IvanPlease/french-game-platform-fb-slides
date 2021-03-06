$("#customSwitch1").on("change", function(){
    var colorBack = !($("#color-back").attr("data-visible") == 'true');
    var imageBack = !($("#image-back").attr("data-visible") == 'true');
    $("#color-back").attr("data-visible", colorBack);
    $("#image-back").attr("data-visible", imageBack);
    if(colorBack){
        changeColor();
    }else if(imageBack){
        getFileFromInput();
    }
});

$(".background-picker").on("change", function(){
    if($(this).hasClass("image-picker-plus-preview")){
        getFileFromInput();
    }else if($(this).hasClass("color-picker-plus-preview")){
        changeColor();
    }
});

function getFileFromInput(){
    var file = $(".image-picker-plus-preview").prop('files')[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        $(".picture").css("background-image", "url(" + reader.result + ")")
            .attr("data-image", true);
        $("label[for=" + $(".image-picker-plus-preview").attr("id") + "]").text(file.name);
    }
    if(file){
        reader.readAsDataURL(file);
    }
}

function changeColor(){
    var el = $(".background-picker.color-picker-plus-preview");
    $(".picture").css("background", "linear-gradient(-45deg, "+hexToHSL(el.val(), 0)+" 0%, "+hexToHSL(el.val(), 1)+" 50%, "+hexToHSL(el.val(), 2)+" 100%)")
        .attr("data-image", false);
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