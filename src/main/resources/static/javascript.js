$(document).ready(function() {
    function validerFelter() {
        let feil = 0; // Teller for å spore antall feil i valideringen

        // Henter verdier og validerer dem
        const billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            adresse: $("#adresse").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val()
        };

        // Validering av filmvalg
        if (billett.film === "") {
            $("#filmError").html("<span style='color: deeppink'>Vennligst velg en film</span>");
            feil++;
        } else {
            $("#filmError").empty();
        }

        // Validering av antall billetter
        if (isNaN(billett.antall) || billett.antall === "") {
            $("#antallError").html("<span style='color: deeppink'>Vennligst angi antall billetter</span>");
            feil++;
        } else {
            $("#antallError").empty();
        }

        // Validering av fornavn
        if (billett.fornavn === "" || !isNaN(billett.fornavn)) {
            $("#fornavnError").html("<span style='color: deeppink'>Vennligst skriv inn ditt fornavn</span>");
            feil++;
        } else {
            $("#fornavnError").empty();
        }

        // Validering av etternavn
        if (billett.etternavn === "" || !isNaN(billett.etternavn)) {
            $("#etternavnError").html("<span style='color: deeppink'>Vennligst skriv inn ditt etternavn</span>");
            feil++;
        } else {
            $("#etternavnError").empty();
        }

        // Validering av adresse
        if (billett.adresse === "") {
            $("#adresseError").html("<span style='color: deeppink'>Vennligst skriv inn din adresse</span>");
            feil++;
        } else {
            $("#adresseError").empty();
        }

        // Validering av telefonnummer
        if (!billett.telefonnr.match(/^[0-9]{4,13}$/)) {
            $("#telefonnrError").html("<span style='color: deeppink'>Vennligst skriv inn et gyldig telefonnummer</span>");
            feil++;
        } else {
            $("#telefonnrError").empty();
        }

        // Validering av epost
        if (!billett.epost.match(/^[A-Za-z\._\-0-9]+@[A-Za-z]+[\.][a-z]{2,4}$/)) {
            $("#epostError").html("<span style='color: deeppink'>Vennligst skriv inn en gyldig epostadresse</span>");
            feil++;
        } else {
            $("#epostError").empty();
        }

        // Sjekker om alle feltene er korrekt utfylt
        if (feil === 0) {
            sendInnBestilling(billett);
        } else {
            alert("Vennligst fyll ut alle feltene korrekt.");
        }
    }

    // Sender inn bestillingen
    function sendInnBestilling(billettData) {
        $.post("/lagre", billettData, function() {
            alert("Bestillingen er sendt inn!");
            $("#sendInnForm")[0].reset(); // Tømmer skjemaet
            hentAlleBestillinger(); // Oppdaterer liste med bestillinger
        });
    }
    // Henter og viser alle bestillinger
    function hentAlleBestillinger() {
        $.get("/hente", function(data) {
            let ut = "<table class='table table-striped'><thead><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Adresse</th><th>Telefonnummer</th><th>Epost</th></tr></thead><tbody>";
            data.forEach(function(bestilling) {
                ut += `<tr><td>${bestilling.film}</td><td>${bestilling.antall}</td><td>${bestilling.fornavn}</td><td>${bestilling.etternavn}</td><td>${bestilling.adresse}</td><td>${bestilling.telefonnr}</td><td>${bestilling.epost}</td></tr>`;
            });
            ut += "</tbody></table>";
            $('#bestillBilletter').html(ut);
        });
    }

    // Funksjon for å slette alle bestillinger
    function slettBestillinger() {
        if (confirm("Er du sikker på at du vil slette alle bestillinger?")) {
            $.ajax({
                url: "/slette",
                type: 'DELETE',
                success: function() {
                    $('#bestillBilletter').empty();
                    alert("Alle bestillinger er slettet.");
                },
                error: function() {
                    alert("En feil oppstod under sletting av bestillinger.");
                }
            });
        }
    }

    // Knytter hendelsesbehandlere til form og sletteknapp
    $('#sendInnForm').on('submit', function(e) {
        e.preventDefault(); // Forhindrer vanlig form-innsending
        validerFelter(); // Kaller valideringsfunksjonen
    });

    $('#slettKnapp').on('click', slettBestillinger); // Knytter slett-funksjonen til slett-knappen
});
