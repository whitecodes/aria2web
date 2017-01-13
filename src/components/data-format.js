// TODO: poor code style
export default {
    speedFormat: function(speed){
        var speedBps = speed * 1;
        if(speedBps > 1000) {
            var speedKbps = (speedBps / 1024).toFixed(2);
            if(speedKbps > 1000) {
                var speedMbps = (speedKbps / 1024).toFixed(2);
                return speedMbps + 'M';
            }else{
                return speedKbps + 'K';
            }
        }else{
            return speed + 'B';
        }
    },
    fileNameFormat: function(fileName){
        var re = new RegExp('[^/]+(?!.*/)');
        var fileNameList = re.exec(fileName);
        if(fileNameList) {
            return fileNameList[0]
        }
        return fileName;
    }
}

