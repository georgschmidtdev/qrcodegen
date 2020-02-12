document.addEventListener("DOMContentLoaded", assignVariables, false);

function assignVariables(){

    let submitForm = document.getElementById('submitForm');

    submitForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(event){

    event.preventDefault();

    let submitInput = document.getElementById('submitInput').value;

    let submitQuery = submitInput.trim();

    fetchQrCode(submitQuery);
}

function fetchQrCode(UrlToEncode){

    console.log(UrlToEncode);

    let endpoint = 'http(s)://api.qrserver.com/v1/create-qr-code/?data=[URL-codierter-Text]&size=[Pixel]x[Pixel]'
}