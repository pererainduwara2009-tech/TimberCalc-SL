/* ==================================================
   ELEMENTS
================================================== */

// Wood selector area
const see_area = document.getElementById("see-area");
const done_btn = document.getElementById("done");

// Bill
const table = document.getElementById("table-previwe");
const bill_body = document.getElementById("bill-body");

// Total
const total_area = document.getElementById("total-see");
const see_total = document.getElementById("total");

// Wood
const woodType = document.getElementById("wood-type");
const priceInput = document.getElementById("price");

// Top bar
const selectedWood = document.getElementById("selected-wood");
const selectedPrice = document.getElementById("selected-price");


/* ==================================================
   TOTAL
================================================== */

let total = 0;


/* ==================================================
   SHOW WOOD SETTINGS
================================================== */

function show() {

    see_area.style.display = "block";

}


/* ==================================================
   DONE
   UPDATE TOP BAR THEN CLOSE
================================================== */

function off() {

    /*
        Get the currently selected
        wood name from the select box.
    */

    const woodName =
        woodType.options[woodType.selectedIndex].text;


    /*
        Get the price from the input.
    */

    const price =
        Number(priceInput.value);


    /*
        Update wood name in the top bar.
    */

    selectedWood.textContent =
        woodName;


    /*
        Update price in the top bar.
    */

    if (price > 0) {

        selectedPrice.textContent =
            "LKR " + price.toLocaleString();

    } else {

        selectedPrice.textContent =
            "LKR 0.00";

    }


    /*
        Close the expanded area.
    */

    see_area.style.display = "none";

}


/* ==================================================
   NUMPAD ELEMENTS
================================================== */

const num_pad =
    document.getElementById("num-pad");

const no_btn =
    document.getElementById("btn_mark");


/* ==================================================
   LENGTH + WIDTH INPUTS
================================================== */

const lengthInput =
    document.getElementById("length");

const widthInput =
    document.getElementById("width");


const inputs = [

    lengthInput,
    widthInput

];


let activeInput = lengthInput;


/* ==================================================
   SELECT ACTIVE INPUT
================================================== */

inputs.forEach(function (input) {

    input.addEventListener(
        "focus",
        function () {

            activeInput = this;

        }
    );

});


/* ==================================================
   SHOW NUMPAD
================================================== */

function show_numpad() {

    num_pad.style.display = "grid";

    no_btn.style.display = "none";

    activeInput.focus();

}


/* ==================================================
   CALCULATION
================================================== */

function calculation() {


    /* ----------------------------------------------
       GET PRICE
    ---------------------------------------------- */

    const price =
        Number(priceInput.value);


    /* ----------------------------------------------
       GET LENGTH
    ---------------------------------------------- */

    const leng_in =
        Number(lengthInput.value);


    /* ----------------------------------------------
       GET WIDTH
    ---------------------------------------------- */

    const width_in =
        Number(widthInput.value);


    /* ----------------------------------------------
       CHECK VALUES
    ---------------------------------------------- */

    if (
        price <= 0 ||
        leng_in <= 0 ||
        width_in <= 0
    ) {

        alert(
            "Please enter wood price, length and width."
        );

        return;

    }


    /* ----------------------------------------------
       CALCULATE CFT
    ---------------------------------------------- */

    const cft =
        (leng_in * width_in * width_in) / 2304;


    /* ----------------------------------------------
       CALCULATE ITEM PRICE
    ---------------------------------------------- */

    const itemPrice =
        price * cft;


    /* ----------------------------------------------
       FORMAT ITEM PRICE
    ---------------------------------------------- */

    const price_unit =
        "LKR " + itemPrice.toFixed(2);


    /* ----------------------------------------------
       ADD NEW BILL ROW
    ---------------------------------------------- */

    bill_body.insertAdjacentHTML(
        "beforeend",

        `
        <tr>

            <td>
                ${width_in}
            </td>

            <td>
                ${leng_in}
            </td>

            <td>
                ${cft.toFixed(2)}
            </td>

            <td>
                ${price_unit}
            </td>

        </tr>
        `
    );


    /* ----------------------------------------------
       ADD ITEM PRICE TO TOTAL
    ---------------------------------------------- */

    total =
        total + itemPrice;


    /* ----------------------------------------------
       SHOW TOTAL
    ---------------------------------------------- */

    see_total.textContent =
        "LKR " + total.toFixed(2);

}


/* ==================================================
   NUMPAD NUMBER
================================================== */

function numPress(number) {

    /*
        Add the pressed number
        to the active input.
    */

    activeInput.value += number;


    /*
        Keep the active input focused.
    */

    activeInput.focus();

}


/* ==================================================
   CLEAR ACTIVE INPUT
================================================== */

function clearInput() {

    activeInput.value = "";

    activeInput.focus();

}


/* ==================================================
   DOUBLE C
   HIDE NUMPAD
================================================== */

function hide_numpad() {

    const leng_in =
        lengthInput.value;

    const width_in =
        widthInput.value;


    /*
        Hide numpad only when
        both inputs are empty.
    */

    if (
        leng_in === "" &&
        width_in === ""
    ) {

        num_pad.style.display = "none";

        no_btn.style.display = "flex";

    }

}


/* ==================================================
   E BUTTON
   MOVE TO NEXT INPUT
================================================== */

function nextInput() {

    const currentIndex =
        inputs.indexOf(activeInput);


    /*
        If there is another input,
        move to it.
    */

    if (
        currentIndex <
        inputs.length - 1
    ) {

        activeInput =
            inputs[currentIndex + 1];

        activeInput.focus();

    }


    /*
        Otherwise close numpad.
    */

    else {

        num_pad.style.display = "none";

        no_btn.style.display = "flex";

    }

}
