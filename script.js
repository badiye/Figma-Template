document.addEventListener('DOMContentLoaded', () => {
    const triggerBtns = document.querySelectorAll('.trigger');
    const closeBtns = document.querySelectorAll('.close-btn');

    triggerBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.list-container');
            if (container) {
                container.classList.add('expand');
                setTimeout(() => container.classList.add('show'), 100);
            }
        });
    });

    closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.list-container');
            if (container) {
                container.classList.remove('show');
                setTimeout(() => container.classList.remove('expand'), 300);
            }
        });
    });

    document.querySelectorAll('.skillss .title').forEach((title) => {
        title.addEventListener('click', () => {
            const parent = title.parentElement;
            const content = parent.querySelector('.content');
            const icon = title.querySelector('i');

            if (content) {
                const isShown = content.classList.toggle('show');
                icon.classList.toggle('fa-chevron-down', isShown);
                icon.classList.toggle('fa-chevron-right', !isShown);
                title.setAttribute('aria-expanded', isShown);
            }
        });
    });

    document.querySelectorAll('.navbar .links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const sections = document.querySelectorAll('section, .list, .about, .contact');
    const navLinks = document.querySelectorAll('.navbar .links a');

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let current = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }, 50);
    });

    // Form Validation
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const textarea = document.querySelector('textarea');
    const submitBtn = form.querySelector('button[type="submit"]');

    function showValidation(input, isValid) {
        input.classList.toggle('invalid', !isValid);
    }

    nameInput.addEventListener('input', () => {
        showValidation(nameInput, nameInput.value.trim() !== '');
    });

    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
        showValidation(emailInput, isValid);
    });

    textarea.addEventListener('input', () => {
        showValidation(textarea, textarea.value.trim().length >= 10);
    });

    // Form submit validation
    form.addEventListener('submit', function (e) {
        let isValid = true;
        const errors = [];

        const nameValid = nameInput.value.trim() !== '';
        const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.value.trim());
        const messageValid = textarea.value.trim().length >= 10;

        showValidation(nameInput, nameValid);
        showValidation(emailInput, emailValid);
        showValidation(textarea, messageValid);

        if (!nameValid) {
            errors.push('Name is required.');
            isValid = false;
        }

        if (!emailValid) {
            errors.push('Enter a valid email address.');
            isValid = false;
        }

        if (!messageValid) {
            errors.push('Message must be at least 10 characters long.');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            alert(errors.join('\n'));
        }
    });
});
