import { Helper } from "./helper.js";


export const MODULE_ID = "tcc-simple-phase-tracker";

export const SETTINGS = {
    PHASES: ["Termia", "Sonstrel", "Vernima"],
    CURRENT_PHASE_INDEX: 0,
    PHASES_DURATION: 30,
    PHASES_SETTING: "phases",
    CURRENT_PHASE_SETTING: "currentPhase",
    CURRENT_HOUR_SETTING: "currentHour",
}

export class Settings {

    static getCurrentHour() {
        return game.settings.get(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING);
    }

    static getCurrentPhase() {
        return game.settings.get(MODULE_ID, SETTINGS.CURRENT_PHASE_SETTING);
    }

    static getCurrentPhaseName() {
        return SETTINGS.PHASES[Settings.getCurrentPhase()];
    }

    static registerSettings() {
        game.settings.register(MODULE_ID, SETTINGS.CURRENT_PHASE_SETTING, {
            name: 'Current Phase',
            scope: 'world',
            config: false,
            type: Number,
            default: SETTINGS.CURRENT_PHASE_INDEX,
            requiresReload: false,
            onChange: value => {
                console.log("New phase : ", SETTINGS.PHASES[value]);
                Helper.refreshTracker();
            },
        });

        game.settings.register(MODULE_ID, SETTINGS.PHASES_SETTING, {
            name: 'Current Phase',
            scope: 'world',
            config: false,
            type: Number,
            default: SETTINGS.CURRENT_PHASE_INDEX,
            requiresReload: false,
            onChange: value => {
                console.log("New phase : ", SETTINGS.PHASES[value]);
                Helper.refreshTracker();
            },
        });

        game.settings.register(MODULE_ID, SETTINGS.CURRENT_HOUR_SETTING, {
            name: 'Current Hour',
            scope: 'world',
            config: false,
            type: Number,
            default: 1,
            requiresReload: false,
            onChange: value => {
                console.log("New hour : ", value);
                Helper.refreshTracker();
            },
        });
    }

}
