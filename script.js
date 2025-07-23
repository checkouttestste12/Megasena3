// Countdown Timer para deadline de inscrições
function startDeadlineCountdown() {
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes')
    };

    // Set deadline (7 days from now)
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = deadline.getTime() - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            if (countdownElements.days) countdownElements.days.textContent = days.toString().padStart(2, '0');
            if (countdownElements.hours) countdownElements.hours.textContent = hours.toString().padStart(2, '0');
            if (countdownElements.minutes) countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
        } else {
            // Reset countdown when it reaches zero
            deadline.setDate(deadline.getDate() + 7);
        }
    }

    // Update immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Update deadline date display
function updateDeadlineDate() {
    const deadlineElement = document.getElementById('deadline-date');
    if (deadlineElement) {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        deadlineElement.textContent = deadline.toLocaleDateString('pt-BR', options);
    }
}

// Scroll to form function
function scrollToForm() {
    const formSection = document.getElementById('form-section');
    if (formSection) {
        formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add subtle animation to the form
        const formContainer = document.querySelector('.registration-container');
        if (formContainer) {
            formContainer.style.transform = 'scale(1.02)';
            setTimeout(() => {
                formContainer.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Research video play handler
function playResearchVideo() {
    const videoContainer = document.querySelector('.video-container-institutional');
    const playButton = document.querySelector('.play-button');
    const videoInfo = document.querySelector('.video-info');
    
    if (playButton && videoInfo) {
        // Change play button to loading state
        playButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        videoInfo.innerHTML = '<h3>Carregando apresentação...</h3><p>Aguarde um momento</p>';
        
        // Simulate video loading and play
        setTimeout(() => {
            alert('Esta é uma demonstração da landing page institucional. Em uma implementação real, aqui seria reproduzido o vídeo de apresentação da pesquisa.');
            
            // Reset to original state
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            videoInfo.innerHTML = `
                <h3>Apresentação da Pesquisa</h3>
                <p>Dr. Carlos Silva explica os principais achados do estudo</p>
                <span class="video-duration">3:42 min</span>
            `;
        }, 1500);
    }
}

// Form submission handler
function handleFormSubmission() {
    const form = document.getElementById('registration-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!validateForm(data)) {
                return;
            }
            
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando Solicitação...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showSuccessMessage();
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2500);
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.fullName || data.fullName.trim().length < 2) {
        errors.push('Nome completo é obrigatório (mínimo 2 caracteres)');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('E-mail válido é obrigatório');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Número de WhatsApp válido é obrigatório');
    }
    
    if (!data.city || data.city.trim().length < 2) {
        errors.push('Cidade/Estado é obrigatório');
    }
    
    if (!data.terms) {
        errors.push('É necessário concordar com os termos de participação');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phonePattern = /^[\d\s\(\)\-\+]{10,}$/;
    return phonePattern.test(phone);
}

// Show error message
function showErrorMessage(errors) {
    const errorHtml = errors.map(error => `<li>${error}</li>`).join('');
    const message = `
        <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #f5c6cb;">
            <strong>Por favor, corrija os seguintes erros:</strong>
            <ul style="margin: 10px 0 0 20px;">${errorHtml}</ul>
        </div>
    `;
    
    showMessage(message);
}

// Show success message
function showSuccessMessage() {
    const message = `
        <div style="background: #d4edda; color: #155724; padding: 20px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #c3e6cb; text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
            <strong>Solicitação Enviada com Sucesso!</strong>
            <p style="margin: 10px 0 0 0;">Nossa equipe de pesquisadores entrará em contato em até 24 horas para confirmar sua participação no programa de acesso à metodologia.</p>
        </div>
    `;
    
    showMessage(message);
}

// Show message helper
function showMessage(messageHtml) {
    const formContainer = document.querySelector('.registration-form');
    if (formContainer) {
        const existingMessage = formContainer.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.innerHTML = messageHtml;
        
        formContainer.insertBefore(messageDiv, formContainer.firstChild);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-remove success messages after 10 seconds
        if (messageHtml.includes('success') || messageHtml.includes('Sucesso')) {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 10000);
        }
    }
}

// Floating access button visibility
function handleFloatingAccess() {
    const floatingAccess = document.getElementById('floating-access');
    const formSection = document.getElementById('form-section');
    
    if (floatingAccess && formSection) {
        function checkVisibility() {
            const formRect = formSection.getBoundingClientRect();
            const isFormVisible = formRect.top < window.innerHeight && formRect.bottom > 0;
            
            if (isFormVisible) {
                floatingAccess.style.opacity = '0';
                floatingAccess.style.pointerEvents = 'none';
            } else {
                floatingAccess.style.opacity = '0.9';
                floatingAccess.style.pointerEvents = 'auto';
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); // Check initial state
    }
}

// Smooth scroll animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.stat-item, .feature-item, .case-study, .detail-item, .sidebar-section'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Add hover effects to interactive elements
function addInteractiveEffects() {
    // Case studies hover effect
    const caseStudies = document.querySelectorAll('.case-study');
    caseStudies.forEach(caseStudy => {
        caseStudy.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.01)';
        });
        
        caseStudy.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Stat items counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation for statistics
function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 50; // 50 steps
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + (isPercentage ? '%' : '');
    }, 30);
}

// Smooth scrolling for navigation links
function handleSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Reading progress indicator
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1e3c72, #2a5298);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    startDeadlineCountdown();
    updateDeadlineDate();
    handleFormSubmission();
    handleFloatingAccess();
    handleScrollAnimations();
    addInteractiveEffects();
    handleSmoothScrolling();
    addReadingProgress();
    
    // Add entrance animation to hero section
    const articleHeader = document.querySelector('.article-header');
    if (articleHeader) {
        articleHeader.style.opacity = '0';
        articleHeader.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            articleHeader.style.transition = 'opacity 1s ease, transform 1s ease';
            articleHeader.style.opacity = '1';
            articleHeader.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add some dynamic effects on window load
window.addEventListener('load', function() {
    // Fade in sidebar sections with delay
    const sidebarSections = document.querySelectorAll('.sidebar-section');
    sidebarSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });
});

// Handle form input enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
    
    // Real-time validation feedback
    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Single field validation
function validateSingleField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.type) {
        case 'email':
            isValid = isValidEmail(value);
            errorMessage = 'Por favor, insira um e-mail válido';
            break;
        case 'tel':
            isValid = isValidPhone(value);
            errorMessage = 'Por favor, insira um número de WhatsApp válido';
            break;
        default:
            isValid = value.length >= 2;
            errorMessage = 'Este campo é obrigatório (mínimo 2 caracteres)';
    }
    
    if (!isValid && value.length > 0) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '#e9ecef';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

