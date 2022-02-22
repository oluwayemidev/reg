exports.document.addEventListener("DOMContentLoaded", function() {
    var { readFileSync } = require('fs');
    const header = readFileSync("./header.html");
    document.getElementById("root").innerHTML = header;
});