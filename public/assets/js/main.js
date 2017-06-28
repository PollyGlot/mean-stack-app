// SERVICE WORKER CHECK
// if ('serviceWorker' in navigator) {
//   console.log("Chrome Supports SW!");
//   navigator.serviceWorker
//     .register('/sw.js')
//     .then(function(registration) {
//       console.log("Service Worker Registered");
//     })
//     .catch(function(err) {
//       console.log("Service Worker Failed to Register", err);
//     });
// }

// NOTIFICATION
function showNotification() {
    if(window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) {
            var title = 'Итересное название';
            var n = new Notification(title, {
                body: 'Тело уведомления, с каким-то текстом!',
                icon: '../images/icon.jpg',
                tag: 'Tag',
                onclick: 'https://localhost:8888/users'
            });
            Notification.onclick = function(event) {
                event.preventDefault();
                window.open('https://localhost:8888/users', '_blank');
            };
        });
    }
}
