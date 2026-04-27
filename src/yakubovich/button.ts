import swiperSpin from "./swiperspin";
import isOnVabePage from "./isvapage";
import { ModState } from "./state"

function createButton(): void {
    if (!isOnVabePage()) return;
    if (document.getElementById("mod-spin-button")) return;

    const likeBtn = document.querySelector('[data-test-id="LIKE_BUTTON"]');
    if (!likeBtn) return;

    const btn = document.createElement("button");
    btn.id = "mod-spin-button";
    btn.className = "cpeagBA1_PblpJn8Xgtv UDMYhpDjiAFT3xUx268O uwk3hfWzB2VT7kE13SQk IlG7b1K0AD7E7AMx6F5p HbaqudSqu7Q3mv3zMPGr qU2apWBO1yyEK0lZ3lPO VibePlayerBar_button__GLhJ_";
    btn.type = "button";
    btn.title = "Крутить барабан";

    btn.innerHTML = `
        <span class="JjlbHZ4FaP9EAcR_1DxF">
            <svg class="J9wTKytjOWG73QMoN5WP UwnL5AJBMMAp6NwMDdZk" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
            </svg>
        </span>
    `;

    btn.onclick = (e) => {
        e.stopPropagation();
        swiperSpin();

        if (!ModState.playMusic) return;

        const api = window.pulsesyncApi;
        if (api) {
            const state = api.getState();
            const currentStatus = state?.playerState?.status?.value;

            if (currentStatus === 'playing')
                api.pause();
        }
    };

    likeBtn.parentNode?.insertBefore(btn, likeBtn);
}

export default createButton;