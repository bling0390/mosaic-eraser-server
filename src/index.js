const os = require('os');
const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const cors = require('@koa/cors');
const request = require('request');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
const { exec } = require('child_process');

const app = new Koa();

let router = new Router();

router.post('/eraseMosaic', async (ctx, next) => {
  await eraseImageMosaic(ctx);
});

app.use(cors());

app.use(koaBody());

app.use(router.routes());

app.use(serve('/Users/lingbin/work/frontend/mosaic_eraser_server/result/'));

const eraseImageMosaic = async ({ request, res }) => {
  // not support base64 yet
  const imagePath = request.body && request.body.url || '';
  const imageName = imagePath ? imagePath.substr(imagePath.lastIndexOf('/') + 1) : '';
  // check if file already exist
  if (imageName && await detectFileExist(imageName)) {
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    
    res.end(JSON.stringify({
      url: `http://localhost:3389/images/${imageName.replace(/\.(png|jpe?g)$/, '_clean.jpg')}`
    }));
    
    return false;
  }
  
  // download image from url
  const originImagePath = await downloadImage(imagePath, imageName);
  // erase mosaic
  await executeBashCommand(originImagePath);
  
  res.writeHead(200, {
    'content-type': 'application/json'
  });
  
  res.end(JSON.stringify({
    url: `http://localhost:3389/images/${imageName.replace(/\.(png|jpe?g)$/, '_clean.jpg')}`
  }));
};

const detectFileExist = filename => {
  return new Promise(resolve => {
    fs.access(path.join(os.tmpdir(), filename), err => {
      resolve(!err);
    });
  });
};

const downloadImage = (imagePath, imageName) => {
  return new Promise(resolve => {
    const targetPath = path.join(os.tmpdir(), imageName);
    request(imagePath).pipe(fs.createWriteStream(targetPath)).on('close', () => {
      resolve(targetPath);
    });
  });
};

const executeBashCommand = (path) => {
  return new Promise(resolve => {
    exec(`python3 ./deepMosaics/deepmosaic.py \
    --mode clean \
    --result_dir ./result/images \
    --mosaic_position_model_path ./deepMosaics/pretrained_models/mosaic_position.pth \
    --model_path ./deepMosaics/pretrained_models/clean_youknow_resnet_9blocks.pth \
    --media_path ${path}`, (error, stdout, stderr) => {
      resolve();
    });
  });
};

app.listen(3389);