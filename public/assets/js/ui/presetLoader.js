import * as TCPRESETS from "../config/treeConfigPresets.js";
import * as sliderUpdates from "./sliderUpdates.js";

const presetSelector = document.getElementById("presetSelector");
let lastPresetIndex = -1;

export function configurePresetSelector(){
    // "custom" Option hinzufügen (wird per CSS versteckt)
    const customOption = document.createElement("option");
    customOption.value = "custom";
    customOption.textContent = "custom";
    presetSelector.appendChild(customOption);
    
    for (let i = 0; i < TCPRESETS.treeConfigs.length; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = TCPRESETS.treeConfigs[i].name;
        option.addEventListener("click", () => {
            loadPreset(i);
        });
        presetSelector.appendChild(option);
    }
    presetSelector.value = TCPRESETS.defaultTreeConfigIndex;
}

/*presetLoadButton.addEventListener("click", () => {
    const presetIndex = presetSelector.value;
    loadPreset(presetIndex);
});*/

function loadPreset(presetIndex){
    if(presetIndex != lastPresetIndex){
        lastPresetIndex = presetIndex;
        if(presetIndex < 0 || presetIndex >= TCPRESETS.treeConfigs.length){
            setCustomValue();
        }else{
            let config = TCPRESETS.treeConfigs[presetIndex];    
            // Slider synchronization -> triggers state update automatically
            sliderUpdates.updateSlidersFromConfig(config);
        }
    }
}

export function setCustomValue(){
    presetSelector.value = "Custom";
}

export function loadDefaultPreset(){
    loadPreset(TCPRESETS.defaultTreeConfigIndex);
}

