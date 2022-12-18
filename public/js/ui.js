class Ui {
    constructor() {
        //console.log("konstruktor klasy Ui");
    }
}

$(document).on("click", ".loadedIMG", function (e) {
    if (e.target.className != "loadedIMG") net.download(this.parentElement.children[1].innerText, $('input[name="url"]')[0].value);
});

$(document).on("click", ".semester", function (e) {
    if (!this.classList.contains("collapsed")) {
        //req.session.open = this.href.slice(-1) - 1;
        //net.setOpen(this.href.slice(-1) - 1);
        //console.log(this.href.slice(-1) - 1);
    }
});

$(document).ready(function () {
    var txt3 = document.createElement("p"); // Create with DOM
    txt3.innerHTML = "Text";
    txt3.id = "txt3";
    txt3.classList = "Test";
    $("body").append(txt3); // Append the new elements
});
/*
$(document).ready(function () {
    if (!req.session.open) {
        req.session.open = 0;
    }
    $(".collapse")[req.session.open].click();
});*/

$(document).on("mouseenter", ".loadedIMG", function (e) {
    var figure = this.parentElement.parentElement,
        figcaption = figure.children[figure.children.length - 1];
    $("#txt3").show();
    $("#txt3").offset({
        top: figure.offsetTop + figcaption.offsetTop,
        left: figure.offsetLeft + figcaption.offsetLeft - 35,
    });
    $("#txt3").text(figcaption.innerText.replace(/-/g, " "));
});

$(document).on("mouseout", "figure", function (e) {
    $("#txt3").hide();
});
