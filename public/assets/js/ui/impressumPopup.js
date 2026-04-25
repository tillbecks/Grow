import * as POPUP from './popup.js';
import DOM from '../state/domState.js';

export function impressumPopupInit(){
    DOM.impressum.addEventListener("click", () => {
        POPUP.setPopupContent(createImpressumPopup());
    });
}

function createImpressumPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup-content-div');

    const title = document.createElement('p');
    title.textContent = 'Impressum';
    title.classList.add('popup-title', 'left-align');
    popup.appendChild(title);

    const name = document.createElement('p');
    name.textContent = 'Till Becker';
    name.classList.add('left-align', 'bold');
    popup.appendChild(name);

    const emailLink = document.createElement('a');
    // E-Mail obfuskiert
    emailLink.href = 'mailto:' + ['till', '.becker@tuta', '.io'].join('');
    emailLink.textContent = ['till', '.becker@tuta', '.io'].join('');
    emailLink.classList.add('left-align');
    popup.appendChild(emailLink);

    const openSourceInfo = document.createElement('p');
    openSourceInfo.textContent = 'This project is open source and noncommercial.';
    openSourceInfo.classList.add('left-align');
    popup.appendChild(openSourceInfo);

    const close = document.createElement('button');
    close.textContent = 'Close';
    close.classList.add('button');
    close.addEventListener('click', () => {
        POPUP.hidePopup();
    });
    popup.appendChild(close);

    return popup;

}
