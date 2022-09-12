class Ui {
    constructor() {
        console.log("konstruktor klasy Ui");
    }
}

$(document).on("click", ".loadedIMG", function (e) {
    console.log(this);
    net.download(this.parentElement.children[1].innerText, $('input[name="url"]')[0].value);
});

$(document).on("click", ".semester", function (e) {
    if (!this.classList.contains("collapsed")) {
        //req.session.open = this.href.slice(-1) - 1;
        net.setOpen(this.href.slice(-1) - 1);
        //console.log(this.href.slice(-1) - 1);
    }
});

/*
$(document).ready(function () {
    if (!req.session.open) {
        req.session.open = 0;
    }
    $(".collapse")[req.session.open].click();
});*/
