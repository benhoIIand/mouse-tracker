function Tracker() {
    this.active = false;
    this.positionArray = [];
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

Tracker.fn.startTracking = function() {
    var _this = this;
    this.active = true;

    window.onmousemove = function(e) {
        _this.setPositions.call(_this, e);
    };
};

Tracker.fn.stopTracking = function() {
    this.active = false;
};





window.onload = function() {
    'use strict';

    var tracker = new Tracker();
    tracker.startTracking();
};