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
            film: $("#film").val(),
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

        // Sjekker om alle feltene er korrekt utfylt og sender bestillingen
        if (feil === 0) {
            // Konverterer bestilling til en JSON-streng før sending
            const bestillingData = JSON.stringify(bestilling);

            $.ajax({
                url: "/bestillinger/lagreBestilling", // Endepunktet for POST-forespørselen
                type: "POST",
                contentType: "application/json", // Setter riktig content-type for JSON
                data: bestillingData, // Sender den konverterte JSON-strengen
                success: function(response) {
                    alert("Bestillingen er lagret!");
                    henteBestillinger(); // Må sørge for at denne funksjonen er definert
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Feil ved lagring av bestilling: " + textStatus + " - " + errorThrown);
                }
            });
        } else {
            alert("Vennligst fyll ut alle feltene korrekt.");
        }
    }
    function henteBestillinger() {
        $.ajax({
            url: "/bestillinger/henteBestilling", // GET-endepunktet for å hente bestillinger
            type: "GET",
            contentType: "application/json",
            success: function(bestillinger) {
                $("#alleBestillinger").empty(); // Tømmer tabellen før nye bestillinger legges til
                bestillinger.forEach(function(bestilling) {
                    leggTilBestillingITabell(bestilling); // Bruker funksjonen for å legge til bestillinger i tabellen
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Feil ved henting av bestillinger: " + textStatus + " - " + errorThrown);
            }
        });
    }
    function leggTilBestillingITabell(bestilling) {
        let rad = $("<tr></tr>"); // Lager en ny rad
        rad.append(`<td>${bestilling.film}</td>`);
        rad.append(`<td>${bestilling.antall}</td>`);
        rad.append(`<td>${bestilling.fornavn}</td>`);
        rad.append(`<td>${bestilling.etternavn}</td>`);
        rad.append(`<td>${bestilling.telefonnr}</td>`);
        rad.append(`<td>${bestilling.epost}</td>`);
        $("#alleBestillinger").append(rad); // Legger til den nye raden i tabellen
    }

    function slettBestilling() {
        $.ajax({
            url: "/bestillinger/sletteBestilling",
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
});