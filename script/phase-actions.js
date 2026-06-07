import { MODULE_ID, Settings, SETTINGS } from "./settings.js";

export class PhaseAction {
    static updateToNextHour() {
        const currentHour = Settings.getCurrentHour();
        const targetHour = currentHour + 1;

        // Go to next phase
        if (targetHour > SETTINGS.PHASES_DURATION - 1) {
            PhaseAction.updateToNextPhase();
            return;
        }

        // Go to next hour
        game.settings.set(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING, targetHour);
    }

    static updateToPreviousHour() {
        const currentHour = Settings.getCurrentHour();
        const targetHour = currentHour - 1;

        // Go to previous phase
        if (targetHour <= 0) {
            PhaseAction.updateToPreviousPhase({ fromHour: true });
            return;
        }

        // Go to previous hour
        game.settings.set(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING, targetHour);
    }

    static updateToNextPhase() {
        const currentPhase = Settings.getCurrentPhase();
        const targetPhase = currentPhase + 1;

        // Reset hour
        game.settings.set(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING, 1);

        // Go to first phase
        if (targetPhase > SETTINGS.PHASES.length - 1) {
            game.settings.set(MODULE_ID, SETTINGS.CURRENT_PHASE_SETTING, 0);
            return;
        }

        // Go to next phase
        game.settings.set(MODULE_ID, SETTINGS.CURRENT_PHASE_SETTING, targetPhase);
    }


    static updateToPreviousPhase({ fromHour = false }) {
        const currentPhase = Settings.getCurrentPhase();
        const targetPhase = currentPhase - 1;

        if (fromHour) {
            // Set to the last hour of previous phase
            game.settings.set(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING, SETTINGS.PHASES_DURATION);
        } else {
            // Set to the first hour of the previous phase
            game.settings.set(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING, 1);
        }

        // Go to last phase
        if (targetPhase < 0) {
            game.settings.set(MODULE_ID, SETTINGS.CURRENT_PHASE_SETTING, SETTINGS.PHASES.length - 1);
            return;
        }

        // Got to previous phase
        game.settings.set(MODULE_ID, SETTINGS.CURRENT_PHASE_SETTING, targetPhase);
    }


    static updateToSetPhase({ phase }) {
        if (SETTINGS.PHASES.find(phase))
            game.settings.set(MODULE_ID, SETTINGS.CURRENT_PHASE_SETTING, phase);
    }

    static updateToSetHour({ hour }) {
        if (hour >= 0 && hour <= SETTINGS.PHASES_DURATION)
            game.settings.set(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING, hour);
    }
}