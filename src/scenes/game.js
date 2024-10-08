import { jump, moveLeft, stopMoveLeft, moveRight, stopMoveRight } from "../WebSockets/socketsClient";
import { detectDeviceType } from "../utils/device";

let players = [];
let playersSockets = []
const keys = new Set([]);

let currentPlayer;
let broadcastJump = false;
let broadcastLeft = false;
let broadcastRight = false;
let localJump = false;

export function setUpdateUsers(data) {
    currentPlayer = localStorage.getItem('username');
    playersSockets = [];

    data.forEach((username, index) => {
        if (!playersSockets[index]) {
            playersSockets[index] = { 'username': username };
        }
    });
}

export function create() {
    const background = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    background.setDisplaySize(2000, 2000);

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 775, 'ground').setScale(8, 2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    for (let index = 0; index < playersSockets.length; index++) {
        let x = 100 + index * 40;
        players[index] = this.physics.add.sprite(x, 650, 'dude');
        players[index].setBounce(0);
        players[index].setCollideWorldBounds(true);

        this.physics.add.collider(players[index], platforms);

        this.cameras.main.setBounds(0, 0, 2000, 800)
        this.physics.world.setBounds(0, 0, 2000, 800)

        if (playersSockets[index].username === currentPlayer) {
            this.cameras.main.startFollow(players[index]);
        }
    }
}

export function update() {
    for (let index = 0; index < playersSockets.length; index++) {
        if (currentPlayer === playersSockets[index].username) {
            if (keys.has('KeyA')) {
                players[index].setVelocityX(-160);
            } else if (keys.has('KeyD')) {
                players[index].setVelocityX(160);
            } else {
                players[index].setVelocityX(0);
            }
            if (keys.has('Space') && players[index].body.touching.down || localJump && players[index].body.touching.down) {
                players[index].setVelocityY(-330);
                localJump = false;
                jump();
            }
        } else {
            if (broadcastLeft) {
                players[index].setVelocityX(-160);
            } else if (broadcastRight) {
                players[index].setVelocityX(160);
            } else {
                players[index].setVelocityX(0);
            }
            if (broadcastJump && players[index].body.touching.down) {
                players[index].setVelocityY(-330);
                broadcastJump = false;
            }
        }
    }
}

export function setExternalRight() {
    broadcastRight = true;
}

export function stopExternalRight() {
    broadcastRight = false;
}

export function setExternalJump() {
    broadcastJump = true;
}

export function setExternalLeft() {
    broadcastLeft = true;
}

export function setMobileJump() {
    localJump = true;
}

export function setMobileLeft(estado) {
    if (estado) {
        keys.add('KeyA')
        moveLeft();
    } else {
        keys.delete('KeyA');
        stopMoveLeft();
    }
}

export function setMobileRigth(estado) {
    if (estado) {
        keys.add('KeyD')
        moveRight();
    } else {
        keys.delete('KeyD');
        stopMoveRight();
    }
}

export function stopExternalLeft() {
    broadcastLeft = false;
}

document.addEventListener('keydown', (event) => {
    keys.add(event.code);
    if (event.code === 'KeyA') {
        moveLeft();
    }
    if (event.code === 'KeyD') {
        moveRight();
    }
});

document.addEventListener('keyup', (event) => {
    keys.delete(event.code);
    if (event.code === 'KeyA') {
        stopMoveLeft();
    }
    if (event.code === 'KeyD') {
        stopMoveRight();
    }
});

if(detectDeviceType()==='Mobile'){
    const controller = document.getElementById('controller');
    controller.style.zIndex = '2';
}