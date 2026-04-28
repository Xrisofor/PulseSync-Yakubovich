import swiperSpin from "./swiperspin";
import isOnVabePage from "./isvapage";

function createButton(): void {
    if (!isOnVabePage()) return;

    const customPlayer = document.querySelector('[data-ps-custom-player="true"]');
    const vibePlayer = document.querySelector('.VibePlayerBar_root__G3MOe');

    let btn = document.getElementById("yakubovich-spin-button") as HTMLButtonElement;

    if (!btn) {
        btn = document.createElement("button");
        btn.id = "yakubovich-spin-button";
        btn.type = "button";
        btn.style.flexShrink = "0";
        btn.style.zIndex = "100";

        btn.innerHTML = `
            <span class="JjlbHZ4FaP9EAcR_1DxF">
                <svg class="J9wTKytjOWG73QMoN5WP UwnL5AJBMMAp6NwMDdZk" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
                </svg>
            </span>
        `;

        btn.onclick = (e) => {
            e.stopPropagation();
            swiperSpin();
        };
    }

    if (customPlayer) {
        btn.className = "cpeagBA1_PblpJn8Xgtv UDMYhpDjiAFT3xUx268O uwk3hfWzB2VT7kE13SQk IlG7b1K0AD7E7AMx6F5p HbaqudSqu7Q3mv3zMPGr eQt33MLDiQ6DRSuLaYEp qU2apWBO1yyEK0lZ3lPO";

        const metaContainer = customPlayer.querySelector('.PlayerBarDesktopWithBackgroundProgressBar_meta__FhKTC');
        if (metaContainer) {
            if (btn.parentElement !== metaContainer) {
                const queueBtn = metaContainer.querySelector('[data-test-id="PLAYERBAR_DESKTOP_PLAY_QUEUE_BUTTON"]');
                if (queueBtn) {
                    queueBtn.parentNode?.insertBefore(btn, queueBtn);
                } else {
                    metaContainer.prepend(btn);
                }
            }
            return;
        }
    }

    if (vibePlayer) {
        btn.className = "cpeagBA1_PblpJn8Xgtv UDMYhpDjiAFT3xUx268O uwk3hfWzB2VT7kE13SQk IlG7b1K0AD7E7AMx6F5p HbaqudSqu7Q3mv3zMPGr qU2apWBO1yyEK0lZ3lPO VibePlayerBar_button__GLhJ_";

        const progressZone = vibePlayer.querySelector('.VibePlayerBar_progress__Cri6E');
        if (progressZone && btn.parentElement !== progressZone) {
            const likeBtn = progressZone.querySelector('[data-test-id="LIKE_BUTTON"]');
            if (likeBtn) {
                likeBtn.parentNode?.insertBefore(btn, likeBtn);
            } else {
                progressZone.appendChild(btn);
            }
        }
    }
}

export default createButton;