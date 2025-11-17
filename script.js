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

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your EmailJS public key
})();

// Function to send email notification
function sendEmailNotification(email) {
    const templateParams = {
        to_email: 'luiz.ferreira.costa.carvalho@gmail.com',
        user_email: email,
        subject: 'Nova inscrição na lista de interesse - LabFlux',
        message: `Um novo usuário se cadastrou na lista de interesse: ${email}`
    };

    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
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

    // Handle email signup form
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

                // Send email notification
                sendEmailNotification(email)
                    .then(function(response) {
                        showToast('success', 'Sucesso!', `Obrigado! Seu email ${email} foi adicionado à nossa lista de interesse. Você receberá atualizações em breve!`, 7000);
                        emailInput.value = '';
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        showToast('error', 'Erro ao enviar', 'Não foi possível enviar o email no momento. Por favor, tente novamente mais tarde ou entre em contato diretamente conosco.', 7000);
                    })
                    .finally(function() {
                        // Re-enable button
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    });
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

const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card, .use-case, .benefit-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(style);