function bestillBilletter() {
    let bestilling = {
        film: $("#velgFilm").find(":selected").text(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        adresse: $("#adresse").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };
    console.log(bestilling);
    //lagrer bestillingen og kjører henteBestilling()
    $.ajax({
        url: '/lagreBestillinger',
        type: 'POST',
        data: JSON.stringify(bestilling),
        contentType: 'application/json',
        success: function() {
            henteBestillinger();
        }
    });
    //Tømmer input
    $("#film").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#adresse").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

// Hente bestillinger
function henteBestillinger() {
    $.get("/henteBestillinger", function (data) {
        formaterData(data);
    });
}

//Formaterer Data
// Formaterer Data
function formaterData(bestillinger) {
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
    for (let b of bestillinger) {
        ut += "<tr>";
        ut += "<td>" + b.film + "</td><td>" + b.antall + "</td><td>" + b.fornavn + "</td><td>" + b.etternavn + "</td><td>" +
            b.adresse + "</td><td>" + b.telefonnr + "</td><td>" + b.epost + "</td><td></td>";
        ut += "</tr>";
    }
    ut += "</table>";
    $("#utput").html(ut);
}

// Sletter bestillingene
function slettBestilling() {
    $.ajax({
        url: "/slettBestillinger",
        type: 'DELETE',
        success: function() {
            henteBestillinger();
        }
    });
}