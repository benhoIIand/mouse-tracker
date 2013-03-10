describe('Mouse Tracker', function() {
    'use strict';

    describe('is initialized and', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
        });

        it('should not be active', function() {
            var active = this.tracker.getState();
            expect(active).toEqual(false);
        });

        it('should have an empty array of positions', function() {
            var positions = this.tracker.getPositions();
            expect(positions).toEqual([]);
        });
    });

    describe('is started', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
        });

        it('should not be active', function() {
            this.tracker.startTracking();
            var active = this.tracker.getState();
            expect(active).toEqual(true);
        });
    });

    describe('is stopped', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
        });

        it('should not be active', function() {
            this.tracker.stopTracking();
            var active = this.tracker.getState();
            expect(active).toEqual(false);
        });
    });

});