export default {

    // TODO poor code style
    speedFormat: function(speed){
        var speedBps = speed * 1;
        if(speedBps > 1000) {
            var speedKbps = (speedBps / 1024).toFixed(2);
            if(speedKbps > 1000) {
                var speedMbps = (speedKbps / 1024).toFixed(2);
                return speedMbps + 'Mbps';
            }else{
                return speedKbps + 'Kbps';
            }
        }else{
            return speed + 'Bps';
        }
    }
}
