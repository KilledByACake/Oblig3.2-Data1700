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

    // Validering av filmvalg
    $("#filmError").html(bestilling.film === "" ? "<span style='color: deeppink'>Vennligst velg en film</span>" : "");
    feil += bestilling.film === "" ? 1 : 0;

    // Validering av antall billetter
    $("#antallError").html((isNaN(bestilling.antall) || bestilling.antall === "") ? "<span style='color: deeppink'>Vennligst angi antall billetter</span>" : "");
    feil += (isNaN(bestilling.antall) || bestilling.antall === "") ? 1 : 0;

    // Validering av fornavn
    $("#fornavnError").html((bestilling.fornavn === "" || !isNaN(bestilling.fornavn)) ? "<span style='color: deeppink'>Vennligst skriv inn ditt fornavn</span>" : "");
    feil += (bestilling.fornavn === "" || !isNaN(bestilling.fornavn)) ? 1 : 0;

    // Validering av etternavn
    $("#etternavnError").html((bestilling.etternavn === "" || !isNaN(bestilling.etternavn)) ? "<span style='color: deeppink'>Vennligst skriv inn ditt etternavn</span>" : "");
    feil += (bestilling.etternavn === "" || !isNaN(bestilling.etternavn)) ? 1 : 0;

    // Validering av adresse
    $("#adresseError").html(bestilling.adresse === "" ? "<span style='color: deeppink'>Vennligst skriv inn din adresse</span>" : "");
    feil += bestilling.adresse === "" ? 1 : 0;

    // Validering av telefonnummer
    $("#telefonnrError").html(!bestilling.telefonnr.match(/^[0-9]{8}$/) ? "<span style='color: deeppink'>Vennligst skriv inn et gyldig telefonnummer</span>" : "");
    feil += !bestilling.telefonnr.match(/^[0-9]{8}$/) ? 1 : 0;

    // Validering av epost
    $("#epostError").html(!bestilling.epost.match(/^[A-Za-z\._\-0-9]+@[A-Za-z]+[\.][a-z]{2,4}$/) ? "<span style='color: deeppink'>Vennligst skriv inn en gyldig epostadresse</span>" : "");
    feil += !bestilling.epost.match(/^[A-Za-z\._\-0-9]+@[A-Za-z]+[\.][a-z]{2,4}$/) ? 1 : 0;

    if (feil === 0) {
        $.post("/lagreBestillinger", bestilling, function () {
            henteBestillinger();
            $("#film").prop("selectedIndex", 0);
            $("#antall").val("");
            $("#fornavn").val("");
            $("#etternavn").val("");
            $("#adresse").val("");
            $("#telefonnr").val("");
            $("#epost").val("");
        });
    } else {
        alert("Vennligst fyll ut alle feltene korrekt.");
    }


    //Hente bestillinger
    function henteBestillinger() {
        $.post("/henteBestillinger", bestilling, function () {formaterData();});
    }

    //
    function formaterData(bestillinger) {
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