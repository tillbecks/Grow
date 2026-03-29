import { informationContent } from "./infoContent.js";

function bindObjectToInfoBox(objectId, contentObjectKey){
    const element = document.getElementById(objectId);
    element.addEventListener("click", () => {
        setInfoBoxContent(informationContent[contentObjectKey]);
        toggleInfoBox(true);
    });
}

function setInfoBoxContent(contentObject){
    const title = document.getElementById("infoBoxTitle");
    const text = document.getElementById("infoBoxText");
    const imageContainer = document.getElementById("infoBoxImageContainer");

    title.textContent = contentObject.title;
    text.textContent = contentObject.text;
    
    imageContainer.innerHTML = "";
    for(const image of contentObject.images){
        imageContainer.appendChild(createImageDescription(image.src, image.alt, image.description));
    }
}

function createImageDescription(src, alt="", description){
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "5px";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.width = "100%";
    container.style.height = "fit-content";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.style.width = "100%";
    img.style.height = "auto";

    const desc = document.createElement("p");
    desc.textContent = description;
    desc.style.fontSize = "0.9em";
    desc.style.textAlign = "left";

    container.appendChild(img);
    container.appendChild(desc);

    return container;
}

const infoBoxContent = document.getElementById("infoBoxContent");
const infoBoxHideButton = document.getElementById("infoBoxHideButton");

function toggleInfoBox(show = null){
    if(show == true || infoBoxContent.style.display === "none"){
        infoBoxContent.style.display = "flex";
        infoBoxHideButton.value = "hide InfoBox";
    } else {
        infoBoxContent.style.display = "none";
        infoBoxHideButton.value = "show InfoBox";
    }
}

document.getElementById("infoBoxHideButton").addEventListener("click", toggleInfoBox);

bindObjectToInfoBox("growLogo", "growProject");
bindObjectToInfoBox("editModeButton", "editMode");
bindObjectToInfoBox("startPointButton", "startPointMode");
bindObjectToInfoBox("joinPointButton", "joinPointMode");

bindObjectToInfoBox("initThicknessSlider", "initThickness");
bindObjectToInfoBox("growthRateSlider", "growthRate");
bindObjectToInfoBox("maxThicknessSlider", "maxThickness");
bindObjectToInfoBox("maxAgeSlider", "maxAge");

bindObjectToInfoBox("minSproutingAgeSlider", "minSproutingAge");
bindObjectToInfoBox("sproutingRateSlider", "sproutingRate");
bindObjectToInfoBox("sproutingLengthSlider", "sproutingLength");
bindObjectToInfoBox("sproutingGrowProbSlider", "sproutingGrowProb");

bindObjectToInfoBox("standardSproutAngleSlider", "standardSproutAngle");
bindObjectToInfoBox("maxRandomRotationTipSlider", "maxRandomRotationTip");
bindObjectToInfoBox("awayFromCOMInfluenceSlider", "awayFromCOMInfluence");
bindObjectToInfoBox("influenceVectorSlider", "influenceVector");
bindObjectToInfoBox("crowdingMinDistSlider", "crowdingMinDist");
bindObjectToInfoBox("crowdingFactorSlider", "crowdingFactor");
bindObjectToInfoBox("breakingOffProbSlider", "breakingOffProb");