import isOnVabePage from "./isvapage";
import { ModState } from "./state";

let audioUnlocked = false;
export function setAudioUnlocked(value: boolean) { audioUnlocked = value; }
export function isAudioUnlocked() { return audioUnlocked; }

export function playSpinSound(): HTMLAudioElement | null {
    if (!audioUnlocked || !isOnVabePage()) return null;

    let audio = document.getElementById("yakubovich-spin-sound") as HTMLAudioElement | null;
    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "yakubovich-spin-sound";
        audio.preload = "auto";
        document.body.appendChild(audio);
    }

    const defaultSrc = `http://localhost:2007/assets/spin.mp3?name=yakubovich`;
    const targetSrc = ModState.audioFile || defaultSrc;

    if (audio.src !== targetSrc) {
        audio.src = targetSrc;
        audio.load();
    }

    audio.currentTime = 0;
    audio.play().catch(() => {});
    return audio;
}

export function stopSpinSound() {
    const audio = document.getElementById("yakubovich-spin-sound") as HTMLAudioElement | null;
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}