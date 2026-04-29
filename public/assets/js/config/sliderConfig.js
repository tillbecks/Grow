//Base Variable Class
class TreeVariable {
    constructor(label, defaultValue, description = null) {
        this.label = label;
        this.defaultValue = defaultValue;
        this.description = description;
    }
}

export class NumericVariable extends TreeVariable {
    constructor(label, min, max, defaultValue, step, description = null, func = x => x, inverseFunc = x => x) {
        super(label, defaultValue, description);
        this.min = min;
        this.max = max;
        this.step = step;
        this.func = func;
        this.inverseFunc = inverseFunc;
    }
}

export class BooleanVariable extends TreeVariable {
    constructor(label, defaultValue, description = null) {
        super(label, defaultValue, description);
    }
}

/**
 * Helper function to create a variable object for slider configuration
 * @param {string} label
 * @param {number} min 
 * @param {number} max 
 * @param {number} defaultValue 
 * @param {number} step 
 * @param {string} description 
 * @param {function} func - Function to transform the slider value before applying it to the tree (e.g. converting degrees to radians)
 * @param {function} inverseFunc - Function to transform the tree variable value back to slider value for display (e.g. converting radians back to degrees)
 * @returns {NumericVariable}
 */
function createNumericVariableObject(label, min, max, defaultValue, step, description = null, func = x => x, inverseFunc = x => x){
    return new NumericVariable(label, min, max, defaultValue, step, description, func, inverseFunc);
}

/**
 * Helper function to create a variable object for checkbox configuration
 * @param {string} label 
 * @param {boolean} defaultValue 
 * @param {string} description 
 * @returns {BooleanVariable}
 */
function createBooleanVariableObject(label, defaultValue, description = null){
    return new BooleanVariable(label, defaultValue, description);
}

export const TREECONFIGVARIABLES = {
    // Basic Settings
    initThickness: createNumericVariableObject("Initial Thickness", 1, 10, 1, 1, "initThickness"),
    growRate: createNumericVariableObject("Thickness Grow Rate", 0, 1, 0.05, 0.01, "growthRate"),
    maxThickness: createNumericVariableObject("Maximum Thickness", 1, 30, 5, 1, "maxThickness"),
    maxAge: createNumericVariableObject("Maximum Age", 1, 1000, 150, 1, "maxAge"),

    // Sprouting Settings
    minSproutingAge: createNumericVariableObject("Minimum Sprouting Age", 0, 1000, 25, 1, "minSproutingAge"),
    endsAsTips: createBooleanVariableObject("Struct Ends As Tips", false, "structEndsTips"),
    sproutingGrowProb: createNumericVariableObject("Tip Sprouting Probability", 0, 1, 0.2, 0.01, "sproutingGrowProb"),
    mainSproutingRate: createNumericVariableObject("Main Sprouting Probability", 0, 0.05, 0.002, 0.0001, "mainSproutingRate"),
    secondarySproutingRate: createNumericVariableObject("Secondary Sprouting Probability", 0, 0.05, 0.002, 0.0001, "secondarySproutingRate"),
    sproutingLength: createNumericVariableObject("Sprout Length", 1, 20, 5, 1, "sproutingLength"),
    breakingOffProb: createNumericVariableObject("Breaking Off Probability", 0, 0.01, 0.001, 0.0001, "breakingOffProb"),

    // Sprouting Direction Settings
    standardSproutAngle: createNumericVariableObject("Standard Lateral Sprouting Angle", 0, 180, 90, 1, "standardSproutAngle", x => x * Math.PI / 180, x => x * 180 / Math.PI),
    maxRandomRotationTip: createNumericVariableObject("Maximum Random Angle Offset", 0, 90, 18, 1, "maxRandomRotationTip", x => x * Math.PI / 180, x => x * 180 / Math.PI),
    awayFromCOMInfluence: createNumericVariableObject("Away From COM Influence", 0, 2, 0.5, 0.01, "awayFromCOMInfluence"),
    influenceVectorInfluence: createNumericVariableObject("Ancestor Direction Influence", 0, 2, 0, 0.01, "influenceVector"),

    // Environment Settings
    crowdingMinDist: createNumericVariableObject("Crowding Minimum Distance", 0, 200, 30, 1, "crowdingMinDist"),
    crowdingFactor: createNumericVariableObject("Crowding Factor", 0, 1, 0.9, 0.01, "crowdingFactor"),
};

//Not used right now
const lateralSliderSync = {label: "Synchronize Lateral Sprouting Probabilities", main: "mainSproutingRate", secondary: "secondarySproutingRate", description: null };

export const SLIDERSECTIONS = {
    basicSettings: {
        title: "Basic Settings",
        variables: ["initThickness", "growRate", "maxThickness", "maxAge"],
        synchronizer : []
    },
    sproutingSettings: {
        title: "Sprouting Settings",
        variables: ["minSproutingAge", "endsAsTips", "sproutingGrowProb", "mainSproutingRate", "secondarySproutingRate", "sproutingLength", "breakingOffProb"],
        synchronizer : []
    },
    sproutingDirectionSettings: {
        title: "Sprouting Direction Settings",
        variables: ["standardSproutAngle", "maxRandomRotationTip", "awayFromCOMInfluence", "influenceVectorInfluence"],
        synchronizer : []
    },
    environmentSettings: {
        title: "Environment Settings",
        variables: ["crowdingMinDist", "crowdingFactor"],
        synchronizer : []
    }
}