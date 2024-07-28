/**
 * Hides the footer links in the mobile footer.
 */
function hideFooterLinks() {
    const footer = document.querySelector('.mobile-footer');
    if (footer) {
        const footerLinks = footer.querySelectorAll('.footer-menu');
        footerLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}


/**
 * Event listener for DOMContentLoaded to check localStorage flags and hide footer links if necessary.
 */
document.addEventListener("DOMContentLoaded", function() {
    const openedWithoutLogin = localStorage.getItem('openedWithoutLogin');
    if (openedWithoutLogin === 'true') {
        hideFooterLinks();
    }
});

