$(document).ready(function () {
    // Knytter hendelsesbehandlere til form og sletteknapp
    $('#sendInnForm').on('submit', function(e) {
        e.preventDefault(); // Forhindrer vanlig form-innsending
        validerFelter(); // Kaller valideringsfunksjonen
    });

    // Validerer og sender inn bestillingen hvis det ikke er feil
    function validerFelter() {
        let feil = 0; // Teller for å spore antall feil i valideringen

        // Henter verdier og validerer dem
        const bestilling = {
            film: $("#film").val(), // Riktig valg fra rullegardinmeny
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            adresse: $("#adresse").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val()
        };

        // Validering av filmvalg
        if (bestilling.film === "") {
            $("#filmError").html("<span style='color: deeppink'>Vennligst velg en film</span>");
            feil++;
        } else {
            $("#filmError").empty();
        }

        // Validering av antall billetter
        if (isNaN(bestilling.antall) || bestilling.antall === "") {
            $("#antallError").html("<span style='color: deeppink'>Vennligst angi antall billetter</span>");
            feil++;
        } else {
            $("#antallError").empty();
        }

        // Validering av fornavn
        if (bestilling.fornavn === "" || !isNaN(bestilling.fornavn)) {
            $("#fornavnError").html("<span style='color: deeppink'>Vennligst skriv inn ditt fornavn</span>");
            feil++;
        } else {
            $("#fornavnError").empty();
        }

        // Validering av etternavn
        if (bestilling.etternavn === "" || !isNaN(bestilling.etternavn)) {
            $("#etternavnError").html("<span style='color: deeppink'>Vennligst skriv inn ditt etternavn</span>");
            feil++;
        } else {
            $("#etternavnError").empty();
        }

        // Validering av adresse
        if (bestilling.adresse === "") {
            $("#adresseError").html("<span style='color: deeppink'>Vennligst skriv inn din adresse</span>");
            feil++;
        } else {
            $("#adresseError").empty();
        }

        // Validering av telefonnummer
        if (!bestilling.telefonnr.match(/^[0-9]{8}$/)) {
            $("#telefonnrError").html("<span style='color: deeppink'>Vennligst skriv inn et gyldig telefonnummer</span>");
            feil++;
        } else {
            $("#telefonnrError").empty();
        }

        // Validering av epost
        if (!bestilling.epost.match(/^[A-Za-z\._\-0-9]+@[A-Za-z]+[\.][a-z]{2,4}$/)) {
            $("#epostError").html("<span style='color: deeppink'>Vennligst skriv inn en gyldig epostadresse</span>");
            feil++;
        } else {
            $("#epostError").empty();
        }

        // Sjekker om alle feltene er korrekt utfylt
        if (feil === 0) {
            $.post("/lagreBestilling", bestilling, function() {
                hentBestillinger(); // Oppdaterer listen med bestillinger
            });
        } else {
            alert("Vennligst fyll ut alle feltene korrekt.");
        }
    }

    // Henter data fra server og skriver det ut i rader på nettsiden.
    function hentBestillinger() {
        $.get("/sortedByEtternavn", function(data) {
            formaterData(data);
        });
    }

    // Formaterer data og viser det i en tabell
    function formaterData(bestillinger) {
        $("#alleBestillinger tr").remove();
        bestillinger.forEach(function(bestilling) {
            let rad = $("#alleBestillinger").append("<tr></tr>");
            rad.append(`<td>${bestilling.film}</td>`);
            rad.append(`<td>${bestilling.antall}</td>`);
            rad.append(`<td>${bestilling.fornavn}</td>`);
            rad.append(`<td>${bestilling.etternavn}</td>`);
            rad.append(`<td>${bestilling.telefonnr}</td>`);
            rad.append(`<td>${bestilling.epost}</td>`);
        });
    }
});

// Funksjon for å slette alle bestillinger
function slettBestilling() {
    /* Sletter bestillingene fra databasen. */
    $.ajax({
        url: "/sletteBestilling",
        type: "DELETE",
        success: function() {
            $("#alleBestillinger").empty();
            alert("Alle bestillinger er slettet.");
        },
        error: function() {
            alert("En feil oppstod under sletting av bestillinger.");
        }
    });
}
