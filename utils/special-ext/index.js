
const ext_ = [
    // 字体
    'eot','woff','ttf','svg',
    // 图片
    "Webp","BMP","PCX","TIF","GIF","JPG","JPEG","TGA","EXIF","FPX","SVG","PSD","CDR","PCD","DXF","UFO","EPS","AI","PNG","HDRI","RAW","WMF","FLIC","EMF","ICO",
    // 执行文件
    'exe',
    // 其他文件
    //'????'
].map(_ => _.toLowerCase());

exports.ext = ext_;
