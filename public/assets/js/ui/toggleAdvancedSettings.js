import {HIDEADVANCEDSETTINGSONINIT} from '../config/appConfig.js';

//Toggle Advanced Settings visibility
const advancedSettingsToggle = document.getElementById('advancedSettingsToggle');
const advancedSettingsContainer = document.getElementById('advancedSettingsContainer');
const settingsArrow = document.getElementById('settingsArrow');

export function init(){
    if(HIDEADVANCEDSETTINGSONINIT){
        advancedSettingsContainer.classList.add('hidden');
    }
    setSettingsArrows();
}

advancedSettingsToggle.addEventListener('click', () => {
    const isHidden = advancedSettingsContainer.classList.contains('hidden');
    if (isHidden) {
        advancedSettingsContainer.classList.remove('hidden');
    } else {
        advancedSettingsContainer.classList.add('hidden');
    }
    setSettingsArrows();
});

function setSettingsArrows(){
    const isHidden = advancedSettingsContainer.classList.contains('hidden');
    settingsArrow.textContent = isHidden ? '⌄' : '⌃';
}