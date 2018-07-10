"use strict";
var Communication = (function() {
  function Communication() {
    var showMessage = function (msg) {
      document.getElementById('messageBlock').innerText = msg;
    };

    var registerEvents = function () {
      addEventListener("storage", receivedMessage);
      let event = document.createEvent("Event");
      event.initEvent("storage", true, true);
      window.dispatchEvent(event);
      // window.addEventListener('storage', receivedMessage);
      document.getElementById('messageForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var msg = document.getElementById('textInput').value;
        broadcastMsg({
          etype: 'display',
          data: msg
        });
      });
    };

    var broadcastMsg = function (message) {
      window.localStorage.setItem('message', JSON.stringify(message));
      // localStorage.removeItem('message');
    };

    var receivedMessage = function (event) {
      if ( event.etype === 'display' ) {
        let message = JSON.parse(event.newValue);
        console.log(event.data);
      }
    };

    this.init = function () {
      registerEvents();
    };
  }
  return Communication;
})(window);

var comm = new Communication();
document.addEventListener("DOMContentLoaded", function(event) { 
  comm.init();
});
