function bestillBilletter() {
    let errors = [];

    // Samle inn data fra skjemaet
    const bestilling = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        adresse: $("#adresse").val(), // Pass på at dette feltet er lagt til i HTML-skjemaet
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    // Tilbakestille eventuelle tidligere feilmeldinger
    resetErrorMessages();

    // Validering av skjemadata
    if (!bestilling.film) {
        errors.push({ id: "filmError", message: "Vennligst velg en film for å kjøpe billett." });
    }
    if (!bestilling.antall || isNaN(bestilling.antall) || parseInt(bestilling.antall) < 1) {
        errors.push({ id: "antallError", message: "Du må velge et gyldig tall for antall billetter." });
    }
    if (!bestilling.fornavn) {
        errors.push({ id: "fornavnError", message: "Du må fylle ut fornavn." });
    }
    if (!bestilling.etternavn) {
        errors.push({ id: "etternavnError", message: "Du må fylle ut etternavn." });
    }
    if (!bestilling.adresse) {
        errors.push({ id: "adresseError", message: "Du må fylle ut adresse." });
    }
    if (!bestilling.telefonnr || bestilling.telefonnr.length !== 8) {
        errors.push({ id: "telefonnrError", message: "Telefonnummer må bestå av 8 siffer." });
    }
    if (!bestilling.epost.includes("@")) {
        errors.push({ id: "epostError", message: "Du må skrive inn en gyldig epostadresse." });
    }

    // Hvis det er feil, vis feilmeldinger, ellers send data til server
    if (errors.length > 0) {
        displayErrorMessages(errors);
    } else {
        // Opprett et nytt skjemaobjekt
        const formData = new FormData();
        Object.keys(bestilling).forEach(key => {
            formData.append(key, bestilling[key]);
        });
    }
    // Funksjon for å nullstille input-feltene i skjemaet etter vellykket lagring
    function nullstillInput() {
        $("#film").prop('selectedIndex', 0);
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#adresse").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}

// Funksjon for å vise feilmeldinger
function displayErrorMessages(errors) {
    errors.forEach(function(error) {
        $("#" + error.id).text(error.message).show();
    });
}

// Funksjon for å tilbakestille feilmeldinger
function resetErrorMessages() {
    $(".form-text.text-danger").text("").hide();
}


// Henter og viser oppdatert liste over bestillinger
function hentBestilling() {
    $.get("/bestillinger/hente", function(data) {
        const table = $("#alleBestillinger");
        table.empty(); // Tømmer tabellen før ny data legges til

        // Sorter bestillingene etter etternavn
        data.sort(function(a, b) {
            return a.etternavn.localeCompare(b.etternavn);
        });

        data.forEach(function (bestilling) {
            let rad = "<tr>" +
                "<td>" + bestilling.film + "</td>" +
                "<td>" + bestilling.antall + "</td>" +
                "<td>" + bestilling.fornavn + "</td>" +
                "<td>" + bestilling.etternavn + "</td>" +
                "<td>" + bestilling.adresse + "</td>" +
                "<td>" + bestilling.telefonnr + "</td>" +
                "<td>" + bestilling.epost + "</td>" +
                "</tr>";
            table.append(rad);
        });
    });
}


function slettBestilling() {
    $.ajax({
        url: "/bestillinger/slette",
        type: "DELETE",
        success: function () {
            $("#alleBilletter").empty();
        }
    });
}
