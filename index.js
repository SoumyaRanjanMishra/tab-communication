window.addEventListener('load', function() {
  registerServiceWorker();
  init();
});

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function() {
            return navigator.serviceWorker.ready;
        })
        .then(function(reg) {
            console.log('Service Worker is ready', reg);
            navigator.serviceWorker.addEventListener('message', function(event){
                if (event.data) {
                    let data = event.data;
                    if (data.property === 'message' && data.state !== undefined) {
                      showMessage(data.state, true);
                    }
                }
            });
        }).catch(function(error) {
            console.log('Error : ', error);
        });
  }
}

function init() {
  let storedMsg = localStorage.getItem("message");

  storedMsg && showMessage(storedMsg, false);

  document.getElementById('messageForm').addEventListener("submit", submitForm);
}

function submitForm(event) {
  event.preventDefault();
  let msg = document.getElementById('textInput').value;
  showMessage(msg, false);
}

function showMessage(msg, fromOtherTab) {
  document.getElementById('messageBlock').innerText = msg;
  if (!fromOtherTab) {
    localStorage.setItem('message', msg);
    stateToServiceWorker({property: "message", state: msg});
  }
}

function stateToServiceWorker(data){
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller
          .postMessage(data);
  }
}
