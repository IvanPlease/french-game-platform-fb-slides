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