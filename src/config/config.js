import Phaser from "phaser";
import { preload } from "../assets/preload";
import { create } from "../scenes/game";
import { update } from "../scenes/game";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

export function initGame() {
    const game = new Phaser.Game(config);

    window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('orientationchange', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    })
}




