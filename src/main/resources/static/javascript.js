function bestillBilletter() {
    const bestilling = {
        film: $("#velgFilm").find(":selected").text(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        adresse: $("#adresse").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    // Sender bestilling til server og oppdaterer bestillingene
    $.post("/lagreBestillinger", bestilling, function () {
        henteBestillinger();
    });

    // Tømmer input-feltene
    $("#velgFilm").val("velgfilm"); // Setter tilbake til standard valg
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

// Formaterer Data
function formaterData(bestillinger) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Adresse</th>" +
        "<th>Telefonnr</th>" +
        "<th>Epost</th>" +
        "</tr>";
    for (let bestilling of bestillinger) {
        ut += "<tr>" +
            "<td>" + bestilling.film + "</td>" +
            "<td>" + bestilling.antall + "</td>" +
            "<td>" + bestilling.fornavn + "</td>" +
            "<td>" + bestilling.etternavn + "</td>" +
            "<td>" + bestilling.adresse + "</td>" +
            "<td>" + bestilling.telefonnr + "</td>" +
            "<td>" + bestilling.epost + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#bestillinger").html(ut);
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