var map = {16: false, 17: false, 188: false, 190: false};

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