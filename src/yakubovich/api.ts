import swiperSpin from "./swiperspin";
import { ModState } from "./state";

export function mountYakubovichApi() {
    (window as any).yakubovich = {
        spin: () => swiperSpin(),
        getConfig: () => ({ ...ModState }),
    };
}