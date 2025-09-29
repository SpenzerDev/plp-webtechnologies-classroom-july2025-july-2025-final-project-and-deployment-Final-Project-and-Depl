    // Navigation Elements
        const navLinks = document.querySelectorAll('.nav-link');
        const pageSections = document.querySelectorAll('.page-section');
        const menuToggle = document.getElementById('menuToggle');
        const navLinksContainer = document.getElementById('navLinks');

        // Page Navigation Function
        function navigateToPage(pageName) {
            // Hide all page sections
            pageSections.forEach(section => {
                section.classList.remove('active');
            });

            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Show selected page section
            const targetSection = document.getElementById(pageName);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Add active class to clicked nav link
            const activeLink = document.querySelector(`[data-page="${pageName}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Close mobile menu if open
            navLinksContainer.classList.remove('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Navigation Link Click Event
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = link.getAttribute('data-page');
                navigateToPage(pageName);
            });
        });

        // Mobile Menu Toggle
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // Contact Form Handling
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const userName = document.getElementById('userName').value.trim();
            const userEmail = document.getElementById('userEmail').value.trim();
            const userPhone = document.getElementById('userPhone').value.trim();
            const userMessage = document.getElementById('userMessage').value.trim();

            // Basic validation
            if (!userName || !userEmail || !userMessage) {
                displayFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(userEmail)) {
                displayFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            displayFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });

        // Display Form Message Function
        function displayFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            
            // Auto-hide message after 5 seconds
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navLinksContainer.classList.remove('active');
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const currentPage = location.hash.slice(1) || 'home';
            navigateToPage(currentPage);
        });