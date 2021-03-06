$("#dwl-btn").on('click', function(){
    var name = $("#fileNameInput").val();
    if(name == ""){
        name = generateName(15);
    }
    $("#download_picture").toggleClass("picture-shadow");
    html2canvas(document.querySelector("#download_picture")).then(canvas => {
        download(canvas, name);
    });
    $("#download_picture").toggleClass("picture-shadow");
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
