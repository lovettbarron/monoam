/* global $, _ */

function NoamBassControl() {
    this.threshold = 5; //Threshold difference between accelerometer values for a valid shake
    this.accelX = null;
    this.accelY = null;
    this.accelZ = null;
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', this.handleAccelerometerChange.bind(this));
    } else {
        console.log("WARNING: devicemotion not supported");
    }
}

NoamBassControl.prototype.handleAccelerometerChange = function(event) {
    var x = event.accelerationIncludingGravity.x,
        y = event.accelerationIncludingGravity.y,
        z = event.accelerationIncludingGravity.z;
    if(this.isValidShake(x,y,z)) {
        this.sendShake();
    }
    this.accelX = x;
    this.accelY = y;
    this.accelZ = z;
};

NoamBassControl.prototype.isValidShake = function(accelX, accelY, accelZ) {
    return (this.accelX && this.accelY && this.accelZ) &&
        (this.accelX - accelX > this.threshold || this.accelY - accelY > this.threshold || this.accelZ - accelZ > this.threshold);
};

NoamBassControl.prototype.sendShake = function() {
    $.post('/note', { note: 0 }, function() {
        console.log("Post successful");
    });
    $('.background').animate({opacity: 1}, 500, function() {
        $(this).animate({opacity: 0},200);
    })
    console.log("sendShake");
};

$(function() {
    $('.background').height($(window).height())
    var bassControl = new NoamBassControl();
});
