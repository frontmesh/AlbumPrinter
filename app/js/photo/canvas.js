import getCoverSize from '@agilie/canvas-image-cover-position'
import { canvasContainer } from '../selectors/';
import { inToPx } from '../utils/convert';
import { multiply } from '../utils/';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from './const';

export const setupCanvas = () => {
  const canvas = canvasContainer;
  canvas.width = inToPx(CANVAS_WIDTH);
  canvas.height = inToPx(CANVAS_HEIGHT);
  return canvas;
};

export const getCanvasCtx = () =>
  canvasContainer.getContext('2d')

export const clearCanvas = () =>
  getCanvasCtx()
    .clearRect(0,0,canvasContainer.width, canvasContainer.height)

export const drawImage = (img, oX, oY, scale) => {
  clearCanvas();

  const coverImage = getCoverSize(
    multiply(img.width, scale),
    multiply(img.height,scale),
    canvasContainer.width,
    canvasContainer.height,
    oX,
    oY
  );

  coverImage.offsetLeft = oX;
  coverImage.offsetTop = oY;

  const fitsCanvas = (coverImage.width * scale >= canvasContainer.width) &&
    (coverImage.height * scale >= canvasContainer.height);

    getCanvasCtx().drawImage(
      img,
      coverImage.offsetLeft,
      coverImage.offsetTop,
      fitsCanvas ? coverImage.width * scale : coverImage.width,
      fitsCanvas ? coverImage.height * scale : coverImage.height
  );
};
