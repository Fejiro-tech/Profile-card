document.addEventListener('DOMContentLoaded', function() {

    const timeElement = document.querySelector('[data-testid="test-user-time"]');

    if (timeElement) {
        function updateTime() {
            const now = Date.now();
            timeElement.textContent = now.toString();
        }
        updateTime();
        setInterval(updateTime, 1000);
    }

    const socialLinks = document.querySelectorAll('[data-testid="test-user-social-links"] a');
    socialLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (index < socialLinks.length - 1) {
                    socialLinks[index + 1].focus();
                } else {
                    socialLinks[0].focus();
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (index > 0) {
                    socialLinks[index - 1].focus();
                } else {
                    socialLinks[socialLinks.length - 1].focus();
                }
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        a {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);


    const form = document.querySelector(".contact-form");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const subjectError = document.getElementById("subject-error");
    const messageError = document.getElementById("message-error");
    const successMessage = document.getElementById("success-message");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (subjectError) subjectError.textContent = "";
            if (messageError) messageError.textContent = "";

            let isValid = true;

            if (!fullName.value.trim()) {
                nameError.textContent = "Full name is required";
                fullName.classList.add("input-error");
                isValid = false; 

            } else {
                const nameParts = fullName.value.trim().split(/\s+/);
                
                if (nameParts.length < 2) {
                    nameError.textContent = "Please enter both your first and last name!";
                    fullName.classList.add("input-error");
                    isValid = false;
                }
            }

            if (!email.value.trim()) {
                emailError.textContent = "Email is required";
                email.classList.add("input-error");
                isValid = false;

            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = "Please enter a valid email address";
                email.classList.add("input-error");
                isValid =false;
            }

            if(!subject.value.trim()) {
                subjectError.textContent = "Subject is required";
                subject.classList.add("input-error");
                isValid = false;

            }  else if(subject.value.trim().length < 5) {
                subjectError.textContent = "Subject must be at least 5 characters";
                subject.classList.add("input-error");
                isValid = false;
            }

            if(!message.value.trim()) {
                messageError.textContent= "Message cannot be empty";
                message.classList.add("input-error");
                isValid = false;

            } else if(message.value.trim().length < 10) {
                messageError.textContent = "message must be ten characters";
                message.classList.add("input-error");
                isValid = false;
            }

           if (isValid) {
                form.reset();
                if (successMessage) {
                    successMessage.style.display = "block";
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 5000);
                }
            }
        });

        email.addEventListener("input", () => {

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email.value.trim() && emailPattern.test(email.value.trim())) {

                if (emailError) emailError.textContent = "";
                email.classList.remove("input-error");
            }
        });

        fullName.addEventListener("input", () => {
           const nameValue = fullName.value.trim();
    
            if (!nameValue) {
                if (nameError) nameError.textContent = "";
                fullName.classList.remove("input-error");

            } else {
                const nameParts = nameValue.split(/\s+/);
                
                if (nameParts.length < 2) {
                    nameError.textContent = "Please enter both your first and last name!";
                    fullName.classList.add("input-error");
                } else {
                    nameError.textContent = "";
                    fullName.classList.remove("input-error");
                }
            }
        });

        subject.addEventListener("input", () => {

            const subjectVal = subject.value.trim();

            
                if (!subjectVal) {
                    subjectError.textContent = "";
                    subject.classList.remove("input-error");
                } else if (subjectVal.length < 5) {
                    subjectError.textContent = "Subject must be at least 5 characters";
                    subject.classList.add("input-error");
                } else {
                    subjectError.textContent = "";
                    subject.classList.remove("input-error");
                }
            })

        message.addEventListener("input", () => {
            const text = message.value.trim();

            if (!text) {
            messageError.textContent = "";
            message.classList.remove("input-error");
        } else if (text.length < 10) {
            messageError.textContent = "Message must be at least 10 characters";
            message.classList.add("input-error");
        } else {
            messageError.textContent = ""; 
            message.classList.remove("input-error");
        }
    })};

})