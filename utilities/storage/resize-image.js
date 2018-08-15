/* globals document */
import Pica from 'pica';

export default async function resizeImage(src, el, targetDimensions) {
  const pica = Pica();
  const from = document.createElement('canvas');
  const fromContext = from.getContext('2d');
  const to = document.createElement('canvas');

  const fromImage = new Image();
  fromImage.src = src;

  const stats = await getImageStats(fromImage);
  const newDimensions = getNewDimensions(stats, targetDimensions);

  from.width = stats.width;
  from.height = stats.height;
  to.height = newDimensions.height;
  to.width = newDimensions.width;

  fromContext.drawImage(fromImage, 0, 0);

  const result = await pica.resize(from, to);
  const blob = await pica.toBlob(result, stats.mimeType);
  const dataUrl = await blobToDataURL(blob);

  return { blob, dimensions: newDimensions, src: dataUrl };
}

async function getImageStats(image) {
  return new Promise(resolve => {
    image.onload = function() {
      const { naturalHeight: height, naturalWidth: width, src } = this;
      const mimeType = src.replace('data:', '').replace(/;.*/, '');
      const stats = { height, width, mimeType };

      resolve(stats);
    };
  });
}

function getNewDimensions(dimensions, targetDimensions) {
  const ratio = dimensions.width / dimensions.height;
  let result = {};

  if (dimensions.width <= targetDimensions.width && dimensions.height <= targetDimensions.height) {
    result = dimensions;
  } else if (ratio > 1) {
    result.height = targetDimensions.width / ratio;
    result.width = targetDimensions.width;
  } else if (ratio < 1) {
    result.height = targetDimensions.height;
    result.width = ratio * targetDimensions.width;
  } else {
    const minDimension = Math.min(targetDimensions.height, targetDimensions.width);
    result.height = minDimension;
    result.width = minDimension;
  }

  return {
    height: Math.floor(result.height),
    width: Math.floor(result.width),
  };
}

async function blobToDataURL(blob) {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.addEventListener('loadend', e => resolve(e.srcElement.result));
    reader.readAsDataURL(blob);
  });
}
