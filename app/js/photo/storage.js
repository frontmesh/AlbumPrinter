import { STORAGE_KEY } from './const';

export const save = (img, oX, oY) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ img, oX, oY }));
  return img;
}

export const load = (img, oX, oY) => JSON.parse(localStorage.getItem(STORAGE_KEY));