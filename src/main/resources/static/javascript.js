function bestillBilletter () {
    let feil = 0; // Teller for å spore antall feil i valideringen
    // Henter verdier og validerer dem
    let bestilling = {
        film: $("#velgFilm").val(),
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
            $.post("/lagreBestillinger", bestilling, function () {henteBestilling();});
        } else {
            alert("Vennligst fyll ut alle feltene korrekt.");
        }
    // Tømmer feltene
    $("#velgFilm option").eq(0).prop("selected", true);
    $("#antall").val(""),
    $("#fornavn").val(""),
    $("#etternavn").val(""),
    $("#adresse").val(""),
    $("#telefonnr").val(""),
    $("#epost").val("")

    //Hente bestillinger
    function henteBestillinger() {
        $.post("/henteBestillinger", bestilling, function () {henteBestillinger();});
    }

    //
    function formaterData(bestilling) {
        // Fjerner billettene som er printet ut(bare de som vises på siden ikke de på db) og deretter printer ny sortert liste
        $("#henteBestillinger tr").remove();
        bestillinger.forEach(function(bestilling) {
            let rad = henteBestillinger.insertRow(0);
            rad.insertCell(0).textContent = bestilling.film;
            rad.insertCell(1).textContent = bestilling.antall;
            rad.insertCell(2).textContent = bestilling.fornavn;
            rad.insertCell(3).textContent = bestilling.etternavn;
            rad.insertCell(4).textContent = bestilling.telefonnr;
            rad.insertCell(5).textContent = bestilling.epost;
        });
    }
}

//Sletter bestillingene
function slettBestilling() {
    $.post("/slettBestillinger", bestilling, function () {henteBestillinger().html;});
}