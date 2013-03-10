function Tracker() {
    this.active = false;
    this.positionArray = [];
}

Tracker.fn = Tracker.prototype;

Tracker.fn.getState = function() {
    return this.active;
}

Tracker.fn.getPositions = function() {
    return this.positionArray;
}

Tracker.fn.startTracking = function() {
    this.active = true;
}

Tracker.fn.stopTracking = function() {
    this.active = false;
}





window.onload = function() {
    'use strict';

    // var tracker = new Tracker();
    // tracker.track();
};