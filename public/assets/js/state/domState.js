import * as AC from "../config/appConfig.js";
import * as DRAWING from "../canvas/canvasDrawing.js";

class domState{
    constructor(){
        this.body = document.body;

        const canvas = this.initCanvas();

        this.pureCanvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.canvas = new window.handwriting.Canvas(canvas, AC.USERSTROKEWIDTH);
        this.backgroundCanvas = this.getElementById("backgroundCanvas");
        this.backgroundCanvasContext = this.backgroundCanvas.getContext("2d");
        this.buttons = {
            resetButton: this.getElementById("resetButton"),
            growButton: this.getElementById("growButton"),
            resetGrow: this.getElementById("resetGrow"),
            stopGrow: this.getElementById("stopGrow"),
            editMode: this.getElementById("editModeButton"),
            startPoint: this.getElementById("startPointButton"),
            joinPoint: this.getElementById("joinPointButton"),
            download: this.getElementById("downloadButton"),
            loadPreset: this.getElementById("loadPreset"),
            infoBoxHideButton: this.getElementById("infoBoxHideButton")
        };
        this.editModeButtonsContainer = this.getElementById("editModeButtonsContainer");

        this.canvasAgeSection = this.getElementById("canvasAgeContainer");
        this.canvasScrollContainer = this.getElementById('canvasScrollContainer');
            
        this.infoSection = this.getElementById("infoSection");
        this.infoBoxContainer = this.getElementById("infoBoxContainer");


        this.popup = this.getElementById("popup");
        this.popupContent = this.getElementById("popupContent");

        this.presetSelector = this.getElementById("presetSelector");

        this.advancedSettingsToggle = this.getElementById('advancedSettingsToggle');
        this.advancedSettingsContainer = this.getElementById('advancedSettingsContainer');
        this.settingsArrow = this.getElementById('settingsArrow');

        this.impressum = this.getElementById("impressum");
    }

    initCanvas(){
        const canvas = this.getElementById("canvas");
        //Set canvas drawing color and width
        canvas.getContext("2d").strokeStyle = AC.USERSTROKECOLOR;
        canvas.getContext("2d").lineWidth = AC.USERSTROKEWIDTH;
        canvas.getContext("2d").globalAlpha = 1;
        canvas.getContext("2d").globalCompositeOperation = "source-over";

        return canvas;
    }

    resetBackgroundCanvas = () => {
        DRAWING.clearCanvas(this.backgroundCanvas.getContext("2d"), AC.SECONDARYCOLOR);
    }
    
    resetForegroundCanvas = () => {
        this.canvas.erase();
        DRAWING.clearCanvas(this.pureCanvas.getContext("2d"), AC.PRIMARYCOLOR);
    }

    /**
     * Updates the styling of the edit mode buttons based on the current state of edit mode, start point mode, and join point mode. 
     */
    updateStyleModeButtons(editModeState, startPointMode, joinPointMode){
        this.editModeButtonsContainer.classList.toggle("editModeActive", editModeState);
        this.editModeButtonsContainer.classList.toggle("startMode", startPointMode);
        this.editModeButtonsContainer.classList.toggle("joinMode", joinPointMode);
    }

    updatePlayButton(play){
        this.buttons.stopGrow.value = !play ? "\u25B6" : "\u23F8";
    }

    getElementById(id){
        return document.getElementById(id);
    }

    createElement(type, classList = [], id = null, attributes = {}){
        const element = document.createElement(type);
        classList.forEach(cls => element.classList.add(cls));
        if(id) element.id = id;
        // Set additional attributes like width, height for canvas elements
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }

    getCanvasContainerDimensions(){
        const container = this.canvasScrollContainer;
        return {
            width: container.clientWidth,
            height: container.clientHeight
        };
    }
}

export default new domState();