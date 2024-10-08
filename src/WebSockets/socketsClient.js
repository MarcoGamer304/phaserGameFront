import { io } from 'socket.io-client'
import { setUpdateUsers, setExternalJump, setExternalLeft, stopExternalLeft, setExternalRight, stopExternalRight, setMobileJump, setMobileRigth,setMobileLeft  } from '../scenes/game';
import { initGame } from '../config/config';

const socket = io.connect('https://websocketsjuego-production.up.railway.app/');

let users = new Set([]);
let intervalUpdateUsers;

const nameUser = localStorage.getItem('username');
socket.emit('userRegister', nameUser);

socket.on('updateUsers', (data) => {
    users = new Set(data);
    setUpdateUsers(data)
    // current users
})

socket.on('connectionError', (data) => {
    alert(data)
    window.location.href = '../../index.html'
})

intervalUpdateUsers = setInterval(() => {
    socket.emit('getUpdateUsers');
    if (users.size >= 2) {
        console.log([...users]);
        console.log('numero de jugadores: ' + users.size)
        loadGame();
        clearInterval(intervalUpdateUsers)
    }
}, 100);

function loadGame() {
    initGame();
}

const cameraCenter = document.getElementById('camera-center')
cameraCenter.addEventListener('touchstart', () => {
    setMobileJump()
})
const controllerRigth = document.getElementById('controller-rigth')

controllerRigth.addEventListener('touchstart', () => {
    setMobileRigth(true);
})

controllerRigth.addEventListener('touchend', () => {
    setMobileRigth(false);
})

const controllerLeft = document.getElementById('controller-left')

controllerLeft.addEventListener('touchstart', () => {
    setMobileLeft(true);
})

controllerLeft.addEventListener('touchend', () => {
    setMobileLeft(false)
})


socket.on('playerServerJump', () => {
    setExternalJump()
})

socket.on('playerServerleft', () => {
    setExternalLeft()
})

socket.on('playerServerStopleft', () => {
    stopExternalLeft()
})

socket.on('playerServerRight', () => {
    setExternalRight()
})

socket.on('playerServerStopRight', () => {
    stopExternalRight()
})

export function moveLeft() {
    socket.emit('playerleft');
}

export function stopMoveLeft() {
    socket.emit('playerStopleft');
}

export function moveRight() {
    socket.emit('playerRight');
}

export function stopMoveRight() {
    socket.emit('playerStopRight');
}

export function jump() {
    socket.emit('jumpPlayer');
}