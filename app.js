let root = document.querySelector(':root');
let notificationCount = getComputedStyle(root).getPropertyValue('--notifications');
const markAllRead = document.querySelector('.mark-as-read');
const activeSites = document.querySelectorAll('.wrapper-container');
const notificationDiv = document.querySelectorAll('.notification-divs');
const notifHeader = document.querySelector('.notifications-header');
const notifAfter = getComputedStyle(notifHeader, '::after');

let notificationNumberCount = 0;

function activePointSorter () {
    //Calculate how many notifications are available
    for (let activeSite of activeSites) {
        let activePoint = activeSite.lastChild.previousSibling.previousSibling.previousSibling;
        let cssAfter = getComputedStyle(activePoint, '::after');
        let displayNumber = cssAfter.getPropertyValue('display').length;
        notificationNumberCount = (displayNumber + 1);
    }
}

function pushNotif () {
    //Push notification count to the DOM
    root.style.setProperty('--notifications', `"${notificationNumberCount.toString()}"`)
}

function openNotifications () {
    //Get number of open notifications
    activePointSorter();
    pushNotif();
}

openNotifications();


for (let notificationContainer of notificationDiv) {
    notificationContainer.addEventListener ('click', (e) => {
        e.stopPropagation();
        let targetPoint = notificationContainer.children[1].lastChild.previousSibling.previousSibling.previousSibling;
        let cssAfter = getComputedStyle(targetPoint, '::after');

        if (cssAfter.display === 'inline') {
            targetPoint.style.setProperty('--display-property', 'none');
            notificationNumberCount--;
            pushNotif();
        }
    })
}

function markRead () {
    //Mark all notificaions as read
    for (let activeSite of activeSites) {
        let activePoint = activeSite.lastChild.previousSibling.previousSibling.previousSibling;
        let cssAfter = getComputedStyle(activePoint, '::after');
        activePoint.style.setProperty('--display-property', 'none');
    }
}


markAllRead.addEventListener('click', () => {
    markRead();
    notificationNumberCount = '0';
    pushNotif();
})


