// Content Loader - Loads admin panel data into main website

document.addEventListener('DOMContentLoaded', function() {
    loadAdminContent();
});

function loadAdminContent() {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) return;

    try {
        const data = JSON.parse(adminData);
        const currentPage = getCurrentPage();

        switch(currentPage) {
            case 'index':
                loadHomePage(data.home);
                break;
            case 'geography':
                loadGeographyPage(data.geography);
                break;
            case 'history':
                loadHistoryPage(data.history);
                break;
            case 'people-culture':
                loadPeoplePage(data.people);
                break;
            case 'duty':
                loadDutyPage(data.duty);
                break;
            case 'diary':
                loadDiaryPage(data.diary);
                break;
            case 'gallery':
                loadGalleryPage(data.gallery);
                break;
            case 'thoughts':
                loadThoughtsPage(data.thoughts);
                break;
        }

        // Update settings
        if (data.settings) {
            updateSettings(data.settings);
        }
    } catch (error) {
        console.error('Error loading admin content:', error);
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    return page || 'index';
}

// Home Page
function loadHomePage(data) {
    if (!data) return;

    // Hero Section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && data.heroTitle) heroTitle.textContent = data.heroTitle;

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && data.heroSubtitle) heroSubtitle.textContent = data.heroSubtitle;

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription && data.heroDescription) heroDescription.textContent = data.heroDescription;

    // Stats
    if (data.stats && data.stats.length >= 4) {
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            data.stats.forEach((stat, index) => {
                if (statCards[index]) {
                    const value = statCards[index].querySelector('.stat-value');
                    const text = statCards[index].querySelector('.stat-text');
                    if (value) value.textContent = stat.value;
                    if (text) text.textContent = stat.label;
                }
            });
        }
    }

    // Welcome Text
    const welcomeSection = document.querySelector('.intro-section .content-card p');
    if (welcomeSection && data.welcomeText) {
        welcomeSection.textContent = data.welcomeText;
    }
}

// Geography Page
function loadGeographyPage(data) {
    if (!data) return;

    const cards = document.querySelectorAll('.content-card');
    
    if (cards[0] && data.overview) {
        const p = cards[0].querySelector('p');
        if (p) p.textContent = data.overview;
    }

    if (cards[1] && data.topographical) {
        const p = cards[1].querySelector('p');
        if (p) p.textContent = data.topographical;
    }

    if (data.facts) {
        const factBox = document.querySelector('.fact-box');
        if (factBox) {
            const ul = factBox.querySelector('ul');
            if (ul) {
                const facts = data.facts.split('\n').filter(f => f.trim());
                ul.innerHTML = facts.map(f => `<li>${f.trim()}</li>`).join('');
            }
        }
    }

    if (cards[2] && data.districts) {
        const p = cards[2].querySelector('p');
        if (p) p.textContent = data.districts;
    }

    if (cards[3] && data.sahara) {
        const p = cards[3].querySelector('p');
        if (p) p.textContent = data.sahara;
    }

    // Load images
    if (data.images && data.images.length > 0) {
        loadImagesToGallery('.image-gallery', data.images);
    }
}

// History Page
function loadHistoryPage(data) {
    if (!data) return;

    const cards = document.querySelectorAll('.content-card');
    if (cards[0] && data.earlyHistory) {
        const paragraphs = cards[0].querySelectorAll('p');
        if (paragraphs.length > 0) {
            paragraphs[0].textContent = data.earlyHistory;
        }
    }

    // Timeline
    if (data.timeline && data.timeline.length > 0) {
        const timelineContainer = document.querySelector('.timeline');
        if (timelineContainer) {
            timelineContainer.innerHTML = data.timeline.map(item => `
                <div class="timeline-item">
                    <div class="timeline-year">${item.year}</div>
                    <p>${item.text}</p>
                </div>
            `).join('');
        }
    }

    // Load images
    if (data.images && data.images.length > 0) {
        loadImagesToGallery('.image-gallery', data.images);
    }
}

// People Page
function loadPeoplePage(data) {
    if (!data) return;

    if (data.sections && data.sections.length > 0) {
        const mainContent = document.querySelector('.page-content');
        if (mainContent) {
            const existingCards = mainContent.querySelectorAll('.content-card');
            existingCards.forEach(card => {
                if (!card.classList.contains('image-gallery')) {
                    card.remove();
                }
            });

            data.sections.forEach(section => {
                const card = document.createElement('div');
                card.className = 'content-card';
                card.innerHTML = `
                    <h2>${section.title}</h2>
                    <p>${section.content}</p>
                `;
                mainContent.insertBefore(card, mainContent.firstChild);
            });
        }
    }

    // Load images
    if (data.images && data.images.length > 0) {
        loadImagesToGallery('.image-gallery', data.images);
    }
}

// Duty Page
function loadDutyPage(data) {
    if (!data) return;

    if (data.sections && data.sections.length > 0) {
        const mainContent = document.querySelector('.page-content');
        if (mainContent) {
            const existingCards = mainContent.querySelectorAll('.content-card');
            existingCards.forEach(card => {
                if (!card.classList.contains('image-gallery')) {
                    card.remove();
                }
            });

            data.sections.forEach(section => {
                const card = document.createElement('div');
                card.className = 'content-card';
                card.innerHTML = `
                    <h2>${section.title}</h2>
                    <p>${section.content}</p>
                `;
                mainContent.insertBefore(card, mainContent.firstChild);
            });
        }
    }

    // Load images
    if (data.images && data.images.length > 0) {
        loadImagesToGallery('.image-gallery', data.images);
    }
}

// Diary Page
function loadDiaryPage(data) {
    if (!data) return;

    if (data.entries && data.entries.length > 0) {
        const mainContent = document.querySelector('.page-content');
        if (mainContent) {
            const existingCards = mainContent.querySelectorAll('.content-card');
            existingCards.forEach(card => {
                if (!card.classList.contains('image-gallery')) {
                    card.remove();
                }
            });

            data.entries.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'content-card';
                card.innerHTML = `
                    <h2>${entry.title}</h2>
                    <p>${entry.content}</p>
                `;
                mainContent.insertBefore(card, mainContent.firstChild);
            });
        }
    }

    // Load images
    if (data.images && data.images.length > 0) {
        loadImagesToGallery('.image-gallery', data.images);
    }
}

// Gallery Page
function loadGalleryPage(data) {
    if (!data) return;

    if (data.images && data.images.length > 0) {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            galleryGrid.innerHTML = data.images.map(img => `
                <div class="gallery-item">
                    <img src="${img.data}" alt="${img.name}" class="gallery-image" loading="lazy">
                </div>
            `).join('');
        }
    }
}

// Thoughts Page
function loadThoughtsPage(data) {
    if (!data) return;

    const cards = document.querySelectorAll('.content-card');
    
    if (data.murphyLaws && data.murphyLaws.length > 0 && cards[0]) {
        const ol = cards[0].querySelector('ol');
        if (ol) {
            ol.innerHTML = data.murphyLaws.map(law => `<li>${law}</li>`).join('');
        }
    }

    if (data.g6Laws && data.g6Laws.length > 0 && cards[1]) {
        const ol = cards[1].querySelector('ol');
        if (ol) {
            ol.innerHTML = data.g6Laws.map(law => `<li>${law}</li>`).join('');
        }
    }

    // Load images
    if (data.images && data.images.length > 0) {
        loadImagesToGallery('.image-gallery', data.images);
    }
}

// Helper Functions
function loadImagesToGallery(selector, images) {
    const gallery = document.querySelector(selector);
    if (!gallery) return;

    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.data;
        imgElement.alt = img.name;
        imgElement.className = 'content-image';
        imgElement.loading = 'lazy';
        
        const item = document.createElement('div');
        item.className = 'image-item';
        item.appendChild(imgElement);
        
        gallery.appendChild(item);
    });
}

function updateSettings(settings) {
    // Update site title
    const siteTitle = document.querySelector('.nav-brand h1');
    if (siteTitle && settings.siteTitle) {
        siteTitle.textContent = settings.siteTitle;
    }

    // Update subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle && settings.siteSubtitle) {
        subtitle.textContent = settings.siteSubtitle;
    }

    // Update contact info
    const contactInfo = document.querySelector('.footer-contact');
    if (contactInfo && settings.contactEmail1 && settings.contactEmail2) {
        contactInfo.textContent = `Contact: ${settings.contactEmail1} | ${settings.contactEmail2}`;
    }
}




