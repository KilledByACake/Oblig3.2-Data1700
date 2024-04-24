document.addEventListener("DOMContentLoaded", function() {
    function leggTilEventLytterSikkert(selector, event, handler) {
        const element = document.getElementById(selector);
        if (element) {
            element.addEventListener(event, handler);
        } else {
            console.error(`Element med ID '${selector}' ble ikke funnet.`);
        }
    }

    leggTilEventLytterSikkert("bestillForm", "submit", bestilling);
    leggTilEventLytterSikkert("hentBestillinger", "click", hentBestillinger);
    leggTilEventLytterSikkert("slettAlleBestillinger", "click", slettAlleBestillinger);

    function bestilling(event) {
        event.preventDefault();

        const feilmeldinger = [];  // Definer hvordan feil samles eller håndteres

        if (feilmeldinger.length > 0) {
            displayErrorMessages(feilmeldinger);
            return;
        }

        const bestilling = {
            film: document.getElementById("film").value,
            antall: parseInt(document.getElementById("antall").value, 10),
            fornavn: document.getElementById("fornavn").value,
            etternavn: document.getElementById("etternavn").value,
            adresse: document.getElementById("adresse").value,
            telefonnr: document.getElementById("telefonnr").value,
            epost: document.getElementById("epost").value
        };

        fetch('/lagreBestilling', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bestilling)
        })
            .then(response => response.json())
            .then(data => {
                alert("Bestilling lagret: " + data.message);
                visBilletter();
                nullstillInput();
            })
            .catch(error => {
                console.error('Feil:', error);
                alert('Kunne ikke lagre bestillingen');
            });
    }

    function hentBestillinger() {
        fetch('/hentBestilling')
            .then(response => response.json())
            .then(data => {
                bestillingListe = data;
                visBilletter();
            })
            .catch(error => {
                console.error('Feil:', error);
            });
    }

    function slettAlleBestillinger() {
        fetch('/slettBestillinger', {method: 'DELETE'})
            .then(response => response.text())
            .then(data => {
                alert(data);
                bestillingListe = [];
                document.getElementById("billettListe").innerHTML = "";
            })
            .catch(error => {
                console.error('Feil:', error);
                alert('Kunne ikke slette bestillinger');
            });
    };
}

// Funksjon for å vise billetter i HTML
function visBilletter() {
    const billettListeElement = document.getElementById("billettListe");
    billettListeElement.innerHTML = "";

    // Oppretter HTML-tabell
    let ut = "<table><tr>" +
        "<th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";

    // Legger til billetter i tabellen
    for (let p of billettListe) {
        ut += `<tr><td>${p.fornavn}</td><td>${p.etternavn}</td><td>${p.telefonnr}</td><td>${p.epost}</td></tr>`;
    }

    ut += "</table>";
    // Oppdaterer HTML-innholdet
    billettListeElement.innerHTML = ut;
}

// Funksjon for å slette alle billetter
function slettB() {
    billettListe = [];
    document.getElementById("billettListe").innerHTML = "";
}

// Funksjon for å nullstille skjema og feilmeldinger
function nullstillInput() {
    document.getElementById("film").value = "";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnr").value = "";
    document.getElementById("epost").value = "";

    // Tilbakestill feilmeldinger
    resetErrorMessages();
}

// Funksjon for å tilbakestille feilmeldinger
function resetErrorMessages() {
    document.getElementById("filmError").innerHTML = "";
    document.getElementById("antallError").innerHTML = "";
    document.getElementById("fornavnError").innerHTML = "";
    document.getElementById("etternavnError").innerHTML = "";
    document.getElementById("telefonnrError").innerHTML = "";
    document.getElementById("epostError").innerHTML = "";
}

// Funksjon for å vise feilmeldinger ved siden av tilsvarende input-felt
function displayErrorMessages(errors) {
    errors.forEach((error, index) => {
        const errorElement = document.getElementById(`${getInputElementId(errors[index])}Error`);
        if (errorElement) {
            errorElement.innerHTML = error;
        }
    });
}