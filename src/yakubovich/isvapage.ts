function isOnVabePage(): boolean {
    const link = document.querySelector<HTMLElement>('[data-test-id="NAVBAR_NAVIGATION_ITEM_HOME"]');
    if (!link) return false;

    const parentLi = link.closest<HTMLElement>('li');
    const isHomeTabActive = !!parentLi && parentLi.getAttribute('aria-current') === "page";

    if (!isHomeTabActive) return false;

    const isOldHomePage = !!document.querySelector('[data-test-id="LIKES_AND_HISTORY"]') ||
        !!document.querySelector('[data-test-id="TAB_CAROUSEL"]') ||
        !!document.querySelector('[data-test-id="NEW_RELEASES"]') ||
        !!document.querySelector('.VirtualizedSkeletonBlock_root__njUFa');

    return !isOldHomePage;
}

export default isOnVabePage;