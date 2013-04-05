describe('Mouse Tracker', function() {
    'use strict';

    describe('is initialized', function() {
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

        it('and should be active', function() {
            var active = this.tracker.getState();
            expect(active).toEqual(true);
        });

        it('and should be tracking', function() {
            this.tracker.setPositions({pageX: 2, pageY: 3});
            expect(this.tracker.positionArray).toEqual([{x: 2, y: 3}]);
        });
    });

    describe('is stopped', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
            this.tracker.startTracking();
            this.tracker.setPositions({pageX: 23, pageY: 11});
            this.tracker.stopTracking();
        });

        afterEach(function() {
            localStorage.clear();
        });

        it('and should not be active', function() {
            var active = this.tracker.getState();
            expect(active).toEqual(false);
        });

        it('and should have stored the positions locally', function() {
            var storedArray = JSON.parse(localStorage[this.tracker.storageName]);
            expect(storedArray[0].x).toEqual(23);
            expect(storedArray[0].y).toEqual(11);
        });
    });

    describe('is played back', function() {
        beforeEach(function() {
            this.tracker = new Tracker();
            this.tracker.startTracking();

            var mockData = [[23,45],[250,320],[223,455],[283,405],[823,425],[113,345],[529,654]];

            for(var i=0, len=mockData.length; i<len; i++) {
                this.tracker.setPositions({pageX: mockData[i][0], pageY: mockData[i][1]});
            }

            this.tracker.stopTracking();
            this.tracker.playback();
        });

        afterEach(function() {
            document.getElementById('mouse').remove();
            localStorage.clear();
        });

        it('and a mouse is placed on the screen', function() {
            var mouse = document.getElementById('mouse');
            expect(mouse.id).toEqual('mouse');
        });

        it('and is at position (0,0)', function() {
            var mouse = document.getElementById('mouse');
            expect(mouse.offsetTop).toEqual(0);
            expect(mouse.offsetLeft).toEqual(0);
        });

        it('and the mouse is at the first position', function() {
            var mouse = document.getElementById('mouse');

            this.tracker.stepForward();

            expect(mouse.offsetTop).toEqual(45);
            expect(mouse.offsetLeft).toEqual(23);
        });

        it('and the mouse is at the second position', function() {
            var mouse = document.getElementById('mouse');

            this.tracker.stepForward();
            this.tracker.stepForward();

            expect(mouse.offsetTop).toEqual(320);
            expect(mouse.offsetLeft).toEqual(250);
        });

        it('and the mouse can step backwards a position', function() {
            var mouse = document.getElementById('mouse');

            this.tracker.stepForward();
            this.tracker.stepForward();
            this.tracker.stepForward();
            this.tracker.stepBackward();

            expect(mouse.offsetLeft).toEqual(250);
            expect(mouse.offsetTop).toEqual(320);
        });

        it('and the mouse is at the 5th position', function() {
            var mouse = document.getElementById('mouse');

            this.tracker.stepToPosition(5);

            expect(mouse.offsetLeft).toEqual(823);
            expect(mouse.offsetTop).toEqual(425);
        });
    });

});