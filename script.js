const see_area = document.getElementById("see-area");
const done_btn = document.getElementById("done");

function show(){
    see_area.style.display = "flex";
};

function off(){
    see_area.style.display = "none";
};

function calculation(){

    const price = Number(document.getElementById("price").value)

    const leng_in = Number(document.getElementById("length").value);
    const width_in = Number(document.getElementById("width").value);

    let cft = (leng_in * width_in * width_in) / 2304 ;
    let price_unit = ("LKR ") + (price * cft).toFixed(2);

    alert(price_unit);
};