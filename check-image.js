const fs = require('fs');

function getImageDimensions(path) {
  const buffer = fs.readFileSync(path);
  // Simple JPEG SOF0 header parser for dimensions
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xffc0 && marker <= 0xffc3) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += length + 2;
  }
  return null;
}

const dims = getImageDimensions('d:/Dev/Dev-Jiyo/jiyo-dev-portfolio/jiyoportfolio/public/Abarre.JPG');
console.log(dims);
