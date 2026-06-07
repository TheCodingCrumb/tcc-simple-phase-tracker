import { Settings } from "./settings.js";

export class Helper {
    static refreshTracker() {
        const trackerText = document.querySelector(".tcc-spt-text");
        trackerText.innerText = `${Settings.getCurrentHour()} hour in ${Settings.getCurrentPhaseName()}`;
    }
}

