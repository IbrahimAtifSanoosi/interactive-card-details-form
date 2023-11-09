const holderName = document.querySelector(".holder-name");
const cardNumber = document.querySelector(".card-number");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvc = document.getElementById("cvc");
const nameError = document.querySelector(".name-error");
const cardError = document.querySelector(".number-error");
const expError = document.querySelector(".exp-error");
const cvcError = document.querySelector(".cvc-error");
const success = document.querySelector(".success");
const done = document.querySelector(".done-btn");
const newCard = document.getElementById("front-result");
const newName = document.getElementById("new-name");
const newYear = document.getElementById("new-year");
const newMonth = document.getElementById("new-month");
const newCvc = document.getElementById("back-result");
const form = document.querySelector("form");
const formPart = document.querySelector(".form-part");
const complete = document.querySelector(".complete");

const CURRENT_YEAR = new Date().getFullYear();
holderName.addEventListener('input', function () { newName.textContent = this.value; });
cardNumber.addEventListener('input', function () { newCard.textContent = this.value; });
month.addEventListener('input', function () { newMonth.textContent = this.value; });
year.addEventListener('input', function () { newYear.textContent = this.value; });
cvc.addEventListener('input', function () { newCvc.textContent = this.value; });

success.addEventListener("click", function () {
    resetField(nameError, holderName);
    resetField(cardError, cardNumber);
    resetField(expError, month);
    resetField(expError, year);
    resetField(cvcError, cvc);

    let nameValidation = isValidName(holderName.value);
    let cardValidation = isValidCard(cardNumber.value);
    let expDateValidation = isValidExpDate(month.value, year.value);
    let cvcValidation = isValidCvc(cvc.value);
    if (!nameValidation.isSuccess) {
        showErorr(holderName, nameError, nameValidation.error);
    }
    if (!cardValidation.isSuccess) {
        showErorr(cardNumber, cardError, cardValidation.error);
    }
    if (!expDateValidation.isSuccess) {
        console.log("not ok");
        showErorr(month, expError, expDateValidation.error);
        showErorr(year, expError, expDateValidation.error);
    }
    if (!cvcValidation.isSuccess) {
        showErorr(cvc, cvcError, cvcValidation.error);
    }

    newCard.innerText = cardNumber.value;
    newName.innerText = holderName.value;
    newMonth.innerText = year.value;
    newYear.innerText = month.value + "/";
    newCvc.innerText = cvc.value;

    if (nameValidation.isSuccess && cardValidation.isSuccess && expDateValidation.isSuccess && cvcValidation.isSuccess) {
        console.log("complete....");
        form.style.cssText = "display: none";
        complete.style.cssText = "display: flex";
    }
});

function isValidName(name) {
    var validReg = /^[a-zA-Z]*$/;
    if (isEmpty(name)) {
        return { isSuccess: false, error: "can't be blank" };
    }
    if (name.match(validReg)) {
        return { isSuccess: true };
    }
    else {
        return { isSuccess: false, error: "Must be string" };
    }
}

function isValidCard(number) {
    var validReg = /\b(\d{4}\s\d{4}\s\d{4}\s\d{4}$)\b/;
    if (isEmpty(number)) {
        return { isSuccess: false, error: "can't be blank" };
    }
    // if (number.length != 19) {
    //     return { isSuccess: false, error: "Must be valid number" };
    // }
    if (number.match(validReg)) {
        return { isSuccess: true };
    }

    else {
        return { isSuccess: false, error: "Wrong format, numbers only eg. 1234 5567 8909 7654" };
    }
}

function isValidExpDate(month, year) {
    // var validReg = /[0-9]/;

    if (isEmpty(month) || isEmpty(year)) {
        return { isSuccess: false, error: "can't be blank" };
    }

    if ((month > 0 && month <= 12) && (year > CURRENT_YEAR)) {
        return { isSuccess: true };
    }

    else {
        return { isSuccess: false, error: "Must be valid date" };
    }
}

function isValidCvc(cvc) {
    var validReg = /^[0-9]*$/;

    if (isEmpty(cvc)) {
        return { isSuccess: false, error: "can't be blank" };
    }

    if (cvc > 0 && cvc < 1000) {
        return { isSuccess: true };
    }

    else {
        return { isSuccess: false, error: "Must be valid cvc eg:123" };
    }

}

function isEmpty(input) {
    if (input.length === 0) {
        return true;
    }
}

function showErorr(input, paragraph, error) {
    input.classList.add("error-input");
    paragraph.innerText = error;
}

function resetField(paragraph, field) {
    paragraph.innerText = "";
    field.classList.remove("error-input");
}
