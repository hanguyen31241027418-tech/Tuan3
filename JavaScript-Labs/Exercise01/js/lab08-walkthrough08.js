// define functions in this file
var boxClass = 'movingDiv'; 

function outputBox(num) {
    var box = "<div class='movingDiv' id='div" + num + "'>"; // 8.8 step 10 quên var dòng box
    box += "This is div " + num;
    box += "</div>";
    return box;
}
