let submitForm;

let selectFormat;

let selectSizeImg;

let selectSizeVector;

let selectColor;

let selectBgColor;

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


    selectBgColor = document.getElementById('selectBgColor');

    selectBgColor.addEventListener('change', changeBgColVis);
}

function handleSubmit(event){

    event.preventDefault();

    let submitInput = document.getElementById('submitInput').value;

    let submitQuery = submitInput.trim();

    createParameters(submitQuery);
}

function changeSizeOptions(event){
    
    event.preventDefault();

    if(selectFormat.value == "svg" || selectFormat.value == "eps"){

        selectSizeImg.style.display = "none";

        selectSizeVector.style.display = "block";
    }else
    if(selectFormat.value == "png" || selectFormat.value == "gif" || selectFormat == "jpg"){

        selectSizeVector.style.display = "none";

        selectSizeImg.style.display = "block";
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
    
    let size = selectSize.value;

    let color;

    let bgColor;

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