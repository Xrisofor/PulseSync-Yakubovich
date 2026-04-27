import addonConfig from '../../addon.config.mjs';
import { getAddonSettings, readBooleanSetting } from '@/pulsesync';
import { ModState } from "./state";
import { setAudioUnlocked } from "./playsound";
import createButton from "./button";
import isOnVabePage from "./isvapage";

export function mountYakubovich(): void {
    const settingsStore = getAddonSettings(addonConfig.name);

    const syncSettings = (s: any) => {
        ModState.playMusic = readBooleanSetting(s, 'playMusic', true);
        ModState.spinDuration = s['spinDuration']?.value ?? 5;

        const customFile = s['audioFile']?.value;
        ModState.audioFile = customFile && customFile !== "" ? customFile : null;
    };

    document.addEventListener("click", () => {
        setAudioUnlocked(true);
    }, { once: true });

    syncSettings(settingsStore.getCurrent());
    settingsStore.onChange(next => syncSettings(next));

    const observer = new MutationObserver(() => {
        createButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (isOnVabePage())
        createButton();
}