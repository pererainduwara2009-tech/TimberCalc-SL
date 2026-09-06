const see_area = document.getElementById("see-area");
const done_btn = document.getElementById("done");

function show(){
    see_area.style.display = "flex";
};

function off(){
    see_area.style.display = "none";
};

function show_numpad(){
    num_pad.style.display = "grid";
    no_btn.style.display = "none";
    
};


function calculation(){

    const price = Number(document.getElementById("price").value)

    const leng_in = Number(document.getElementById("length").value);
    const width_in = Number(document.getElementById("width").value);

    let cft = (leng_in * width_in * width_in) / 2304 ;
    let price_unit = ("LKR ") + (price * cft).toFixed(2);

    alert(price_unit);
};

const num_pad = document.getElementById("num-pad");
const no_btn = document.getElementById("btn_mark");

const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");

const inputs = [
    lengthInput,
    widthInput
];

let activeInput = lengthInput;


// =========================
// SELECT ACTIVE INPUT
// =========================

inputs.forEach(input => {

    input.addEventListener("focus", function () {
        activeInput = this;
    });

});


// =========================
// SHOW NUMPAD
// =========================

function show_numpad() {

    num_pad.style.display = "grid";
    no_btn.style.display = "none";

    activeInput.focus();
}


// =========================
// NUMBER BUTTON
// =========================

function numPress(number) {

    activeInput.value += number;

    activeInput.focus();
}


// =========================
// C - CLEAR ACTIVE INPUT
// =========================

function clearInput() {

    activeInput.value = "";

    activeInput.focus();
}


// =========================
// C DOUBLE TAP - HIDE NUMPAD
// =========================

function hide_numpad() {

    const length = lengthInput.value;
    const width = widthInput.value;

    // Hide ONLY if both are empty
    if (length === "" && width === "") {

        num_pad.style.display = "none";
        no_btn.style.display = "flex";

    }
}


// =========================
// E - NEXT INPUT
// =========================

function nextInput() {

    const currentIndex = inputs.indexOf(activeInput);

    if (currentIndex < inputs.length - 1) {

        activeInput = inputs[currentIndex + 1];

        activeInput.focus();

    } else {

        num_pad.style.display = "none";
        no_btn.style.display = "flex";

    }
}

function hide_numpad() {
    const leng_in = document.getElementById("length").value;
    const width_in = document.getElementById("width").value;

    if (leng_in === "" && width_in === "") {
        num_pad.style.display = "none";
        no_btn.style.display = "flex";
    }
}
