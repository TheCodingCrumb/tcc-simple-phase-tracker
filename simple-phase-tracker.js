import { PhaseAction } from "./script/phase-actions.js";
import { MODULE_ID, Settings } from "./script/settings.js";
const { renderTemplate } = foundry.applications.handlebars

Hooks.once('init', async function () {
    // Save settings (singleton by default)
    Settings.registerSettings();
});

Hooks.once('ready', async function () {
    console.log("Ready Simple Phase Tracker");
    // Draw clock
    const uiMiddleTop = document.querySelector("#ui-top");
    uiMiddleTop.innerHTML += await renderTemplate(`modules/${MODULE_ID}/templates/simple-phase-tracker.hbs`, {
        number: Settings.getCurrentHour(),
        step: "hour",
        phase: Settings.getCurrentPhaseName(),
        isGM: game.user.isGM,
    });

    if (game.user.isGM) {
        const sptAddHourBtn = document.querySelector("[data-update-next-step]");
        sptAddHourBtn.addEventListener("click", PhaseAction.updateToNextHour);

        const sptSubHourBtn = document.querySelector("[data-update-previous-step]");
        sptSubHourBtn.addEventListener("click", PhaseAction.updateToPreviousHour);

        const sptAddPhaseBtn = document.querySelector("[data-update-next-phase]");
        sptAddPhaseBtn.addEventListener("click", PhaseAction.updateToNextPhase);

        const sptSubPhaseBtn = document.querySelector("[data-update-previous-phase]");
        sptSubPhaseBtn.addEventListener("click", PhaseAction.updateToPreviousPhase);
    }

});
