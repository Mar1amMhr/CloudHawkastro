jQuery(function ($) {
    $(document).on('wpcf7submit', function (event) {
        var button = $('.wpcf7-submit[disabled]');
        button.prop('disabled', false);
        //button.val('Send message');
    });

    $('form.wpcf7-form').on('submit',function() {
        var form = $(this);
        var button = form.find('input[type=submit]');
        button.prop("disabled", true);
        //button.val("Sending...");
    });
});

/*document.addEventListener('contextmenu', function(e) {
    var allowedDomains = ['yalantis.com', 'yalantis-staging.yalantis.com'];

    if (allowedDomains.includes(window.location.hostname) && !e.target.closest('.allow-copy')) {
        e.preventDefault();
    }
});*/

document.addEventListener('copy', function(e) {
    var selectedText = window.getSelection().toString();
    var toAppend = '\nSource: ' + window.location.href;
    var newCopy = selectedText + toAppend;

    e.clipboardData.setData('text/plain', newCopy);
    e.preventDefault();
});

// Copy email to clipboard
const emailBtnCopy = document.querySelectorAll('.email-text-copy-btn');
emailBtnCopy.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapper = e.target.closest('.contact-us-info-content-item-link-wrapper');
        const targetText = wrapper.querySelector('.email-text-for-copy').textContent.trim();
        const emailCopyMessage = wrapper.querySelector('.email-copy-message');

        navigator.clipboard.writeText(targetText);
        emailCopyMessage.style.display = 'block';

        setTimeout(() => {
            emailCopyMessage.style.display = 'none';
        }, 2000)
    })
})


document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.header-banner');
    const closeButton = document.querySelector('.header-close-banner');
    const currentPath = window.location.pathname; // Получаем путь текущей страницы

    if (banner && closeButton) {
        closeButton.addEventListener('click', function () {
            banner.style.display = 'none';
            let cookieName;
            if (banner && banner.classList.contains('main-banner')) {
                cookieName = 'main_banner_closed';
            } else {
                cookieName = `banner_closed${currentPath}`;
            }

            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/wp-admin/admin-ajax.php', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`action=set_cookie_banner&cookieName=${cookieName}&cookieValue=true&days=1`);

           /* if (banner && banner.classList.contains('main-banner')) {
                setCookie(`main_banner_closed`, 'true', 1);
            }else{
                setCookie(`banner_closed${currentPath}`, 'true', 1);
            }*/
        });
    }
});

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}
