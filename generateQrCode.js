let submitForm;

let selectFormat;

let selectSizeImg;

let selectSizeVector;

let selectColor;

let colorInputs;

let selectBgColor;

let bgColorInputs;

let lables;

document.addEventListener("DOMContentLoaded", assignVariables, false);

function assignVariables(){

    submitForm = document.getElementById('submitForm');

    submitForm.addEventListener('submit', handleSubmit);


    selectFormat = document.getElementById('selectFormat');

    selectFormat.addEventListener('change', changeSizeOptions);

    selectSizeImg = document.getElementById('selectSizeImg');

    selectSizeVector = document.getElementById('selectSizeVector');

    selectSizeImg.style.display = "none";

    selectSizeVector.style.display = "none";


    selectColor = document.getElementById('selectColor');

    selectColor.addEventListener('change', changeColVis);

    colorInputs = document.querySelectorAll('.colorValue');

    colorInputs.forEach(input => {

        input.style.display = "none";
    })


    selectBgColor = document.getElementById('selectBgColor');

    selectBgColor.addEventListener('change', changeColVis);

    bgColorInputs = document.querySelectorAll('.bgColorValue');

    bgColorInputs.forEach(input => {

        input.style.display = "none";
    })


    lables = document.querySelectorAll('.selectLable');

    lables.forEach(lable => {

        lable.style.display = "none";
    })
}

function handleSubmit(event){

    event.preventDefault();

    let submitInput = document.getElementById('submitInput').value;

    let submitQuery = submitInput.trim();

    createParameters(submitQuery);
}

function changeSizeOptions(event){
    
    event.preventDefault();

    if(
        selectFormat.value == "svg" ||
        selectFormat.value == "eps"){

        selectSizeImg.style.display = "none";

        selectSizeImg.removeAttribute("required");

        selectSizeVector.style.display = "block";

        selectSizeVector.setAttribute("required", "");
    }
    
    else if(
        selectFormat.value == "png" ||
        selectFormat.value == "gif" ||
        selectFormat == "jpg"){

        selectSizeVector.style.display = "none";

        selectSizeVector.removeAttribute("required");

        selectSizeImg.style.display = "block";

        selectSizeImg.setAttribute("required", "");
    }
}

function changeColVis(){

    if(selectColor.value == "custom"){

        colorInputs.forEach(input => {

            input.style.display = "block";
        })
    }
    else {

        colorInputs.forEach(input => {

            input.style.display = "none";
        })
    }

    if(selectBgColor.value == "custom"){

        bgColorInputs.forEach(input => {

            input.style.display = "block";
        })
    }
    else {

        bgColorInputs.forEach(input => {

            input.style.display = "none";
        })
    }
}

function createParameters(UrlToEncode){

    let url = encodeURI(UrlToEncode);

    let selectSize = document.getElementById('selectSize');

    let customColR = document.getElementById('customColR');
    let customColG = document.getElementById('customColG');
    let customColB = document.getElementById('customColB');

    let customBgColR = document.getElementById('customBgColR');
    let customBgColG = document.getElementById('customBgColG');
    let customBgColB = document.getElementById('customBgColB');

    let format = selectFormat.value;
    
    let size;

    let color;

    let bgColor;

    if(
        selectFormat.value == "svg" ||
        selectFormat.value == "eps"){

            size = selectSizeVector.value;
    }
    
    else if (
        selectFormat.value == "png" ||
        selectFormat.value == "gif" ||
        selectFormat.value == "jpg") {

            size = selectSizeImg.value;
    }

    if(selectColor.value == 'custom'){

        color = `${customColR.value}-${customColG.value}-${customColB.value}`;
    }else{

        color = selectColor.value;
    };

    if(selectBgColor.value == 'custom'){

        bgColor = `${customBgColR.value}-${customBgColG.value}-${customBgColB.value}`;
    }else{

        bgColor = selectBgColor.value;
    };

    let endpoint = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&format=${format}&size=${size}&color=${color}&bgcolor=${bgColor}`;

    extractDomain(url, endpoint);
}

function extractDomain(url, endpoint){

    var domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];

    displayCode(url, domain, endpoint, scrollToResult);
}

function displayCode(url, domain, endpoint, callback){

    let qrWrapper = document.getElementById('qrWrapper');

    qrWrapper.innerHTML = ``;

    qrWrapper.innerHTML = `
    
    <a href="${endpoint}" download="${domain} QR-Code">
        <img src="${endpoint}" alt="${url} QR-Code" id="qrCode">
    </a>
    `;

    callback();
}

function scrollToResult(){

    let wrapper = document.getElementById('qrWrapper');

    wrapper.scrollIntoView({block: "end", behavior: 'smooth'});
}