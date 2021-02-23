import {Controller} from 'stimulus';
import {fabric} from 'fabric';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    // @var Canvas|null
    canvas = null;
    preservedProperties = ['sector_name', 'area_vdo'];

    x = 0;
    y = 0;

    color = "red";
    opacity = 0.2;

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
        this.canvas = new fabric.Canvas(this.mapsField);

        this.fillCanvasFromDefaultField();

        // Handle Form Elements to edit the canvas
        this.handleDraw();
        this.handleSectorName();
        this.handleColorPicker();
        this.handleOpacityPicker();
        this.handleAutoUpdateOfTargetInput();
        this.handleBgImagePicker();
        this.handleSerializerButtonForDebug();

        let that = this;
        document.getElementsByName('map')[0].addEventListener('submit', (e) => {
            document.getElementById('map_map_image').value = that.canvas.toDataURL("image/png");
        });


        this.canvas.on('mouse:over', function (e) {
            if (e.target === null || e.target.type !== 'polyline') {
                return;
            }

            if (e.target.get('vdo_groups') === undefined) {
                return;
            }
            /*
                        console.log(e.target.get('vdo_groups'));

                        let $tooltip = document.getElementById('canvas-tooltip');

                        $tooltip.innerHTML = e.target.get('vdo_groups').join(', ');
                        $tooltip.style.visibility = 'visible'
                        $tooltip.style.top = e.e.offsetY + 'px'
                        $tooltip.style.left = e.e.offsetX + 'px' */
        });

        this.canvas.on('mouse:out', function (e) {
            if (e.target === null || e.target.type !== 'polyline') {
                return;
            }

            //console.log(e.target.get('vdo_groups'));

            //let $tooltip = document.getElementById('canvas-tooltip');
            //$tooltip.style.visibility = 'hidden'
        });
    }

    handleReadOnlyForExistingElement() {
        this.canvas.getObjects().forEach((obj) => {
            obj.selectable = false;
            obj.hoverCursor = "default";
        });
        this.canvas.renderAll();
    }

    handleDraw() {
        let that = this,
            drawButton = document.getElementById(this.drawButton);

        if (drawButton === null) {
            // Without the draw button we will set all to read only
            this.handleReadOnlyForExistingElement();
            return;
        }

        drawButton.addEventListener('click', function (e) {
            e.preventDefault();

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
            if (that.drawingObject.type === '') {
                return;
            }

            that.drawingObject.type = "";
            that.lines.forEach(function (value, index, ar) {
                that.canvas.remove(value);
            });

            that.roof = that.makeRoof(that.roofPoints);
            that.canvas.add(that.roof);
            that.canvas.renderAll();

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
                    stroke: that.color
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

        document.addEventListener("keyup", function (e) {
            if (e.code !== "Delete") {
                return;
            }

            that.canvas.getActiveObjects().forEach((obj) => {
                that.canvas.remove(obj)
            });
            that.canvas.discardActiveObject().renderAll()
        });
    }

    handleBgImagePicker() {
        let canvas = this.canvas,
            bgImagePicker = document.getElementById(this.bgImagePicker);

        if (bgImagePicker === null) {
            return;
        }

        bgImagePicker.addEventListener('change', function (e) {
            canvas.setBackgroundColor('', canvas.renderAll.bind(canvas));
            canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;
                fabric.Image.fromURL(data, function (img) {
                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                        scaleX: canvas.width / img.width,
                        scaleY: canvas.height / img.height
                    });
                });
            };
            reader.readAsDataURL(file);
        });
    }

    handleAutoUpdateOfTargetInput() {
        let canvas = this.canvas,
            formInput = document.getElementById(this.formInput),
            preserveCanvasFields = this.preservedProperties;

        if (formInput === null) {
            return;
        }

        canvas.on('after:render', function () {
            formInput.value = JSON.stringify(canvas.toJSON(preserveCanvasFields));
        });

    }

    handleSectorName() {
        let that = this,
            sectorNameElement = document.getElementById(this.sectorNameInput),
            handleSectorName = (e) => {
                let selectedElements = e.selected;

                if (selectedElements === undefined) {
                    sectorNameElement.value = '';
                    return;
                }

                sectorNameElement.value = selectedElements[selectedElements.length - 1].get('sector_name') ?? '';
            };

        if (sectorNameElement === null) {
            return;
        }

        sectorNameElement.addEventListener('input', function () {
            let canvas = that.canvas,
                activeObject = canvas.getActiveObject();

            if (activeObject === undefined) {
                return;
            }

            canvas.getActiveObject().set('sector_name', this.value);
        });

        this.canvas.on('selection:updated', handleSectorName);
        this.canvas.on('selection:created', handleSectorName);
        this.canvas.on('selection:cleared', handleSectorName);
    }

    handleColorPicker() {
        let that = this,
            colorPickerElement = document.getElementById(this.colorPickerInput),
            handleColorPicker = (e) => {
                let selectedElements = e.selected,
                    selectedColor = selectedElements[selectedElements.length - 1].fill;

                colorPickerElement.value = selectedColor;
                that.color = selectedColor;
            };

        if (colorPickerElement === null) {
            return;
        }

        this.color = colorPickerElement.value ?? this.color;

        colorPickerElement.addEventListener('input', function () {
            that.color = this.value;
            that.setActiveElementsColor(this.value);
        });

        this.canvas.on('selection:updated', handleColorPicker);
        this.canvas.on('selection:created', handleColorPicker);
    }

    handleOpacityPicker() {
        let that = this,
            opacityPickerElement = document.getElementById(this.opacityPickerInput),
            handleOpacityPicker = (e) => {
                let selectedElements = e.selected,
                    selectedOpacity = selectedElements[selectedElements.length - 1].opacity;

                opacityPickerElement.value = selectedOpacity;
                that.opacity = selectedOpacity;
            };

        if (opacityPickerElement === null) {
            return;
        }

        this.opacity = opacityPickerElement.value ?? this.opacity;

        document.getElementById('opacity').addEventListener('input', (e) => {
            that.setActiveElementsOpacity(e.target.value);
        });

        this.canvas.on('selection:updated', handleOpacityPicker);
        this.canvas.on('selection:created', handleOpacityPicker);
    }

    handleSerializerButtonForDebug() {
        let debugOutputField = document.getElementById(this.debugOutputField),
            debugOutputButton = document.getElementById(this.debugOutputButton),
            canvas = this.canvas,
            preserveCanvasFields = this.preservedProperties;

        if (debugOutputField === null || debugOutputButton === null) {
            return;
        }

        debugOutputButton.addEventListener('click', function (e) {
            e.preventDefault();
            debugOutputField.textContent = JSON.stringify(canvas.toJSON(preserveCanvasFields));
        });
    }

    setActiveElementsColor(color) {
        let canvas = this.canvas;

        canvas.getActiveObjects().forEach((obj) => {
            obj.set('fill', color);
            obj.set('stroke', color);
        })

        canvas.renderAll.bind(canvas);
        canvas.renderAll();
    }

    setActiveElementsOpacity(opacity) {
        let canvas = this.canvas;

        canvas.getActiveObjects().forEach((obj) => {
            obj.set('opacity', opacity);
        })

        canvas.renderAll.bind(canvas);
        canvas.renderAll();
    }

    fillCanvasFromDefaultField() {
        let defaultContent = document.getElementById(this.formInput).value,
            canvas = this.canvas;

        canvas.loadFromJSON(defaultContent, canvas.renderAll.bind(canvas));
        canvas.getObjects().forEach((obj) => {
            obj.hasControls = false;
        })

        canvas.renderAll.bind(canvas);
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
            fill: this.color,
            opacity: this.opacity,
            stroke: this.color,
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

    get formInput() {
        return this.data.get('formInput');
    }

    get sectorNameInput() {
        return this.data.get('sectorNameInput');
    }

    get colorPickerInput() {
        return this.data.get('colorPickerInput');
    }

    get opacityPickerInput() {
        return this.data.get('opacityPickerInput');
    }

    get bgImagePicker() {
        return this.data.get('bgImagePicker');
    }

    get debugOutputField() {
        return this.data.get('debugOutputField');
    }

    get debugOutputButton() {
        return this.data.get('debugOutputButton');
    }

    get drawButton() {
        return this.data.get('drawButton');
    }
}
