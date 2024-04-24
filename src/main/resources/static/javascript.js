// Deklarerer variabler for å sjekke om alle feltene er riktig utfylt
let alleFyltUt = false;

let filmValgt = false;
let antallFylt = false;
let fornavnFylt = false;
let etternavnFylt = false;
let adresseFylt = false;
let telefonFylt = false;
let epostFylt = false;

// Funksjon for å validere hvert felt i skjemaet
function validerFelter() {
    let innFilm = document.getElementById("film").value;
    let innAntall = document.getElementById("antall").value;
    let innFornavn = document.getElementById("fornavn").value;
    let innEtternavn = document.getElementById("etternavn").value;
    let innAdresse = document.getElementById("adresse").value;
    let innTelefonnr = document.getElementById("telefonnr").value;
    let innEpost = document.getElementById("epost").value;

    // Validering av filmvalg
    if (innFilm === "") {
        document.getElementById("filmError").innerHTML = "<span style='color: red'>Vennligst velg en film</span>";
        filmValgt = false;
    } else {
        filmValgt = true;
        document.getElementById("filmError").innerHTML = "";
    }

    // Validering av antall billetter
    if (isNaN(innAntall) || innAntall === "") {
        document.getElementById("antallError").innerHTML = "<span style='color: red'>Vennligst angi antall billetter</span>";
        antallFylt = false;
    } else {
        antallFylt = true;
        document.getElementById("antallError").innerHTML = "";
    }

    // Validering av fornavn
    if (innFornavn === "" || !isNaN(innFornavn)) {
        document.getElementById("fornavnError").innerHTML = "<span style='color: red'>Vennligst skriv inn ditt fornavn</span>";
        fornavnFylt = false;
    } else {
        fornavnFylt = true;
        document.getElementById("fornavnError").innerHTML = "";
    }

    // Validering av etternavn
    if (innEtternavn === "" || !isNaN(innEtternavn)) {
        document.getElementById("etternavnError").innerHTML = "<span style='color: red'>Vennligst skriv inn ditt etternavn</span>";
        etternavnFylt = false;
    } else {
        etternavnFylt = true;
        document.getElementById("etternavnError").innerHTML = "";
    }

    // Validering av adresse
    if (innAdresse === "") {
        document.getElementById("adresseError").innerHTML = "<span style='color: red'>Vennligst skriv inn din adresse</span>";
        adresseFylt = false;
    } else {
        adresseFylt = true;
        document.getElementById("adresseError").innerHTML = "";
    }

    // Validering av telefonnummer
    if (!innTelefonnr.match(/^[0-9]{4,13}$/)) {
        document.getElementById("telefonnrError").innerHTML = "<span style='color: red'>Vennligst skriv inn et gyldig telefonnummer</span>";
        telefonFylt = false;
    } else {
        telefonFylt = true;
        document.getElementById("telefonnrError").innerHTML = "";
    }

    // Validering av epost
    if (!innEpost.match(/^[A-Za-z\._\-0-9]+@[A-Za-z]+[\.][a-z]{2,4}$/)) {
        document.getElementById("epostError").innerHTML = "<span style='color: red'>Vennligst skriv inn en gyldig epostadresse</span>";
        epostFylt = false;
    } else {
        epostFylt = true;
        document.getElementById("epostError").innerHTML = "";
    }

    // Sjekk om alle feltene er validert som sanne
    alleFyltUt = filmValgt && antallFylt && fornavnFylt && etternavnFylt && adresseFylt && telefonFylt && epostFylt;
}

// Funksjon for å sende inn skjemaet
// Funksjon for å sende inn skjemaet
function sendInnBestilling() {
    validerFelter();
    if (alleFyltUt) {
        // Samler inn data fra skjemaet for å sende
        let bestillingData = {
            film: document.getElementById("film").value,
            antall: document.getElementById("antall").value,
            fornavn: document.getElementById("fornavn").value,
            etternavn: document.getElementById("etternavn").value,
            adresse: document.getElementById("adresse").value,
            telefonnr: document.getElementById("telefonnr").value,
            epost: document.getElementById("epost").value
        };

        // Sender data til server via POST
        $.post("/lagre", bestillingData, function() {
            hentAlleBestillinger();
            alert("Bestillingen er sendt inn!");
        });

        // Resetter skjema og indikatorer etter vellykket sending
        document.getElementById("film").value = "";
        document.getElementById("antall").value = "";
        document.getElementById("fornavn").value = "";
        document.getElementById("etternavn").value = "";
        document.getElementById("adresse").value = "";
        document.getElementById("telefonnr").value = "";
        document.getElementById("epost").value = "";

        filmValgt = antallFylt = fornavnFylt = etternavnFylt = adresseFylt = telefonFylt = epostFylt = alleFyltUt = false;
    } else {
        alert("Vennligst fyll ut alle feltene korrekt.");
    }
}

// Funksjon for å hente og vise alle bestillinger
function hentAlleBestillinger() {
    $.get("/hente", function(data) {
        visBestillinger(data);
    });
}

// Funksjon for å oppdatere tabellen med bestillinger
function visBestillinger(bestillinger) {
    let ut = "<table class='table table-striped'><thead><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Adresse</th><th>Telefonnummer</th><th>Epost</th></tr></thead><tbody>";
    bestillinger.forEach(function(bestilling) {
        ut += `<tr><td>${bestilling.film}</td><td>${bestilling.antall}</td><td>${bestilling.fornavn}</td><td>${bestilling.etternavn}</td><td>${bestilling.adresse}</td><td>${bestilling.telefonnr}</td><td>${bestilling.epost}</td></tr>`;
    });
    ut += "</tbody></table>";
    document.getElementById("bestillBilletter").innerHTML = ut;
}

// Funksjon for å slette alle bestillinger
function slettBestilling() {
    if (confirm("Er du sikker på at du vil slette alle bestillinger?")) {
        $.ajax({
            url: "/slette",
            type: 'DELETE',
            success: function () {
                document.getElementById("bestillBilletter").innerHTML = "";
                alert("Alle bestillinger er slettet.");
            }
        });
    }
}
