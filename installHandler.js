let deferredPrompt;

let addToHs;

window.addEventListener('DOMContentLoaded', () => {
    
    addToHs = document.getElementById('addToHs');
})

window.addEventListener('beforeinstallprompt', (event) => {

    deferredPrompt = event;

    assignBtn();
})

function assignBtn(){

    addToHs.addEventListener('click', (e) => {

        addToHs.style.display = 'none';
    
        deferredPrompt.prompt();
    
        deferredPrompt.userChoice
        .then((choiceResult) => {
    
            if(choiceResult.outcome === 'accepted') {
                console.log('User accepted');
            }
            else {
                console.log('User dismissed');
            }
            deferredPrompt = null;
        })
    })
}

window.addEventListener('appinstalled', (event) => {

    console.log('app installed', event);

    let addToHs = document.getElementById('addToHs');

    addToHs.style.display = 'none';
})