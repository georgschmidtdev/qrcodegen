let submitForm;

let submitButton;

let reloadButton;

let selectFormat;

let selectColor;

let selectBgColor;

let sizeWrapper;

let customColWrapper;

let boolReload = false;

// Listen for page to load

document.addEventListener('DOMContentLoaded', assignVariables, false);

// Assign HTML-Elements to variables

function assignVariables(){

    submitForm = document.getElementById('submitForm');

    submitForm.addEventListener('submit', handleSubmit);

    submitButton = document.getElementById('submitButton');

    reloadButton = document.getElementById('reload');

    // Reload page when reload button is clicked

    reloadButton.addEventListener('click', () => {

        window.location.reload();
    })

    selectFormat = document.getElementById('selectFormat');

    selectFormat.addEventListener('change', changeSizeOptions);

    sizeWrapper = document.querySelectorAll('.sizeWrapper');

    // Disable wrapper on load

    sizeWrapper.forEach(wrapper => {

        wrapper.style.display = 'none';
    })


    selectColor = document.getElementById('selectColor');

    selectColor.addEventListener('change', changeColVis);

    selectBgColor = document.getElementById('selectBgColor');

    selectBgColor.addEventListener('change', changeColVis);

    customColWrapper = document.querySelectorAll('.customColWrapper');

    // Disable wrapper on load

    customColWrapper.forEach(wrapper => {

        wrapper.style.display = 'none';
    })
}

// Handle visibility of HTML-elements

function handleSubmit(event){

    event.preventDefault();

    if(boolReload === false){

        let submitInput = document.getElementById('submitInput').value;

        let submitQuery = submitInput.trim();

        reloadVisibility();

        createParameters(submitQuery);
    }
}

// Handle visibilty of size options

function changeSizeOptions(event){
    
    event.preventDefault();

    // Disable / enable img size selectors

    if(
        selectFormat.value == 'svg' ||
        selectFormat.value == 'eps'){

        sizeWrapper[0].style.display = 'none';

        sizeWrapper[0].removeAttribute('required');

        sizeWrapper[1].style.display = 'block';

        sizeWrapper[1].setAttribute('required', '');
    }

    // Disable / enable vector size selectors
    
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

// Disable / enable color selector 

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

// Handle parameters for API

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

    // Use value of vector size selector if vector format is selected

    if(
        selectFormat.value == 'svg' ||
        selectFormat.value == 'eps'){

            size = selectSizeVector.value;
    }

    // Use value of img size selector if img format is selected

    else if (
        selectFormat.value == 'png' ||
        selectFormat.value == 'gif' ||
        selectFormat.value == 'jpg') {

            size = selectSizeImg.value;
    }

    // Use custom color if custom is selected

    if(selectColor.value == 'custom'){

        color = `${customColR.value}-${customColG.value}-${customColB.value}`;
    }else{

        color = selectColor.value;
    };

    // Use custom bg color if custom is selected

    if(selectBgColor.value == 'custom'){

        bgColor = `${customBgColR.value}-${customBgColG.value}-${customBgColB.value}`;
    }else{

        bgColor = selectBgColor.value;
    };

    // Concat API endpoint with parameters

    let endpoint = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&format=${format}&size=${size}&color=${color}&bgcolor=${bgColor}`;

    extractDomain(url, endpoint);
}

// Extract domain from input url

function extractDomain(url, endpoint){

    var domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];

    displayCode(url, domain, endpoint);
}

// Inject QR-Code as HTML into DOM

function displayCode(url, domain, endpoint){

    let qrWrapper = document.getElementById('qrWrapper');

    qrWrapper.innerHTML = ``;

    qrWrapper.innerHTML = `
    
    <a href="${endpoint}" download="${domain} QR-Code">
        <img src="${endpoint}" alt="${url} QR-Code" id="qrCode">
    </a>
    `;
}

// Handle visibility of reload button

function reloadVisibility(){

    boolReload = true;

    submitButton.style.display = 'none';

    reloadButton.style.display = 'block';
}