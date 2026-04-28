import { playSpinSound, stopSpinSound } from "./playsound";
import isOnVabePage from "./isvapage";
import { ModState } from "./state";

let isSpinning = false;

async function swiperSpin() {
    if (isSpinning) return;

    const swiper = document.querySelector<HTMLElement>(".swiper");
    if (!swiper) return;

    const api = window.pulsesyncApi;
    if (api && api.getState()?.playerState?.status?.value === 'playing' && ModState.playMusic) {
        api.pause();
    }

    isSpinning = true;
    let audio: HTMLAudioElement | null = null;
    let duration = ModState.spinDuration * 1000;

    if (ModState.playMusic) {
        audio = playSpinSound();
        if (audio) {
            if (isNaN(audio.duration)) {
                await new Promise((resolve) => audio!.onloadedmetadata = resolve);
            }
            duration = audio.duration * 1000;
        }
    }

    const startTime = performance.now();
    let velocity = 0;
    const maxVelocity = 150;

    function step(currentTime: number) {
        if (!isOnVabePage()) {
            isSpinning = false;
            stopSpinSound();
            return;
        }

        const elapsed = currentTime - startTime;
        const remaining = duration - elapsed;

        if (remaining > 0) {
            if (elapsed < 500) {
                velocity += 5;
            } else if (remaining < 1500) {
                velocity *= 0.96;
            } else {
                velocity = maxVelocity;
            }

            if (velocity < 1) velocity = 1;

            swiper?.dispatchEvent(new WheelEvent("wheel", {
                deltaY: velocity,
                bubbles: true
            }));

            requestAnimationFrame(step);
        } else {
            finish();
        }
    }

    function finish() {
        isSpinning = false;
        const activeSlide = document.querySelector<HTMLElement>(".swiper-slide-active");
        if (!activeSlide) return;

        const playBtn = activeSlide.querySelector<HTMLElement>('[data-test-id="PLAY_BUTTON"]');
        const cardBtn = activeSlide.querySelector<HTMLElement>('[role="button"]');

        if (playBtn) {
            playBtn.click();
        } else if (cardBtn) {
            cardBtn.click();
        }
    }

    requestAnimationFrame(step);
}

export default swiperSpin;