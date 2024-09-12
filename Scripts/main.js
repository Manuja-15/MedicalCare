function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/MedicalCare/Scripts/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        }, err => {
          console.log('Service Worker registration failed:', err);
        });
    });
  }