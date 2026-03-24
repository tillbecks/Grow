import { TREE_CONFIG } from "./tree.js";

function bindSliderToConfig(sliderId, valueId, configKey, conversionFunc = x=>x){
    document.getElementById(sliderId).addEventListener("input", (event)=>{
        document.getElementById(valueId).textContent = event.target.value;
        TREE_CONFIG[configKey] = conversionFunc(parseFloat(event.target.value));
    });
}

function bindButtonToSlider(buttonId, sliderId, increment=1){
    const button = document.getElementById(buttonId);
    let intervalId = null;

    function countDecimals(num) {
        const numStr = num.toString();
        if (numStr.includes('.')) {
            return numStr.split('.')[1].length;
        }
        return 0;
    }

    function step() {
        const slider = document.getElementById(sliderId);
        const step = parseFloat(slider.step);
        let newValue = parseFloat(slider.value) + step * increment;
        newValue = newValue.toFixed(countDecimals(step));

        slider.value = newValue;
        slider.dispatchEvent(new Event('input'));
    }

    function startHold() {
        step(); // Sofortiger erster Schritt
        intervalId = setInterval(step, 80);
    }

    function stopHold() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    button.addEventListener('mousedown', startHold);
    button.addEventListener('mouseup', stopHold);
    button.addEventListener('mouseleave', stopHold);

    // Touch-Support
    button.addEventListener('touchstart', (e) => { e.preventDefault(); startHold(); });
    button.addEventListener('touchend', stopHold);
    button.addEventListener('touchcancel', stopHold);
}

bindSliderToConfig('initThicknessSlider', 'initThicknessValue', 'initThickness');
bindSliderToConfig('growthRateSlider', 'growthRateValue', 'growRate');
bindSliderToConfig('maxThicknessSlider', 'maxThicknessValue', 'maxThickness');
bindSliderToConfig('maxAgeSlider', 'maxAgeValue', 'maxAge');
bindSliderToConfig('sproutingRateSlider', 'sproutingRateValue', 'sproutingRate');
bindSliderToConfig('sproutingLengthSlider', 'sproutingLengthValue', 'sproutingLength');
bindSliderToConfig('sproutingGrowProbSlider', 'sproutingGrowProbValue', 'sproutingGrowProb');
bindSliderToConfig('influenceVectorSlider', 'influenceVectorValue', 'influenceVectorInfluence');
bindSliderToConfig('maxRandomRotationTipSlider', 'maxRandomRotationTipValue', 'maxRandomRotationTip', x=>x*Math.PI/180);
bindSliderToConfig('breakingOffProbSlider', 'breakingOffProbValue', 'breakingOffProb');
bindSliderToConfig('awayFromCOMInfluenceSlider', 'awayFromCOMInfluenceValue', 'awayFromCOMInfluence');
bindSliderToConfig('crowdingMinDistSlider', 'crowdingMinDistValue', 'crowdingMinDist');
bindSliderToConfig('crowdingFactorSlider', 'crowdingFactorValue', 'crowdingFactor');
bindSliderToConfig('minSproutingAgeSlider', 'minSproutingAgeValue', 'minSproutingAge');
bindSliderToConfig('standardSproutAngleSlider', 'standardSproutAngleValue', 'standardSproutAngle', x=>x*Math.PI/180);

bindButtonToSlider('initThicknessDecrButton', 'initThicknessSlider', -1);
bindButtonToSlider('initThicknessIncrButton', 'initThicknessSlider', 1);
bindButtonToSlider('growthRateDecrButton', 'growthRateSlider', -1);
bindButtonToSlider('growthRateIncrButton', 'growthRateSlider', 1);
bindButtonToSlider('maxThicknessDecrButton', 'maxThicknessSlider', -1);
bindButtonToSlider('maxThicknessIncrButton', 'maxThicknessSlider', 1);
bindButtonToSlider('maxAgeDecrButton', 'maxAgeSlider', -1);
bindButtonToSlider('maxAgeIncrButton', 'maxAgeSlider', 1);
bindButtonToSlider('sproutingRateDecrButton', 'sproutingRateSlider', -1);
bindButtonToSlider('sproutingRateIncrButton', 'sproutingRateSlider', 1);
bindButtonToSlider('sproutingLengthDecrButton', 'sproutingLengthSlider', -1);
bindButtonToSlider('sproutingLengthIncrButton', 'sproutingLengthSlider', 1);
bindButtonToSlider('sproutingGrowProbDecrButton', 'sproutingGrowProbSlider', -1);
bindButtonToSlider('sproutingGrowProbIncrButton', 'sproutingGrowProbSlider', 1);
bindButtonToSlider('influenceVectorDecrButton', 'influenceVectorSlider', -1);
bindButtonToSlider('influenceVectorIncrButton', 'influenceVectorSlider', 1);
bindButtonToSlider('maxRandomRotationTipDecrButton', 'maxRandomRotationTipSlider', -1);
bindButtonToSlider('maxRandomRotationTipIncrButton', 'maxRandomRotationTipSlider', 1);
bindButtonToSlider('breakingOffProbDecrButton', 'breakingOffProbSlider', -1);
bindButtonToSlider('breakingOffProbIncrButton', 'breakingOffProbSlider', 1);
bindButtonToSlider('awayFromCOMInfluenceDecrButton', 'awayFromCOMInfluenceSlider', -1);
bindButtonToSlider('awayFromCOMInfluenceIncrButton', 'awayFromCOMInfluenceSlider', 1);
bindButtonToSlider('crowdingMinDistDecrButton', 'crowdingMinDistSlider', -1);
bindButtonToSlider('crowdingMinDistIncrButton', 'crowdingMinDistSlider', 1);
bindButtonToSlider('crowdingFactorDecrButton', 'crowdingFactorSlider', -1);
bindButtonToSlider('crowdingFactorIncrButton', 'crowdingFactorSlider', 1);
bindButtonToSlider('minSproutingAgeDecrButton', 'minSproutingAgeSlider', -1);
bindButtonToSlider('minSproutingAgeIncrButton', 'minSproutingAgeSlider', 1);
bindButtonToSlider('standardSproutAngleDecrButton', 'standardSproutAngleSlider', -1);
bindButtonToSlider('standardSproutAngleIncrButton', 'standardSproutAngleSlider', 1);