function bestillBilletter () {
    let error = 0;

    const bestilling = {
        film: $("#velgFilm").find(":selected").text(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    //Sjekke om alle input felt er fylt inn før serveren får koden
    if (bestilling.film === "") {
        error++;
        alert("Vennligst velg en film for å kjøpe billett.");
        return;
    }
    if (bestilling.antall === "" || isNaN(bestilling.antall) || parseInt(bestilling.antall) <= 0) {
        error++;
        alert("Du må velge et gyldig tall for antall billetter.");
        return;
    }
    if (bestilling.fornavn === "" || !isNaN(bestilling.fornavn)) {
        error++;
        alert("Du må fylle ut fornavn.");
        return;
    }
    if (bestilling.etternavn === "" || !isNaN(bestilling.etternavn)) {
        error++;
        alert("Du må fylle ut etternavn.");
        return;
    }
    if (bestilling.telefonnr === "" || isNaN(bestilling.telefonnr) || !(/^\d{8}$/.test(bestilling.telefonnr))) {
        error++;
        alert("Telefonnummer må bestå av 8 siffer.");
        return;
    }
    if (bestilling.epost.indexOf("@") === -1) {
        error++;
        alert("Du må skrive inn en gyldig epostadresse.");
        return;
    }
    if (error === 0) {
        $.post("/lagreBestilling", bestilling, function () {
            hentBestilling();
        });
    }

    //Tømmer feltene etter
    $("#velgFilm option").eq(0).prop("selected", true);
    $("#antall").val(""),
        $("#fornavn").val(""),
        $("#etternavn").val(""),
        $("#telefonnr").val(""),
        $("#epost").val("")

    //Henter data fra sever og skriver ut på nettsiden
    function hentBestilling() {
        $.get("/sortedByEtternavn", function (data) {
            formaterData(data);
        });
    }

    //Fjerner bestillingene som er printet ut og sorterer ny liste
    function formaterData(bestillinger) {
        $("#alleBestillinger tr").remove();
        bestillinger.forEach(function (bestilling) {
            let rad = alleBestillinger.insertRow(0);
            rad.insertCell(0).textContent = bestilling.film;
            rad.insertCell(1).textContent = bestilling.antall;
            rad.insertCell(2).textContent = bestilling.fornavn;
            rad.insertCell(3).textContent = bestilling.etternavn;
            rad.insertCell(4).textContent = bestilling.telefonnr;
            rad.insertCell(5).textContent = bestilling.epost;
        });
    }
}
function slettBestilling(){
    /* Sletter bestillingen fra databasen. */
    $.ajax({
        url: "/slettBestilling",
        type: "DELETE",
        success: function () {
            $("#alleBestillinger").empty();
        }
    });
}