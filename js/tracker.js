function Tracker() {
    this.active = false;
    this.positionArray = [];
    this.storageName = 'mouse-tracker';
    this.currentIndex = 0;
    this.playbackInterval;
}

Tracker.fn = Tracker.prototype;

Tracker.fn.getState = function() {
    return this.active;
};

Tracker.fn.getPositions = function() {
    return this.positionArray;
};

Tracker.fn.setPositions = function(e) {
    var obj = {
        x: e.pageX,
        y: e.pageY
    };
    this.positionArray.push(obj);
};

Tracker.fn.startTracking = function(time) {
    var _this = this;
    this.active = true;

    window.onmousemove = function(e) {
        _this.setPositions.call(_this, e);
    };

    if(time) {
        setTimeout(function() {
            console.log('stopping tracking after '+time+' milliseconds');
            _this.stopTracking();
        }, time);
    }
};

Tracker.fn.stopTracking = function() {
    window.onmousemove = null;

    this.active = false;
    this.storePositions();
};

Tracker.fn.storePositions = function() {
    localStorage[this.storageName] = JSON.stringify(this.positionArray);
};

Tracker.fn.playback = function(play) {

    if(!this.mouse) {
        var body = document.getElementsByTagName('body')[0],
            mouse = document.createElement('div');

        mouse.id = 'mouse';
        body.appendChild(mouse);
        mouse.style.position = 'absolute';

        this.mouse = mouse;
    }

    this.mouse.style.top = 0;
    this.mouse.style.left = 0;

    this.currentIndex = 0;

    clearInterval(this.playbackInterval);

    if(play) this.play();

    return this;
};

Tracker.fn.setMousePosition = function() {
    var index = this.currentIndex - 1;
    this.mouse.style.left = this.positionArray[index].x + 'px';
    this.mouse.style.top = this.positionArray[index].y + 'px';

    return this;
};

Tracker.fn.stepForward = function() {
    this.currentIndex++;
    this.setMousePosition();

    return this;
};

Tracker.fn.stepBackward = function() {
    this.currentIndex--;
    this.setMousePosition();

    return this;
};

Tracker.fn.stepToPosition = function(index) {
    this.currentIndex = index;
    this.setMousePosition();

    return this;
};

Tracker.fn.play = function(index) {
    if(index) this.currentIndex = index;

    var _this = this;

    this.playbackInterval = setInterval(function() {
        if(_this.currentIndex === _this.positionArray.length) {
            _this.stop();
        } else {
            _this.stepForward();
        }
    }, 30);
};

Tracker.fn.pause = function() {
    clearInterval(this.playbackInterval);
};

Tracker.fn.stop = function() {
    this.pause();
    this.currentIndex = 0;
};

Tracker.fn.reset = function() {
    this.stop();
};





window.onload = function() {
    'use strict';

    // var tracker = new Tracker();
    // tracker.startTracking();
};