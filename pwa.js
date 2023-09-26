if ('serviceWorker' in navigator) {
  console.log("Will the service worker register?");
  navigator.serviceWorker.register('service-worker.js')
    .then(function(reg) {
      console.log("Yes, it did.");
    }).catch(function(err) {
      console.log("No it didn't. This happened: ", err)
    });
}

let installPromptEvent;
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installPromptEvent = event;
  showCustomInstallPrompt();
});

const installButton = document.getElementById("installPWA");

installButton.addEventListener('click', ()=>{
  if(installPromptEvent){
    installPromptEvent.prompt();
  }else{
    alert("Sorry, you can't install this app on this device.")
  }
})

function showCustomInstallPrompt(){
  // Render an HTML modal.
}


// #region Background Sync. Fired when network is stable an batt in good level.
// if('SyncManager' in window){
//   const registration = await navigator.serviceWorker.ready;
//   registration.sync.register("tag-name");
// }
// #endregion

//#region Periodic Sync.
// const permissionStatus = await navigator.permissions.query({
//   name: 'periodic-background-sync',
// });
// const registration = await navigator.serviceWorker.ready;
// if ('periodicSync' in registration) {
//   try {
//     await registration.periodicSync.register('sync-tag',{
//       minInterval : 24 * 60 * 60 * 100 // One Day.
//     });    
//   } catch (error) {
//     console.error(error);
//   }
// }
//#endregion
