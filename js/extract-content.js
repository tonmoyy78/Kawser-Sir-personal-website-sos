// Extract existing content from HTML pages and load into admin panel
// This script extracts content when admin panel is first opened

function extractExistingContent() {
    // Run all extractions in parallel
    Promise.all([
        extractHomeContent(),
        extractGeographyContent(),
        extractHistoryContent(),
        extractPeopleContent(),
        extractDutyContent(),
        extractDiaryContent(),
        extractThoughtsContent(),
        extractSettings()
    ]).then(results => {
        const successCount = results.filter(r => r === true).length;
        console.log(`Successfully extracted content from ${successCount} pages`);
    }).catch(err => {
        console.error('Error during content extraction:', err);
    });
}

function extractHomeContent() {
    // Get content from index.html if available
    return fetch('index.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const heroTitle = doc.querySelector('.hero-title')?.textContent.trim() || 'Scent of Sahara';
            const heroSubtitle = doc.querySelector('.hero-subtitle')?.textContent.trim() || '';
            const heroDescription = doc.querySelector('.hero-description')?.textContent.trim() || '';
            const welcomeText = doc.querySelector('.intro-section p')?.textContent.trim() || '';
            
            // Extract stats
            const statCards = doc.querySelectorAll('.stat-card');
            const stats = [];
            statCards.forEach(card => {
                const value = card.querySelector('.stat-value')?.textContent.trim() || '';
                const text = card.querySelector('.stat-text')?.textContent.trim() || '';
                if (value && text) {
                    stats.push({ value, label: text });
                }
            });
            
            // Always update with extracted content
            adminData.home = {
                heroTitle,
                heroSubtitle,
                heroDescription,
                welcomeText,
                stats: stats.length > 0 ? stats : adminData.home.stats
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract home content:', err);
            return false;
        });
}

function extractGeographyContent() {
    return fetch('geography.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const cards = doc.querySelectorAll('.content-card');
            let overview = '';
            let topographical = '';
            let districts = '';
            let sahara = '';
            
            // Get overview (first card)
            if (cards[0]) {
                overview = cards[0].querySelector('p')?.textContent.trim() || '';
            }
            
            // Get topographical (second card)
            if (cards[1]) {
                const paragraphs = cards[1].querySelectorAll('p');
                topographical = Array.from(paragraphs).map(p => p.textContent.trim()).join('\n\n');
            }
            
            // Get districts (third card, but skip image gallery)
            if (cards[2] && !cards[2].classList.contains('image-gallery')) {
                districts = cards[2].querySelector('p')?.textContent.trim() || '';
            }
            
            // Get sahara (last content card)
            const contentCards = Array.from(cards).filter(card => !card.classList.contains('image-gallery'));
            if (contentCards[contentCards.length - 1]) {
                sahara = contentCards[contentCards.length - 1].querySelector('p')?.textContent.trim() || '';
            }
            
            // Extract facts
            const factList = doc.querySelector('.fact-box ul');
            let facts = '';
            if (factList) {
                const items = factList.querySelectorAll('li');
                facts = Array.from(items).map(li => li.textContent.trim()).join('\n');
            }
            
            adminData.geography = {
                overview,
                topographical,
                facts,
                districts,
                sahara,
                images: adminData.geography.images || []
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract geography content:', err);
            return false;
        });
}

function extractHistoryContent() {
    return fetch('history.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Get early history (first content card)
            const firstCard = doc.querySelector('.content-card');
            let earlyHistory = '';
            if (firstCard) {
                const paragraphs = firstCard.querySelectorAll('p');
                earlyHistory = Array.from(paragraphs).map(p => p.textContent.trim()).join('\n\n');
            }
            
            // Extract timeline
            const timelineItems = doc.querySelectorAll('.timeline-item');
            const timeline = [];
            timelineItems.forEach(item => {
                const year = item.querySelector('.timeline-year')?.textContent.trim() || '';
                const paragraphs = item.querySelectorAll('p');
                const text = Array.from(paragraphs).map(p => p.textContent.trim()).join('\n\n');
                if (year && text) {
                    timeline.push({ year, text });
                }
            });
            
            adminData.history = {
                earlyHistory,
                timeline: timeline.length > 0 ? timeline : adminData.history.timeline,
                images: adminData.history.images || []
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract history content:', err);
            return false;
        });
}

function extractPeopleContent() {
    return fetch('people-culture.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const cards = doc.querySelectorAll('.content-card');
            const sections = [];
            cards.forEach(card => {
                if (!card.classList.contains('image-gallery')) {
                    const title = card.querySelector('h2')?.textContent.trim() || '';
                    const paragraphs = card.querySelectorAll('p');
                    const content = Array.from(paragraphs).map(p => p.textContent.trim()).join('\n\n');
                    if (title && content) {
                        sections.push({ title, content });
                    }
                }
            });
            
            adminData.people = {
                sections: sections.length > 0 ? sections : adminData.people.sections,
                images: adminData.people.images || []
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract people content:', err);
            return false;
        });
}

function extractDutyContent() {
    return fetch('duty.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const cards = doc.querySelectorAll('.content-card');
            const sections = [];
            cards.forEach(card => {
                if (!card.classList.contains('image-gallery')) {
                    const title = card.querySelector('h2')?.textContent.trim() || '';
                    const paragraphs = card.querySelectorAll('p');
                    const content = Array.from(paragraphs).map(p => p.textContent.trim()).join('\n\n');
                    if (title && content) {
                        sections.push({ title, content });
                    }
                }
            });
            
            adminData.duty = {
                sections: sections.length > 0 ? sections : adminData.duty.sections,
                images: adminData.duty.images || []
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract duty content:', err);
            return false;
        });
}

function extractDiaryContent() {
    return fetch('diary.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const cards = doc.querySelectorAll('.content-card');
            const entries = [];
            cards.forEach(card => {
                if (!card.classList.contains('image-gallery')) {
                    const title = card.querySelector('h2')?.textContent.trim() || '';
                    const content = card.querySelector('p')?.textContent.trim() || '';
                    if (title && content) {
                        entries.push({ title, content });
                    }
                }
            });
            
            adminData.diary = {
                entries: entries.length > 0 ? entries : adminData.diary.entries,
                images: adminData.diary.images || []
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract diary content:', err);
            return false;
        });
}

function extractThoughtsContent() {
    return fetch('thoughts.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const cards = doc.querySelectorAll('.content-card');
            let murphyLaws = [];
            let g6Laws = [];
            
            if (cards[0]) {
                const ol = cards[0].querySelector('ol');
                if (ol) {
                    murphyLaws = Array.from(ol.querySelectorAll('li')).map(li => li.textContent.trim());
                }
            }
            
            if (cards[1]) {
                const ol = cards[1].querySelector('ol');
                if (ol) {
                    g6Laws = Array.from(ol.querySelectorAll('li')).map(li => li.textContent.trim());
                }
            }
            
            adminData.thoughts = {
                murphyLaws: murphyLaws.length > 0 ? murphyLaws : adminData.thoughts.murphyLaws,
                g6Laws: g6Laws.length > 0 ? g6Laws : adminData.thoughts.g6Laws,
                images: adminData.thoughts.images || []
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract thoughts content:', err);
            return false;
        });
}

function extractSettings() {
    return fetch('index.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const siteTitle = doc.querySelector('.nav-brand h1')?.textContent.trim() || 'Scent of Sahara';
            const siteSubtitle = doc.querySelector('.subtitle')?.textContent.trim() || 'Memories of MINURSO';
            const contactText = doc.querySelector('.footer-contact')?.textContent || '';
            
            // Extract emails from contact text
            const emailMatch = contactText.match(/([^\s|]+@[^\s|]+)/g);
            const contactEmail1 = emailMatch ? emailMatch[0] : 'kawser_ahmed2000@yahoo.com';
            const contactEmail2 = emailMatch && emailMatch[1] ? emailMatch[1] : 'kawser_70@hotmail.com';
            
            adminData.settings = {
                siteTitle,
                siteSubtitle,
                contactEmail1,
                contactEmail2
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            return true;
        })
        .catch(err => {
            console.log('Could not extract settings:', err);
            return false;
        });
}

