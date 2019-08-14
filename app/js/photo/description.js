import { CANVAS_WIDTH, CANVAS_HEIGHT } from './const';

export const getDescription = (img, oX, oY) => JSON.stringify({
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    photo: {
      name: img.name,
      width: img.width,
      height: img.height,
      x: oX,
      y: oY,
  }
  }
})