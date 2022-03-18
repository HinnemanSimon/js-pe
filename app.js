let button = document.getElementById("knop")
let errors = []
let tekst
validateForm = () => {
    checkEmptyField("voornaam", "Het veld voornaam is vereist.<br>")
    checkEmptyField("naam", "Het veld naam is vereist.<br>")
    checkEmptyField("gebruikersnaam", "Het veld gebruikersnaam is vereist.<br>")
    validateEmail("mailadres")
    if (document.getElementById("mailadres").value == "") {
        checkEmptyField("mailadres", "Het veld E-mailadres is vereist.<br>")
    } else if (validateEmail("mailadres") == false) {
        errors.push("E-mailadres is niet correct.<br>")
    }
    validateEmail("mailadres")
    controleWachtwoord("wachtwoord", "herhaal")
    checkEmptyField("adres", "Het veld adres is vereist.<br>")
    checkLandEnProvincie("land", "provincie")
    checkPc("postcode")
    checkAlgemeneVoorwaarden("voorwaarden")
    if (errors.length == 0) {
        tekst = '<div class="alert alert-success" role="alert">'
        tekst += '<h4 class="alert-heading">Goed gedaan</h4>'
        tekst += '<p>Aww yeah, je werd geregistreed!<p>'
        tekst += '</div>'
        tekst += '<div class="alert alert-info" role="alert">'
        tekst += '<h4 class="alert-heading">Betaalmethode</h4>'
        tekst += validatePayment("betaaloptie")
        tekst += '</div>'
    } else {
        tekst = '<div class="alert alert-danger" role="alert">'
        tekst += '<h4 class="alert-heading">Yikes errors...</h4>'
        tekst += errors.join('')
        tekst += '</div>'

    }
    document.getElementById('foutmeldingen').innerHTML = tekst
    errors = []
}
checkLandEnProvincie = (veldLand, veldProvincie) => {
    let land = document.getElementById(veldLand).value
    let provincie = document.getElementById(veldProvincie).value
    if (land == "Kies een land") {
        errors.push("Het veld land is vereist.<br>")
    }
    if (provincie == "Kies een provincie") {
        errors.push("Het veld provincie is vereist.<br>")
    }
}
checkEmptyField = (veld, melding) => {
    let invoer = document.getElementById(veld).value
    if (invoer == "") {
        errors.push(melding)
    }
}
validatePayment = (veld) => {
    const radioButtons = document.getElementsByName(veld);
    let selectedbetaalmethode;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedbetaalmethode = radioButton.value;
            break;
        }
    }
    return "Je betalingswijze is " + selectedbetaalmethode
        //https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
}
checkPc = (veld) => {
    let invoer = document.getElementById(veld).value
    if (invoer == "") {
        errors.push("Het veld postcode is vereist.<br>")
    } else if (invoer > 9999 || invoer < 1000) {
        errors.push("De waarde van de postcode moet tussen 1000 en 9999 liggen.<br>")
    }

}
controleWachtwoord = (veldWachtwoord, veldHerhaal) => {
    let wachtwoord = document.getElementById(veldWachtwoord).value
    let herhaal = document.getElementById(veldHerhaal).value
    if (wachtwoord == "" || herhaal == "") {
        checkEmptyField(veldWachtwoord, "Het veld wachtwoord is vereist.<br>")
        checkEmptyField(veldHerhaal, "Het veld herhaal wachtwoord is vereist.<br>")
    } else {
        if (wachtwoord != herhaal) {
            errors.push("Je wachtwoorden komen niet overeen.<br>")
        }
        if (wachtwoord.length < 8) {
            errors.push("Je wachtwoord moet minstens 8 karakters lang zijn.<br>")
        }
    }

}
checkAlgemeneVoorwaarden = (veld) => {
    let invoer = document.getElementById(veld)
    if (invoer.checked == false) {
        errors.push("Je moet de algemene voorwaarden accepteren.<br>")
    }
}
validateEmail = (emailadres) => {
    let email = document.getElementById(emailadres)
    var validRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.value.match(validRegex)) {

        return true;


    } else {

        return false;

    }
    //https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript

}

button.addEventListener("click", validateForm)