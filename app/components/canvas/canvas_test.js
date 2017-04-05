'use strict';

describe('ticketbox.components.canvas', function() {
    describe('canvasImage', function() {
        var canvasImage;

        beforeEach(module('ticketbox.components.canvas', function($provide) {}));

        beforeEach(inject(function(_canvasImage_) {
            canvasImage = _canvasImage_;
        }));

        describe('canvasImage.createCanvasObject()', function() {
            it('should use oCanvas.create to create the canvas', function() {
                var canvasStub = {
                    display: {
                        image: function() { }
                    },
                    addChild: function() { }
                };
                var imageStub = { };
            
                // Mocking global oCanvas object:
                window.oCanvas = {
                    create: function() { }
                };
                
                var oCanvasCreateSpy = spyOn(window.oCanvas, 'create').and.returnValue(canvasStub);
                var canvasDisplayImageSpy = spyOn(canvasStub.display, 'image').and.returnValue(imageStub);
                var canvasAddChildSpy = spyOn(canvasStub, 'addChild');

                var src = 'src';
                var id = 'id';
                var canvas = canvasImage.createCanvasObject(src, id);
                expect(oCanvasCreateSpy).toHaveBeenCalledWith({ canvas: id });
                expect(canvasDisplayImageSpy).toHaveBeenCalled();
                expect(canvasAddChildSpy).toHaveBeenCalledWith(imageStub);
                expect(canvas).toEqual(canvasStub);
            });
        });

        describe('canvasImage.drawCoordinate()', function() {
            it('should draw a circle at the mouse coordinate', function() {
                var mouseX = 1;
                var mouseY = 2;
                var canvasStub = {
                    mouse: {
                        x: mouseX, y: mouseY
                    },
                    display: {
                        ellipse: function() { }
                    },
                    addChild: function() { }
                };
                var ellipseStub = { };

                var canvasDisplayEllipseSpy = spyOn(canvasStub.display, 'ellipse').and.returnValue(ellipseStub);
                var canvasAddChildSpy = spyOn(canvasStub, 'addChild');
                var circle = canvasImage.drawCoordinate(canvasStub);
                expect(canvasDisplayEllipseSpy).toHaveBeenCalledWith({x: mouseX, y: mouseY, radius: 3, fill: "#0aa"});
                expect(canvasAddChildSpy).toHaveBeenCalledWith(ellipseStub);
                expect(circle).toEqual(ellipseStub);
            });
        });

        describe('canvasImage.drawPolygon()', function() {
            it('should draw a polygon with the given coordinates', function() {
                var mouseX = 1;
                var mouseY = 2;
                var canvasStub = {
                    display: {
                        polygonFromPoints: function() { }
                    },
                    addChild: function() { }
                };
                var polygonStub = { };
                var coordinatesStub = { };
                var fillStub = { };
                var strokeStub = { };

                var canvasDisplayPolygonFromPointsSpy = spyOn(canvasStub.display, 'polygonFromPoints').and.returnValue(polygonStub);
                var canvasAddChildSpy = spyOn(canvasStub, 'addChild');
                var polygon = canvasImage.drawPolygon(canvasStub, coordinatesStub, fillStub, strokeStub);
                expect(canvasDisplayPolygonFromPointsSpy).toHaveBeenCalledWith({points: coordinatesStub, fill: fillStub, stroke: strokeStub, opacity: 0.7});
                expect(canvasAddChildSpy).toHaveBeenCalledWith(polygonStub, false);
                expect(polygon).toEqual(polygonStub);
            });
        });
    });
});