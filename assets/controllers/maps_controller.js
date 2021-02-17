import {Controller} from 'stimulus';
import {fabric} from 'fabric';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    canvas = null;
    x = 0;
    y = 0;

    roof = null;
    roofPoints = [];
    lines = [];
    lineCounter = 0;
    drawingObject = {"type": "", "background": "", "border": ""};

    Point(x, y) {
        this.x = x;
        this.y = y;
    }

    connect() {
        console.log(this.mapsField);

        let that = this;
        this.canvas = new fabric.Canvas(this.mapsField);

        // Set Background Image with Location Map :D
        // canvas.setBackgroundImage('../assets/pug.jpg', canvas.renderAll.bind(canvas));

        // Eigenschaften der Polyline im Read-Only-Modus:
        // "selectable":false, "hoverCursor":"default"

        this.canvas.loadFromJSON(
            '{"version":"4.3.1","objects":[{"type":"polyline","vdo_groups":[100,200],"selectable": false,"hoverCursor":"default","version":"4.3.1","originX":"left","originY":"top","left":193,"top":138.17,"width":594,"height":453,"fill":"rgba(12,145,13,26)","stroke":"#58c","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"points":[{"x":193,"y":138.171875},{"x":600,"y":591.171875},{"x":787,"y":303.171875},{"x":787,"y":303.171875},{"x":193,"y":138.171875}]}]}',
            this.canvas.renderAll.bind(this.canvas)
        );

        document.getElementById('serialize').addEventListener('click', function () {
            // To ensure custom properties will be saved give them to "toJSON"-Method
            // that.canvas.toJSON(["vdo_groups"])

            document.getElementById('content').textContent = JSON.stringify(that.canvas.toJSON(["vdo_groups"]));
        });

        document.addEventListener("keyup", function (e) {
            if (e.code !== "Delete") {
                return;
            }

            that.canvas.getActiveObjects().forEach((obj) => {
                that.canvas.remove(obj)
            });
            that.canvas.discardActiveObject().renderAll()
        });

        this.canvas.on('mouse:over', function (e) {
            if (e.target === null || e.target.type !== 'polyline') {
                return;
            }

            console.log(e.target.get('vdo_groups'));

            let $tooltip = document.getElementById('canvas-tooltip');

            $tooltip.innerHTML = e.target.get('vdo_groups').join(', ');
            $tooltip.style.visibility = 'visible'
            $tooltip.style.top = e.e.offsetY + 'px'
            $tooltip.style.left = e.e.offsetX + 'px'
        });

        this.canvas.on('mouse:out', function (e) {
            if (e.target === null || e.target.type !== 'polyline') {
                return;
            }

            console.log(e.target.get('vdo_groups'));

            let $tooltip = document.getElementById('canvas-tooltip');
            $tooltip.style.visibility = 'hidden'
        });


        document.getElementById('poly').addEventListener('click', function () {
            console.log(that.drawingObject);

            if (that.drawingObject.type === "roof") {
                that.drawingObject.type = "";
                that.lines.forEach(function (value, index, ar) {
                    that.canvas.remove(value);
                });
                that.roof = that.makeRoof(that.roofPoints);
                that.canvas.add(that.roof);
                that.canvas.renderAll();
            } else {
                that.drawingObject.type = "roof"; // roof type
            }
        });

        fabric.util.addListener(window, 'dblclick', function () {
            that.drawingObject.type = "";
            that.lines.forEach(function (value, index, ar) {
                that.canvas.remove(value);
            });

            //canvas.remove(lines[lineCounter - 1]);
            that.roof = that.makeRoof(that.roofPoints);
            that.canvas.add(that.roof);
            that.canvas.renderAll();

            console.log("double click");
            //clear arrays
            that.roofPoints = [];
            that.lines = [];
            that.lineCounter = 0;
        });

        this.canvas.on('mouse:down', function (options) {
            if (that.drawingObject.type === "roof") {
                that.canvas.selection = false;
                that.setStartingPoint(options); // set x,y
                that.roofPoints.push(new that.Point(that.x, that.y));
                var points = [that.x, that.y, that.x, that.y];
                that.lines.push(new fabric.Line(points, {
                    strokeWidth: 1,
                    selectable: false,
                    stroke: 'red'
                }));

                that.canvas.add(that.lines[that.lineCounter]);
                that.lineCounter++;
                that.canvas.on('mouse:up', function (options) {
                    that.canvas.selection = true;
                });
            }
        });

        this.canvas.on('mouse:move', function (options) {
            if (that.lines[0] !== null && that.lines[0] !== undefined && that.drawingObject.type === "roof") {
                that.setStartingPoint(options);
                that.lines[that.lineCounter - 1].set({
                    x2: that.x,
                    y2: that.y
                });
                that.canvas.renderAll();
            }
        });

    }

    setStartingPoint(options) {
        let offset = this.getOffset(document.getElementById(this.mapsField));
        this.x = options.e.pageX - offset.left;
        this.y = options.e.pageY - offset.top;
    }

    getOffset(element) {
        if (!element.getClientRects().length) {
            return {top: 0, left: 0};
        }

        let rect = element.getBoundingClientRect();
        let win = element.ownerDocument.defaultView;
        return (
            {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            });
    }

    makeRoof(roofPoints) {
        var left = this.findLeftPaddingForRoof(roofPoints);
        var top = this.findTopPaddingForRoof(roofPoints);
        roofPoints.push(new this.Point(this.roofPoints[0]?.x, this.roofPoints[0]?.y))
        var roof = new fabric.Polyline(roofPoints, {
            fill: 'red',
            opacity: 0.2,
            stroke: '#58c',
            hasControls: false
        });
        roof.set({

            left: left,
            top: top,

        });


        return roof;
    }

    findTopPaddingForRoof(roofPoints) {
        var result = 999999;
        for (var f = 0; f < this.lineCounter; f++) {
            if (roofPoints[f].y < result) {
                result = roofPoints[f].y;
            }
        }
        return Math.abs(result);
    }

    findLeftPaddingForRoof(roofPoints) {
        var result = 999999;
        for (var i = 0; i < this.lineCounter; i++) {
            if (roofPoints[i].x < result) {
                result = roofPoints[i].x;
            }
        }
        return Math.abs(result);
    }

    get mapsField() {
        return this.data.get('mapsField');
    }
}
