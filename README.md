# Mosaic eraser server
Cross-platform lightweight server which erase mosaic on image for you guys. Co-work with chrome extension[mosaic eraser(auditing)]().

Would you like to see what the picture used to be? Have a try and see what you got!

**Unfortunately Base64-formatted image is not support yet！**
 
## Pre-request
- Linux, Max OS, Windows
- Python3.6+ 
- Pytorch 1.0+
- CPU or NVIDIA GPU + CUDA CuDNN
- Node.js 8.x+
- PM2

## Pre-trained model download
[links here](https://github.com/HypoX64/DeepMosaics#get-pre_trained-models-and-test-video)

## How to run 
### For development
```javascript
$ pm2 start ecosystem.config.js
```

### For production
```
$ pm2 start ecosystems.config.js --env production
```

### TODO
- **Base64-formatted support**
- **Mosaic erase Accuracy**

##### Strongly inspired by project[DeepMosaics](https://github.com/HypoX64/DeepMosaics), thanks to @HypoX64. 

