let submitForm;

let submitButton;

let reloadButton;

let selectFormat;

let selectColor;

let selectBgColor;

let sizeWrapper;

let customColWrapper;

let boolReload = false;

document.addEventListener('DOMContentLoaded', assignVariables, false);

function assignVariables(){

    submitForm = document.getElementById('submitForm');

    submitForm.addEventListener('submit', handleSubmit);

    submitButton = document.getElementById('submitButton');

    reloadButton = document.getElementById('reload');

    reloadButton.addEventListener('click', () => {

        window.location.reload();
    })


    selectFormat = document.getElementById('selectFormat');

    selectFormat.addEventListener('change', changeSizeOptions);

    sizeWrapper = document.querySelectorAll('.sizeWrapper');

    sizeWrapper.forEach(wrapper => {

        wrapper.style.display = 'none';
    })


    selectColor = document.getElementById('selectColor');

    selectColor.addEventListener('change', changeColVis);

    selectBgColor = document.getElementById('selectBgColor');

    selectBgColor.addEventListener('change', changeColVis);

    customColWrapper = document.querySelectorAll('.customColWrapper');

    customColWrapper.forEach(wrapper => {

        wrapper.style.display = 'none';
    })
}

function handleSubmit(event){

    event.preventDefault();

    if(boolReload === false){

        let submitInput = document.getElementById('submitInput').value;

        let submitQuery = submitInput.trim();

        reloadVisibility();

        createParameters(submitQuery);
    }
}

function changeSizeOptions(event){
    
    event.preventDefault();

    if(
        selectFormat.value == 'svg' ||
        selectFormat.value == 'eps'){

        sizeWrapper[0].style.display = 'none';

        sizeWrapper[0].removeAttribute('required');

        sizeWrapper[1].style.display = 'block';

        sizeWrapper[1].setAttribute('required', '');
    }
    
    else if(
        selectFormat.value == 'png' ||
        selectFormat.value == 'gif' ||
        selectFormat == 'jpg'){

        sizeWrapper[1].style.display = 'none';

        sizeWrapper[1].removeAttribute('required');
    
        sizeWrapper[0].style.display = 'block';
    
        sizeWrapper[0].setAttribute('required', '');
    }
}

function changeColVis(){

    if(selectColor.value == 'custom'){

        customColWrapper[0].style.display = 'block';
    }
    else {

        customColWrapper[0].style.display = 'none';
    }

    if(selectBgColor.value == 'custom'){

        customColWrapper[1].style.display = 'block';
    }
    else {

        customColWrapper[1].style.display = 'none';
    }
}

function createParameters(UrlToEncode){

    let url = encodeURI(UrlToEncode);

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
        selectFormat.value == 'svg' ||
        selectFormat.value == 'eps'){

            size = selectSizeVector.value;
    }
    
    else if (
        selectFormat.value == 'png' ||
        selectFormat.value == 'gif' ||
        selectFormat.value == 'jpg') {

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

function reloadVisibility(){

    boolReload = true;

    submitButton.style.display = 'none';

    reloadButton.style.display = 'block';
}

function scrollToResult(){

    let wrapper = document.getElementById('qrWrapper');

    wrapper.scrollIntoView({block: 'end', behavior: 'smooth'});
}