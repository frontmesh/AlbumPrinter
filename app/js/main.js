import { of, rejected } from 'folktale/concurrency/task';
import Maybe from 'folktale/maybe';
import Result from 'folktale/result';
import { on } from './utils/handler';

import {
  fileSelectorChange,
  imageContainer,
  debugContainer,
  generateButtonClick,
  scaleDownClick,
  scaleUpClick,
  moveDownClick,
  moveUpClick,
  moveRightClick,
  moveLeftClick,
} from './selectors/';

import log from './utils/log';

import { setupCanvas, drawImage } from './photo/canvas';
import { loadReader } from './photo/reader';
import { getDescription } from './photo/description';
import { save } from './photo/storage';

const main = () => {
  let loadedImage; // pseudo state
  let ox = 0;
  let oy = 0;
  let scale = 1;

  log('Running main');

  setupCanvas();

  fileSelectorChange(e =>
    of(e.target.files)
      .map(Array.from)
      .map(files => files[0]) // .head
      .chain(file => {
          switch (file.type) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
              return loadReader(
                new FileReader(),
                file
              );
            default:
              return rejected(file);
          }
        }
      )
      .run()
      .listen({
        onResolved: (file) => { loadedImage = file }, // async/await
        onRejected: (file) => log('not a valid Image file :' + file.name)
      })
  );

  generateButtonClick(
    () =>
      Maybe.fromNullable(loadedImage)
        .map(
          img => {
            log(getDescription(img, ox, oy))
            return img
          }
        )
        .map(
          img => Result.try(save(img))
        )
  );

  scaleUpClick(() => {
    scale += 0.5;
    Maybe.fromNullable(loadedImage).map(img => drawImage(img, ox, oy, scale))
  });
  scaleDownClick(() => {
    scale = scale <= 1 ? 1  : scale - 0.5;
    Maybe.fromNullable(loadedImage).map(img => drawImage(img, ox, oy, scale))
  });

  moveDownClick(()=>{
    ox = 0;
    oy +=50;
    Maybe.fromNullable(loadedImage).map(img => drawImage(img, ox, oy, scale))
  });
  moveUpClick(()=> {
    ox = 0;
    oy -=50;
    Maybe.fromNullable(loadedImage).map(img => drawImage(img, ox, oy, scale))
  });
  moveRightClick(() => {
    ox +=50;
    oy = 0;
    Maybe.fromNullable(loadedImage).map(img => drawImage(img, ox, oy, scale))
  });
  moveLeftClick(() => {
    ox -=50;
    oy = 0;
    Maybe.fromNullable(loadedImage).map(img => drawImage(img, ox, oy, scale))
  });
};

main();
