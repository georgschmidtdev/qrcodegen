let deferredPrompt;

let addToHs;

document.addEventListener("DOMContentLoaded", assignBtn, false);

function assignBtn(){
    
    addToHs = document.getElementById('addToHs');

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

window.addEventListener('beforeinstallprompt', (e) => {

    deferredPrompt = e;
})

window.addEventListener('appinstalled', (evt) => {

    console.log('app installed');
})