function isOnVabePage(): boolean {
    const link = document.querySelector<HTMLElement>('[data-test-id="NAVBAR_NAVIGATION_ITEM_HOME"]');
    if (!link) return false;
    const parentLi = link.closest<HTMLElement>('li');
    return !!parentLi && parentLi.getAttribute('aria-current') === "page";
}

export default isOnVabePage;