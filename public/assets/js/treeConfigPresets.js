const defaultConfig = {
    name: "Default Config",

    initThickness: 1,
    growRate: 0.05,
    maxThickness: 5,
    maxAge: 150,

    mainSproutingRate: 0.002,
    secondarySproutingRate: 0.002,
    sproutingLength: 5,
    sproutingGrowProb: 0.2,

    influenceVectorInfluence: 0,
    maxRandomRotationTip: 0.1 * Math.PI,
    standardSproutAngle: 0.5 * Math.PI,

    breakingOffProb: 0.0010,

    awayFromCOMInfluence: 0.5,

    crowdingMinDist: 30,
    crowdingFactor: 0.90,

    minSproutingAge: 25,
};

const similarDefaultConfig = {
    name: "Similar to Default",

    initThickness: 5,
    growRate: 0.05,
    maxThickness: 5,
    maxAge: 150,

    mainSproutingRate: 0.002,
    secondarySproutingRate: 0.002,
    sproutingLength: 5,
    sproutingGrowProb: 0.2,

    influenceVectorInfluence: 0,
    maxRandomRotationTip: 0.1 * Math.PI,
    standardSproutAngle: 0.5 * Math.PI,

    breakingOffProb: 0.0010,

    awayFromCOMInfluence: 0.5,

    crowdingMinDist: 30,
    crowdingFactor: 0.90,

    minSproutingAge: 25,
};

const similarDefaultConfig2 = {
    name: "Similar to Default 2",

    initThickness: 6,
    growRate: 0.05,
    maxThickness: 5,
    maxAge: 150,

    mainSproutingRate: 0.002,
    secondarySproutingRate: 0.002,
    sproutingLength: 5,
    sproutingGrowProb: 0.2,

    influenceVectorInfluence: 0,
    maxRandomRotationTip: 0.1 * Math.PI,
    standardSproutAngle: 0.5 * Math.PI,

    breakingOffProb: 0.0010,

    awayFromCOMInfluence: 0.5,

    crowdingMinDist: 30,
    crowdingFactor: 0.90,

    minSproutingAge: 25,
};

export const treeConfigs = [defaultConfig, similarDefaultConfig, similarDefaultConfig2];
export const defaultTreeConfigIndex = 0;