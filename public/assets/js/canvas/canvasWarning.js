import { WARNINGDISPLAYTIME } from "../config/appConfig.js";

export default function spawnWarning(warningMessage){
    const canvasSection = document.getElementById("canvasAgeContainer");

    const warningBox = document.createElement("div");
    warningBox.classList.add('warningBox');
    warningBox.textContent = warningMessage;

    canvasSection.appendChild(warningBox);

    setTimeout(() => {
        warningBox.classList.add('fade-out');
    }, WARNINGDISPLAYTIME);
}