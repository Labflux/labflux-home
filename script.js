// Toast Notification System
function showToast(type, title, message, duration = 5000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-open');
        mobileMenuToggle.classList.toggle('active');
    });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            if (navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .use-case, .benefit-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            if (buttonText.includes('Quero Saber Mais') || buttonText.includes('Quero Ser Notificado')) {
                const signupSection = document.getElementById('signup');
                if (signupSection) {
                    signupSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('Ver Demonstração') || buttonText.includes('Agendar Demonstração')) {
                showToast('info', 'Demonstração', 'Em breve você poderá agendar uma demonstração do LabFlux! Por enquanto, deixe seu email na lista de interesse.', 6000);
            }
        });
    });

    // Handle email signup form (Netlify Forms)
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('email');
            const email = emailInput.value;
            const submitButton = signupForm.querySelector('button[type="submit"]');

            if (email) {
                // Disable button and show loading state
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Enviando...';

                // Check if we're on Netlify or local
                const isNetlify = window.location.hostname !== 'localhost' &&
                                 window.location.hostname !== '127.0.0.1' &&
                                 !window.location.hostname.match(/^192\.168\./);

                if (isNetlify) {
                    // Submit to Netlify Forms
                    fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(new FormData(signupForm)).toString()
                    })
                        .then(function(response) {
                            if (response.ok) {
                                showToast('success', 'Sucesso!', `Obrigado! Seu email ${email} foi adicionado à nossa lista de interesse. Você receberá atualizações em breve!`, 7000);
                                emailInput.value = '';
                            } else {
                                throw new Error('Form submission failed');
                            }
                        })
                        .catch(function(error) {
                            console.error('Form submission failed:', error);
                            showToast('error', 'Erro ao enviar', 'Não foi possível enviar o email no momento. Por favor, tente novamente mais tarde ou entre em contato diretamente conosco.', 7000);
                        })
                        .finally(function() {
                            // Re-enable button
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                        });
                } else {
                    // Local testing - simulate success
                    setTimeout(function() {
                        console.log('Local testing mode - Form would submit:', email);
                        showToast('success', 'Sucesso! (Modo Local)', `Teste local: Seu email ${email} seria adicionado à lista de interesse quando implantado no Netlify.`, 7000);
                        emailInput.value = '';
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 1000);
                }
            }
        });
    }

    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Removed stats number animation since we're no longer using specific numbers

    // Removed animateNumber function since we're no longer using specific numbers
});