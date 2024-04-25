function bestillBilletter() {
    let feil = 0;
    let bestilling = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        adresse: $("#adresse").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };
    //lagrer bestillingen og kjører henteBestilling()
    $.post("/lagreBestillinger", bestilling, function () {
        henteBestillinger();
    });
    //Tømmer input
    $("#film").prop("selectedIndex", 0);
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#adresse").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}


//Hente bestillinger
function henteBestillinger() {
    $.post("/henteBestillinger", bestilling, function () {
        formaterData();
        console.log
    });
}

//Formaterer Data
function formaterData(bestilliner) {
    let ut = "<table class='table table-striped table-bordered'><tr>" +
        "    <th><strong>Film</strong></th>\n" +
        "    <th><strong>Antall</strong></th>\n" +
        "    <th><strong>Fornavn</strong></th>\n" +
        "    <th><strong>Etternavn</strong></th>\n" +
        "    <th><strong>Adresse</strong></th>\n" +
        "    <th><strong>Epost</strong></th>\n" +
        "    <th><strong>Slett</strong></th>\n" +
        "    <th><strong>Endre</strong></th>\n" +
        "</tr><br>";

    //  Gjør om til row
    for (let o of orders) {
        ut += "<tr>";
        ut += "<td>" + b.film + "</td><td>" + o.antall + "</td><td>" + o.fornavn + "</td><td>" + o.etternavn + "</td><td>" +
            o.adresse + "</td><td>" + o.telefonnr + "</td><td>" + o.epost + "</td><td></td>";
        ut += "</tr>";
    }
    ut += "</table>";
    $("#utput").html(ut);
}
//Sletter bestillingene
function slettBestilling() {
    $.post("/slettBestillinger", bestilling, function () {henteBestillinger().html;});
}
