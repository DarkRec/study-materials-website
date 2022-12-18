//console.log("wczytano plik Net.js")
class Net {
    constructor() {
        //console.log("konstruktor klasy Net");
    }

    template() {
        $.ajax({
            url: "/",
            data: {},
            type: "POST",
            success: function (data) {},
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    setOpen(nr) {
        $.ajax({
            url: "/setOpen",
            data: { nr: nr },
            type: "POST",
            success: function (data) {},
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}
