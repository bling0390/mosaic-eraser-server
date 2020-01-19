import torch
from .pix2pix_model import define_G
from .pix2pixHD_model import define_G as define_G_HD
from .unet_model import UNet

def pix2pix(opt):
    # print(opt.model_path,opt.netG)
    if opt.netG == 'HD':
        netG = define_G_HD(3, 3, 64, 'global' ,4)
    elif opt.netG == 'video':
        netG = define_G(3*25+1, 3, 128, 'unet_128', norm='instance',use_dropout=True, init_type='normal', gpu_ids=[])
    else:
        netG = define_G(3, 3, 64, opt.netG, norm='batch',use_dropout=True, init_type='normal', gpu_ids=[])

    netG.load_state_dict(torch.load(opt.model_path))
    netG.eval()
    if opt.use_gpu:
        netG.cuda()
    return netG

def unet_clean(opt):
    net = UNet(n_channels = 3, n_classes = 1)
    net.load_state_dict(torch.load(opt.mosaic_position_model_path))
    net.eval()
    if opt.use_gpu:
        net.cuda()
    return net

def unet(opt):
    net = UNet(n_channels = 3, n_classes = 1)
    net.load_state_dict(torch.load(opt.model_path))
    net.eval()
    if opt.use_gpu:
        net.cuda()
    return net
