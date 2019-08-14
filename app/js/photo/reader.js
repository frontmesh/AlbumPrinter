import { task } from 'folktale/concurrency/task';

import { drawImage } from './canvas';
import { on } from '../utils/handler';
import log  from '../utils/log';

export const loadReader = (reader, file) => task(resolver => {
  const readerOnLoad = on('load', reader);
  readerOnLoad(e => {
    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      drawImage(img, 0, 0, 1);
      log('Loaded Image w/dimensions ' + img.naturalWidth + ' x ' + img.naturalHeight);
    };

    resolver.resolve(img);
  });
  reader.readAsDataURL(file);
});
