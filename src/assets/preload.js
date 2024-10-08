export function preload() {
    this.load.image('sky', '../../public/img/sky.png');
    this.load.image('ground', '../../public/img/platform.png');
    this.load.image('star', '../../public/img/star.png');
    this.load.image('bomb', '../../public/img/bomb.png');
    this.load.spritesheet('dude', '../../public/img/dude.png', {
        frameWidth: 32,
        frameHeight: 48
    });
}
