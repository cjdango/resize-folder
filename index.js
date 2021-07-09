const fs = require('fs');
const sharp = require('sharp');
const chokidar = require('chokidar');

const createResizedVersion = path => {
    const imageType = ['jpeg', 'jpg'].includes(path.split('.')[-1]) ? 'jpeg' : 'png';
    const readable = fs.createReadStream(path);
    const writable = fs.createWriteStream('resized/' + path);
    const resizer = sharp()
        .resize(200)[imageType]({
            quality: 75,
        });

    readable
        .pipe(resizer)
        .pipe(writable)
};

chokidar
    .watch(['*.jpg', '*.jpeg', '*.png'])
    .on('add', createResizedVersion);

