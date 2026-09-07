/* ==================================================
   SUPABASE
================================================== */

const SUPABASE_URL =
    "https://jythcpntirluezgbltjv.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_06QcN-PZQAmr3pGrbLuUlA_za--3GdS";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* ==================================================
   CURRENT USER
================================================== */

let currentUser = null;


/* ==================================================
   ELEMENTS
================================================== */

// Wood

const see_area =
    document.getElementById("see-area");

const done_btn =
    document.getElementById("done");

const woodType =
    document.getElementById("wood-type");

const priceInput =
    document.getElementById("price");

const selectedWood =
    document.getElementById("selected-wood");

const selectedPrice =
    document.getElementById("selected-price");


// Bill

const bill_body =
    document.getElementById("bill-body");

const see_total =
    document.getElementById("total");

const saveBillButton =
    document.getElementById("save-bill-btn");

const savedBillsButton =
    document.getElementById("saved-bills-btn");


// Numpad

const num_pad =
    document.getElementById("num-pad");

const no_btn =
    document.getElementById("btn_mark");

const lengthInput =
    document.getElementById("length");

const widthInput =
    document.getElementById("width");


/* ==================================================
   BILL DATA
================================================== */

let total = 0;

let currentItems = [];


/* ==================================================
   START GUEST SESSION
================================================== */

async function startGuestSession() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {

            console.error(
                "SESSION ERROR:",
                error
            );

            return false;
        }


        if (data.session) {

            currentUser =
                data.session.user;

            console.log(
                "Existing session:",
                currentUser.id
            );

            await checkSavedBills();

            return true;
        }


        const {
            data: guestData,
            error: guestError
        } =
            await supabaseClient
                .auth
                .signInAnonymously();


        if (guestError) {

            console.error(
                "GUEST SESSION ERROR:",
                guestError
            );

            alert(
                "Could not start the guest session.\n\n" +
                guestError.message
            );

            return false;
        }


        currentUser =
            guestData.user;


        console.log(
            "New guest account:",
            currentUser.id
        );


        await checkSavedBills();

        return true;

    } catch (error) {

        console.error(
            "SESSION START ERROR:",
            error
        );

        alert(
            "Could not start the application session."
        );

        return false;

    }

}


/* ==================================================
   CHECK SAVED BILLS
================================================== */

async function checkSavedBills() {

    if (!currentUser) {
        return;
    }


    try {

        const {
            count,
            error
        } =
            await supabaseClient
                .from("bills")
                .select(
                    "id",
                    {
                        count: "exact",
                        head: true
                    }
                )
                .eq(
                    "user_id",
                    currentUser.id
                );


        if (error) {

            console.error(
                "CHECK SAVED BILLS ERROR:",
                error
            );

            savedBillsButton.style.display =
                "none";

            return;
        }


        if (count > 0) {

            savedBillsButton.style.display =
                "block";

        } else {

            savedBillsButton.style.display =
                "none";

        }

    } catch (error) {

        console.error(
            "CHECK SAVED BILLS ERROR:",
            error
        );

        savedBillsButton.style.display =
            "none";

    }

}


/* ==================================================
   INITIALIZE
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        saveBillButton.style.display =
            "none";

        savedBillsButton.style.display =
            "none";

        await startGuestSession();

    }
);


/* ==================================================
   WOOD SETTINGS
================================================== */

function show() {

    see_area.style.display =
        "block";

}


function off() {

    const woodName =
        woodType
            .options[
                woodType.selectedIndex
            ]
            .text;


    const price =
        Number(
            priceInput.value
        );


    selectedWood.textContent =
        woodName;


    if (price > 0) {

        selectedPrice.textContent =
            "LKR " +
            price.toLocaleString();

    } else {

        selectedPrice.textContent =
            "LKR 0.00";

    }


    see_area.style.display =
        "none";

}


/* ==================================================
   NUMPAD
================================================== */

const inputs = [
    lengthInput,
    widthInput
];


let activeInput =
    lengthInput;


inputs.forEach(
    function (input) {

        input.addEventListener(
            "focus",
            function () {

                activeInput =
                    this;

            }
        );

    }
);


function show_numpad() {

    num_pad.style.display =
        "grid";

    no_btn.style.display =
        "none";

    activeInput.focus();

}


function numPress(number) {

    activeInput.value +=
        number;

    activeInput.focus();

}


function clearInput() {

    activeInput.value =
        "";

    activeInput.focus();

}


function hide_numpad() {

    const length =
        lengthInput.value;

    const width =
        widthInput.value;


    if (
        length === "" &&
        width === ""
    ) {

        num_pad.style.display =
            "none";

        no_btn.style.display =
            "flex";

    }

}


function nextInput() {

    const currentIndex =
        inputs.indexOf(
            activeInput
        );


    if (
        currentIndex <
        inputs.length - 1
    ) {

        activeInput =
            inputs[
                currentIndex + 1
            ];

        activeInput.focus();

    } else {

        num_pad.style.display =
            "none";

        no_btn.style.display =
            "flex";

    }

}


/* ==================================================
   CALCULATE
================================================== */

async function calculation() {

    const price =
        Number(
            priceInput.value
        );

    const length =
        Number(
            lengthInput.value
        );

    const width =
        Number(
            widthInput.value
        );


    /* ----------------------------------------------
       VALIDATION
    ---------------------------------------------- */

    if (
        price <= 0 ||
        length <= 0 ||
        width <= 0
    ) {

        alert(
            "Please enter wood price, length and width."
        );

        return;

    }


    /* ----------------------------------------------
       SESSION
    ---------------------------------------------- */

    if (!currentUser) {

        const started =
            await startGuestSession();


        if (!started) {
            return;
        }

    }


    /* ----------------------------------------------
       CFT
    ---------------------------------------------- */

    const cft =
        (
            length *
            width *
            width
        ) / 2304;


    /* ----------------------------------------------
       PRICE
    ---------------------------------------------- */

    const itemPrice =
        price *
        cft;


    /* ----------------------------------------------
       WOOD NAME
    ---------------------------------------------- */

    const woodName =
        woodType
            .options[
                woodType.selectedIndex
            ]
            .text;


    /* ----------------------------------------------
       CREATE ITEM
    ---------------------------------------------- */

    const item = {

        wood_type:
            woodName,

        price_per_cft:
            price,

        length_ft:
            length,

        width_in:
            width,

        cft:
            cft,

        item_price:
            itemPrice

    };


    currentItems.push(
        item
    );


    /* ----------------------------------------------
       SHOW ITEM
    ---------------------------------------------- */

    bill_body.insertAdjacentHTML(
        "beforeend",

        `
        <tr>

            <td>
                ${width}
            </td>

            <td>
                ${length}
            </td>

            <td>
                ${cft.toFixed(2)}
            </td>

            <td>
                LKR ${itemPrice.toFixed(2)}
            </td>

        </tr>
        `
    );


    /* ----------------------------------------------
       UPDATE TOTAL
    ---------------------------------------------- */

    total +=
        itemPrice;


    see_total.textContent =
        "LKR " +
        total.toFixed(2);


    /* ----------------------------------------------
       SHOW SAVE BILL BUTTON
    ---------------------------------------------- */

    saveBillButton.style.display =
        "block";


    /* ----------------------------------------------
       CLEAR INPUTS
    ---------------------------------------------- */

    lengthInput.value =
        "";

    widthInput.value =
        "";

    lengthInput.focus();


    console.log(
        "Item added to current bill."
    );

}


/* ==================================================
   SAVE BILL
================================================== */

function saveBill() {

    if (
        currentItems.length === 0
    ) {

        alert(
            "Add at least one item before saving the bill."
        );

        return;

    }


    const modal =
        document.getElementById(
            "save-modal"
        );


    const nameInput =
        document.getElementById(
            "bill-name"
        );


    nameInput.value =
        "";


    modal.style.display =
        "flex";


    setTimeout(
        function () {

            nameInput.focus();

        },
        100
    );

}


/* ==================================================
   CONFIRM SAVE BILL
================================================== */

async function confirmSaveBill() {

    const nameInput =
        document.getElementById(
            "bill-name"
        );


    const billName =
        nameInput.value.trim();


    if (!billName) {

        alert(
            "Please enter a bill name."
        );

        nameInput.focus();

        return;

    }


    if (!currentUser) {

        const started =
            await startGuestSession();


        if (!started) {
            return;
        }

    }


    const saveButton =
        document.querySelector(
            ".modal-action"
        );


    saveButton.disabled =
        true;


    saveButton.textContent =
        "Saving...";


    try {

        /* ------------------------------------------
           CREATE BILL
        ------------------------------------------ */

        const {
            data: bill,
            error: billError
        } =
            await supabaseClient
                .from("bills")
                .insert({

                    user_id:
                        currentUser.id,

                    bill_name:
                        billName,

                    total:
                        total

                })
                .select()
                .single();


        if (billError) {
            throw billError;
        }


        if (!bill) {

            throw new Error(
                "The bill was not returned after saving."
            );

        }


        /* ------------------------------------------
           PREPARE ITEMS
        ------------------------------------------ */

        const itemsToSave =
            currentItems.map(
                function (item) {

                    return {

                        bill_id:
                            bill.id,

                        user_id:
                            currentUser.id,

                        wood_type:
                            item.wood_type,

                        price_per_cft:
                            item.price_per_cft,

                        length_ft:
                            item.length_ft,

                        width_in:
                            item.width_in,

                        cft:
                            item.cft,

                        item_price:
                            item.item_price

                    };

                }
            );


        /* ------------------------------------------
           SAVE ITEMS
        ------------------------------------------ */

        const {
            error: itemError
        } =
            await supabaseClient
                .from(
                    "wood_calculations"
                )
                .insert(
                    itemsToSave
                );


        if (itemError) {

            /*

               The bill itself may already have
               been created. We report the exact
               item-saving error instead of hiding it.

            */

            throw itemError;

        }


        /* ------------------------------------------
           SUCCESS
        ------------------------------------------ */

        closeSaveModal();


        alert(
            `"${billName}" saved successfully.`
        );


        console.log(
            "Bill saved:",
            bill
        );


        /* ------------------------------------------
           BUTTON STATE
        ------------------------------------------ */

        saveBillButton.style.display =
            "none";


        savedBillsButton.style.display =
            "block";


        /* ------------------------------------------
           START NEW BILL
        ------------------------------------------ */

        startNewBill();


    } catch (error) {

        console.error(
            "SAVE BILL ERROR:",
            error
        );


        alert(
            "Could not save the bill.\n\n" +
            error.message
        );

    }


    saveButton.disabled =
        false;


    saveButton.textContent =
        "Save Bill";

}


/* ==================================================
   START NEW BILL
================================================== */

function startNewBill() {

    currentItems =
        [];

    total =
        0;


    bill_body.innerHTML =
        "";


    see_total.textContent =
        "LKR 0.00";


    lengthInput.value =
        "";

    widthInput.value =
        "";


    lengthInput.focus();

}


/* ==================================================
   SHOW SAVED BILLS
================================================== */

async function showSavedBills() {

    const modal =
        document.getElementById(
            "saved-modal"
        );


    const list =
        document.getElementById(
            "saved-bills-list"
        );


    modal.style.display =
        "flex";


    list.innerHTML = `
        <p class="empty-bills">
            Loading your bills...
        </p>
    `;


    if (!currentUser) {

        const started =
            await startGuestSession();


        if (!started) {
            return;
        }

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("bills")
            .select(
                "id, bill_name, total, created_at"
            )
            .eq(
                "user_id",
                currentUser.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "LOAD BILLS ERROR:",
            error
        );


        list.innerHTML = `
            <p class="empty-bills">
                Could not load your bills.
            </p>
        `;

        return;

    }


    if (
        !data ||
        data.length === 0
    ) {

        list.innerHTML = `
            <div class="empty-bills">
                <p>
                    No saved bills yet.
                </p>
            </div>
        `;

        return;

    }


    list.innerHTML =
        "";


    data.forEach(
        function (bill) {

            const date =
                new Date(
                    bill.created_at
                ).toLocaleDateString();


            list.insertAdjacentHTML(
                "beforeend",

                `
                <button
                    class="saved-bill-item"
                    onclick="openSavedBill('${bill.id}')"
                >

                    <div>

                        <strong>
                            ${escapeHTML(
                                bill.bill_name
                            )}
                        </strong>

                        <small>
                            ${date}
                        </small>

                    </div>


                    <span>
                        LKR ${Number(
                            bill.total
                        ).toFixed(2)}
                    </span>

                </button>
                `
            );

        }
    );

}


/* ==================================================
   OPEN SAVED BILL
================================================== */

async function openSavedBill(
    billId
) {

    const {
        data: bill,
        error: billError
    } =
        await supabaseClient
            .from("bills")
            .select(
                "id, bill_name, total, created_at"
            )
            .eq(
                "id",
                billId
            )
            .single();


    if (billError) {

        console.error(
            "LOAD BILL ERROR:",
            billError
        );


        alert(
            "Could not load the bill.\n\n" +
            billError.message
        );

        return;

    }


    const {
        data: items,
        error: itemError
    } =
        await supabaseClient
            .from(
                "wood_calculations"
            )
            .select(
                "wood_type, price_per_cft, length_ft, width_in, cft, item_price"
            )
            .eq(
                "bill_id",
                billId
            )
            .order(
                "created_at",
                {
                    ascending: true
                }
            );


    if (itemError) {

        console.error(
            "LOAD BILL ITEMS ERROR:",
            itemError
        );


        alert(
            "Could not load bill items.\n\n" +
            itemError.message
        );

        return;

    }


    document.getElementById(
        "view-bill-name"
    ).textContent =
        bill.bill_name;


    const content =
        document.getElementById(
            "view-bill-content"
        );


    let rows =
        "";


    items.forEach(
        function (item) {

            rows += `

                <tr>

                    <td>
                        ${escapeHTML(
                            item.wood_type
                        )}
                    </td>

                    <td>
                        ${item.width_in}
                    </td>

                    <td>
                        ${item.length_ft}
                    </td>

                    <td>
                        ${Number(
                            item.cft
                        ).toFixed(2)}
                    </td>

                    <td>
                        LKR ${Number(
                            item.item_price
                        ).toFixed(2)}
                    </td>

                </tr>

            `;

        }
    );


    content.innerHTML = `

        <div class="preview">

            <table>

                <thead>

                    <tr>

                        <th>
                            Wood
                        </th>

                        <th>
                            Width
                        </th>

                        <th>
                            Length
                        </th>

                        <th>
                            CFT
                        </th>

                        <th>
                            Price
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${rows}

                </tbody>

            </table>

        </div>


        <div class="saved-total">

            <span>
                TOTAL
            </span>

            <strong>
                LKR ${Number(
                    bill.total
                ).toFixed(2)}
            </strong>

        </div>

    `;


    closeSavedBills();


    document.getElementById(
        "view-modal"
    ).style.display =
        "flex";

}


/* ==================================================
   CLOSE SAVE MODAL
================================================== */

function closeSaveModal() {

    document.getElementById(
        "save-modal"
    ).style.display =
        "none";

}


/* ==================================================
   CLOSE SAVED BILLS
================================================== */

function closeSavedBills() {

    document.getElementById(
        "saved-modal"
    ).style.display =
        "none";

}


/* ==================================================
   CLOSE VIEW BILL
================================================== */

function closeViewBill() {

    document.getElementById(
        "view-modal"
    ).style.display =
        "none";

}


/* ==================================================
   SECURITY HELPER
================================================== */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


/* ==================================================
   CLOSE MODALS OUTSIDE
================================================== */

window.addEventListener(
    "click",
    function (event) {

        const saveModal =
            document.getElementById(
                "save-modal"
            );


        const savedModal =
            document.getElementById(
                "saved-modal"
            );


        const viewModal =
            document.getElementById(
                "view-modal"
            );


        if (
            event.target ===
            saveModal
        ) {

            closeSaveModal();

        }


        if (
            event.target ===
            savedModal
        ) {

            closeSavedBills();

        }


        if (
            event.target ===
            viewModal
        ) {

            closeViewBill();

        }

    }
);