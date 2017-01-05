export default {

    // TODO: poor code style
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
        if(fileName.length > 53){
            return fileName.substring(0, 50) + '...'
        }else{
            return fileName;
        }
    }
}

