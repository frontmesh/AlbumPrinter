import { on } from '../utils/handler';

export const fileSelector = document.getElementById('fileSelector');
export const imageContainer = document.getElementById('imageContainer');
export const debugContainer = document.getElementById('debugContainer');
export const generateButton = document.getElementById( 'generateButton');
export const importButton = document.getElementById( 'importButton');

export const fileSelectorChange = on('change', fileSelector);
export const generateButtonClick = on('click', generateButton);
export const importButtonClick = on('click', importButton);

// Canvas
export const canvasContainer = document.getElementById('photo');


// Photo Controls

export const scaleDownButton = document.getElementById('scaleDown');
export const scaleUpButton = document.getElementById('scaleUp');

export const moveUpButton = document.getElementById('moveUp');

export const moveDownButton = document.getElementById('moveDown');

export const moveLeftButton = document.getElementById('moveLeft');

export const moveRightButton = document.getElementById('moveRight');


export const scaleDownClick = on('click', scaleDownButton);
export const scaleUpClick = on('click', scaleUpButton);

export const moveDownClick = on('click', moveDownButton);
export const moveUpClick = on('click', moveUpButton);


export const moveLeftClick = on('click', moveLeftButton);
export const moveRightClick = on('click', moveRightButton);

