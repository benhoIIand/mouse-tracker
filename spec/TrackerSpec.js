describe('Mouse Tracker', function() {
    'use strict';

    describe('is initialized and', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
        });

        it('and should not be active', function() {
            var active = this.tracker.getState();
            expect(active).toEqual(false);
        });

        it('and should have an empty array of positions', function() {
            var positions = this.tracker.getPositions();
            expect(positions).toEqual([]);
        });
    });

    describe('is started', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
            this.tracker.startTracking();
        });

        it('and should not be active', function() {
            var active = this.tracker.getState();
            expect(active).toEqual(true);
        });

        it('and should be tracking', function() {
            this.tracker.setPositions({pageX: 2, pageY: 3});

            expect(this.tracker.positionArray).toEqual([{x: , y: 3}]);
        });
    });

    describe('is stopped', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
        });

        it('and should not be active', function() {
            this.tracker.stopTracking();
            var active = this.tracker.getState();
            expect(active).toEqual(false);
        });
    });

});