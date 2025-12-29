// Admin Panel JavaScript

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

// Admin Data Structure
let adminData = {
    home: {
        heroTitle: 'Scent of Sahara',
        heroSubtitle: 'A tribute to the memories of all United Nations Military Observers who served in MINURSO',
        heroDescription: 'This site is dedicated to the sweet memories of all the UNMOs served in MINURSO and specially to the Bad Boys Who All Served in Team Site Bir Lahlou - FAMILIA',
        stats: [
            { value: '285,000', label: 'SQUARE KILOMETERS' },
            { value: '272,211', label: 'POPULATION (1995)' },
            { value: '4', label: 'DISTRICTS' },
            { value: '100+', label: 'PHOTOS' }
        ],
        welcomeText: 'This is a site dedicated to the memories of all the United Nations Military Observers those who served in MINURSO (United Nations Mission for the Referendum for Western Sahara). The site also describes the geography, local population and its culture. This site is resourceful due to a huge collection of photos on Western Sahara.'
    },
    geography: {
        overview: '',
        topographical: '',
        facts: '',
        districts: '',
        sahara: '',
        images: []
    },
    history: {
        earlyHistory: '',
        timeline: [],
        images: []
    },
    people: {
        sections: [],
        images: []
    },
    duty: {
        sections: [],
        images: []
    },
    diary: {
        entries: [],
        images: []
    },
    gallery: {
        images: []
    },
    thoughts: {
        murphyLaws: [],
        g6Laws: [],
        images: []
    },
    settings: {
        siteTitle: 'Scent of Sahara',
        siteSubtitle: 'Memories of MINURSO',
        contactEmail1: 'kawser_ahmed2000@yahoo.com',
        contactEmail2: 'kawser_70@hotmail.com'
    }
};

// Initialize Admin Panel
function initializeAdmin() {
    // Check if logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showDashboard();
    } else {
        showLogin();
    }

    // Load saved data
    loadAdminData();

    // Load extract script for manual import
    const script = document.createElement('script');
    script.src = 'js/extract-content.js';
    script.onload = function() {
        // Auto-load existing content when admin panel opens
        autoLoadExistingContent();
    };
    document.head.appendChild(script);

    // Setup event listeners
    setupEventListeners();
}

// Auto-load existing content from website
function autoLoadExistingContent() {
    const hasContent = localStorage.getItem('adminData');
    const savedData = hasContent ? JSON.parse(hasContent) : null;
    
    // Check if content is already loaded
    const isContentLoaded = savedData && 
        (savedData.geography.overview || savedData.history.earlyHistory || savedData.people.sections.length > 0);
    
    if (!isContentLoaded) {
        // Show loading indicator
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
            loadingIndicator.innerHTML = '<span>⏳ Loading existing content from website...</span>';
        }
        
        // Auto-extract content
        if (typeof extractExistingContent === 'function') {
            extractExistingContent();
            // Reload after extraction
            setTimeout(() => {
                loadAdminData();
                loadExistingImages();
                loadCurrentSectionData();
                
                // Hide loading indicator
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                showAlert('Existing content and images loaded successfully!', 'success');
            }, 3000);
        } else {
            // Hide loading indicator if extraction function not available
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    } else {
        // Load existing images even if content is loaded
        loadExistingImages();
    }
}

// Load existing images from images folder
function loadExistingImages() {
    const imagePaths = {
        geography: [
            'images/geography/ws.jpg',
            'images/geography/ws1.gif',
            'images/geography/Vuesmw1_copy.jpg',
            'images/geography/Vuesmwt1_copy.jpg',
            'images/geography/Mahbasmo_copy.jpg',
            'images/geography/Mountdev_copy.jpg'
        ],
        history: [
            'images/history/Boderpillar.jpg',
            'images/history/man_camel.jpg',
            'images/history/Bentili1.jpg',
            'images/history/bentili2.jpg',
            'images/history/mantea.jpg'
        ],
        people: [
            'images/people-culture/0z020405.jpg',
            'images/people-culture/Saraw2.jpg',
            'images/people-culture/Population_6.jpg',
            'images/people-culture/refugee_camp_layout.jpg',
            'images/people-culture/0y010255.jpg'
        ],
        duty: [
            'images/duty/Lah1.jpg',
            'images/duty/bir_lahlou_from_air.jpg',
            'images/duty/patrolling1.jpg',
            'images/duty/patrollinng.jpg',
            'images/duty/patrolling2.jpg',
            'images/duty/patrolling3.jpg',
            'images/duty/water_party1.jpg',
            'images/duty/excerpts1.jpg'
        ],
        diary: [
            'images/diary/Sunset3_copy.jpg',
            'images/diary/Sunset_1.jpg',
            'images/diary/lan1.jpg',
            'images/diary/lan2.jpg',
            'images/diary/lan3.jpg',
            'images/diary/excerptsdiary.jpg'
        ],
        thoughts: [
            'images/thoughts/Pc170032.jpg',
            'images/thoughts/Pc080098.jpg',
            'images/thoughts/Pb290088.jpg',
            'images/thoughts/P1050141.jpg',
            'images/thoughts/kobita_copy.jpg',
            'images/thoughts/kabita1_copy.jpg',
            'images/thoughts/Shironam.jpg',
            'images/thoughts/SHIRONAM1.jpg'
        ],
        gallery: [
            'images/gallery/Life.jpg',
            'images/gallery/life1.jpg',
            'images/gallery/life2.jpg',
            'images/gallery/life3.jpg',
            'images/gallery/life4.jpg',
            'images/gallery/lifeeun.jpg',
            'images/gallery/eun1.jpg',
            'images/gallery/eun2.jpg',
            'images/gallery/eun3.jpg',
            'images/gallery/eun4.jpg',
            'images/gallery/eun5.jpg',
            'images/gallery/eun6.jpg',
            'images/gallery/eun7.jpg',
            'images/gallery/eun8.jpg',
            'images/gallery/eun9.jpg',
            'images/gallery/eun10.jpg',
            'images/gallery/eun11.jpg',
            'images/gallery/eun12.jpg',
            'images/gallery/eun13.jpg',
            'images/gallery/eun14.jpg',
            'images/gallery/eun15.jpg',
            'images/gallery/eun16.jpg',
            'images/gallery/eun17.jpg',
            'images/gallery/eun18.jpg',
            'images/gallery/eun19.jpg',
            'images/gallery/paris1.jpg',
            'images/gallery/paris2.jpg',
            'images/gallery/paris3.jpg',
            'images/gallery/parisdakar.jpg',
            'images/gallery/atlantic.jpg'
        ]
    };

    // Load images for each section
    Object.keys(imagePaths).forEach(section => {
        if (!adminData[section] || !adminData[section].images || adminData[section].images.length === 0) {
            if (!adminData[section]) {
                adminData[section] = { images: [] };
            }
            
            const images = [];
            let loadedCount = 0;
            const totalImages = imagePaths[section].length;
            
            imagePaths[section].forEach((path, index) => {
                // Use path directly instead of converting to base64 for better performance
                const imageData = {
                    name: path.split('/').pop(),
                    data: path, // Use path directly
                    id: Date.now() + Math.random() + index,
                    path: path
                };
                
                images.push(imageData);
                loadedCount++;
                
                // Update admin data when all images are processed
                if (loadedCount === totalImages) {
                    adminData[section].images = images;
                    localStorage.setItem('adminData', JSON.stringify(adminData));
                    
                    // Update display if current section
                    const activeSection = document.querySelector('.nav-item.active');
                    if (activeSection && activeSection.getAttribute('data-section') === section) {
                        const listId = section === 'geography' ? 'geoImagesList' :
                                      section === 'history' ? 'histImagesList' :
                                      section === 'people' ? 'peopleImagesList' :
                                      section === 'duty' ? 'dutyImagesList' :
                                      section === 'diary' ? 'diaryImagesList' :
                                      section === 'thoughts' ? 'thoughtsImagesList' :
                                      section === 'gallery' ? 'galleryImagesList' : '';
                        if (listId) {
                            displayImages(listId, images);
                        }
                    }
                }
            });
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            switchSection(section);
        });
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveAllData);

    // Preview button
    document.getElementById('previewBtn').addEventListener('click', () => {
        window.open('index.html', '_blank');
    });

    // Image uploads
    setupImageUploads();

    // Add buttons
    document.getElementById('addTimelineItem').addEventListener('click', addTimelineItem);
    document.getElementById('addPeopleSection').addEventListener('click', addPeopleSection);
    document.getElementById('addDutySection').addEventListener('click', addDutySection);
    document.getElementById('addDiaryEntry').addEventListener('click', addDiaryEntry);
    document.getElementById('addMurphyLaw').addEventListener('click', () => addLaw('murphy'));
    document.getElementById('addG6Law').addEventListener('click', () => addLaw('g6'));

    // Settings
    document.getElementById('changePasswordBtn').addEventListener('click', changePassword);
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importDataFile').click();
    });
    document.getElementById('importDataFile').addEventListener('change', importData);
    document.getElementById('resetDataBtn').addEventListener('click', resetData);
    document.getElementById('importExistingBtn').addEventListener('click', importExistingContent);

    // Load current section data
    loadCurrentSectionData();
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const savedPassword = localStorage.getItem('adminPassword') || 'admin123';
    const defaultUsername = 'admin';

    if (username === defaultUsername && password === savedPassword) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
    } else {
        alert('Invalid username or password!');
    }
}

function handleLogout() {
    localStorage.setItem('adminLoggedIn', 'false');
    showLogin();
}

function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
}

// Section Switching
function switchSection(section) {
    // Show loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
        loadingIndicator.innerHTML = '<span>⏳ Loading...</span>';
    }
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    // Update content
    document.querySelectorAll('.editor-section').forEach(sec => {
        sec.classList.remove('active');
    });

    const sectionMap = {
        'home': 'homeEditor',
        'geography': 'geographyEditor',
        'history': 'historyEditor',
        'people': 'peopleEditor',
        'duty': 'dutyEditor',
        'diary': 'diaryEditor',
        'gallery': 'galleryEditor',
        'thoughts': 'thoughtsEditor',
        'settings': 'settingsEditor'
    };

    const editorId = sectionMap[section];
    if (editorId) {
        document.getElementById(editorId).classList.add('active');
    }

    // Update page title
    const titles = {
        'home': 'Home Page Editor',
        'geography': 'Geography Editor',
        'history': 'History Editor',
        'people': 'People & Culture Editor',
        'duty': 'My Duty Editor',
        'diary': 'Diary Editor',
        'gallery': 'Photo Gallery Editor',
        'thoughts': 'My Thoughts Editor',
        'settings': 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[section] || 'Editor';

    // Load section data
    setTimeout(() => {
        loadSectionData(section);
        // Hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }, 100);
}

// Load Data
function loadAdminData() {
    const saved = localStorage.getItem('adminData');
    if (saved) {
        adminData = JSON.parse(saved);
    }
}

function loadCurrentSectionData() {
    const activeSection = document.querySelector('.nav-item.active');
    if (activeSection) {
        const section = activeSection.getAttribute('data-section');
        loadSectionData(section);
    }
}

function loadSectionData(section) {
    switch(section) {
        case 'home':
            loadHomeData();
            break;
        case 'geography':
            loadGeographyData();
            break;
        case 'history':
            loadHistoryData();
            break;
        case 'people':
            loadPeopleData();
            break;
        case 'duty':
            loadDutyData();
            break;
        case 'diary':
            loadDiaryData();
            break;
        case 'gallery':
            loadGalleryData();
            break;
        case 'thoughts':
            loadThoughtsData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

function loadHomeData() {
    const data = adminData.home;
    document.getElementById('heroTitle').value = data.heroTitle || '';
    document.getElementById('heroSubtitle').value = data.heroSubtitle || '';
    document.getElementById('heroDescription').value = data.heroDescription || '';
    document.getElementById('welcomeText').value = data.welcomeText || '';
    
    if (data.stats && data.stats.length >= 4) {
        document.getElementById('stat1Value').value = data.stats[0].value || '';
        document.getElementById('stat1Label').value = data.stats[0].label || '';
        document.getElementById('stat2Value').value = data.stats[1].value || '';
        document.getElementById('stat2Label').value = data.stats[1].label || '';
        document.getElementById('stat3Value').value = data.stats[2].value || '';
        document.getElementById('stat3Label').value = data.stats[2].label || '';
        document.getElementById('stat4Value').value = data.stats[3].value || '';
        document.getElementById('stat4Label').value = data.stats[3].label || '';
    }
}

function loadGeographyData() {
    const data = adminData.geography;
    document.getElementById('geoOverview').value = data.overview || '';
    document.getElementById('geoTopo').value = data.topographical || '';
    document.getElementById('geoFacts').value = data.facts || '';
    document.getElementById('geoDistricts').value = data.districts || '';
    document.getElementById('geoSahara').value = data.sahara || '';
    
    // Load images - try to load from existing images if not in adminData
    if (!data.images || data.images.length === 0) {
        loadExistingImages();
    }
    displayImages('geoImagesList', data.images || []);
}

function loadHistoryData() {
    const data = adminData.history;
    document.getElementById('histEarly').value = data.earlyHistory || '';
    displayTimeline(data.timeline || []);
    
    // Load images - try to load from existing images if not in adminData
    if (!data.images || data.images.length === 0) {
        loadExistingImages();
    }
    displayImages('histImagesList', data.images || []);
}

function loadPeopleData() {
    const data = adminData.people;
    displaySections('peopleSections', data.sections || []);
    
    // Load images - try to load from existing images if not in adminData
    if (!data.images || data.images.length === 0) {
        loadExistingImages();
    }
    displayImages('peopleImagesList', data.images || []);
}

function loadDutyData() {
    const data = adminData.duty;
    displaySections('dutySections', data.sections || []);
    
    // Load images - try to load from existing images if not in adminData
    if (!data.images || data.images.length === 0) {
        loadExistingImages();
    }
    displayImages('dutyImagesList', data.images || []);
}

function loadDiaryData() {
    const data = adminData.diary;
    displayEntries(data.entries || []);
    
    // Load images - try to load from existing images if not in adminData
    if (!data.images || data.images.length === 0) {
        loadExistingImages();
    }
    displayImages('diaryImagesList', data.images || []);
}

function loadGalleryData() {
    const data = adminData.gallery;
    
    // Load images - try to load from existing images if not in adminData
    if (!data.images || data.images.length === 0) {
        loadExistingImages();
    }
    displayImages('galleryImagesList', data.images || []);
}

function loadThoughtsData() {
    const data = adminData.thoughts;
    displayLaws('murphyLaws', data.murphyLaws || []);
    displayLaws('g6Laws', data.g6Laws || []);
    
    // Load images - try to load from existing images if not in adminData
    if (!data.images || data.images.length === 0) {
        loadExistingImages();
    }
    displayImages('thoughtsImagesList', data.images || []);
}

function loadSettingsData() {
    const data = adminData.settings;
    document.getElementById('siteTitle').value = data.siteTitle || '';
    document.getElementById('siteSubtitle').value = data.siteSubtitle || '';
    document.getElementById('contactEmail1').value = data.contactEmail1 || '';
    document.getElementById('contactEmail2').value = data.contactEmail2 || '';
}

// Save Data
function saveAllData() {
    // Save current section
    const activeSection = document.querySelector('.nav-item.active');
    if (activeSection) {
        const section = activeSection.getAttribute('data-section');
        saveSectionData(section);
    }

    // Save to localStorage
    localStorage.setItem('adminData', JSON.stringify(adminData));
    
    // Show success message
    showAlert('Data saved successfully!', 'success');
    
    // Update main website
    updateMainWebsite();
}

function saveSectionData(section) {
    switch(section) {
        case 'home':
            saveHomeData();
            break;
        case 'geography':
            saveGeographyData();
            break;
        case 'history':
            saveHistoryData();
            break;
        case 'people':
            savePeopleData();
            break;
        case 'duty':
            saveDutyData();
            break;
        case 'diary':
            saveDiaryData();
            break;
        case 'gallery':
            saveGalleryData();
            break;
        case 'thoughts':
            saveThoughtsData();
            break;
        case 'settings':
            saveSettingsData();
            break;
    }
}

function saveHomeData() {
    adminData.home = {
        heroTitle: document.getElementById('heroTitle').value,
        heroSubtitle: document.getElementById('heroSubtitle').value,
        heroDescription: document.getElementById('heroDescription').value,
        welcomeText: document.getElementById('welcomeText').value,
        stats: [
            {
                value: document.getElementById('stat1Value').value,
                label: document.getElementById('stat1Label').value
            },
            {
                value: document.getElementById('stat2Value').value,
                label: document.getElementById('stat2Label').value
            },
            {
                value: document.getElementById('stat3Value').value,
                label: document.getElementById('stat3Label').value
            },
            {
                value: document.getElementById('stat4Value').value,
                label: document.getElementById('stat4Label').value
            }
        ]
    };
}

function saveGeographyData() {
    adminData.geography = {
        ...adminData.geography,
        overview: document.getElementById('geoOverview').value,
        topographical: document.getElementById('geoTopo').value,
        facts: document.getElementById('geoFacts').value,
        districts: document.getElementById('geoDistricts').value,
        sahara: document.getElementById('geoSahara').value
    };
}

function saveHistoryData() {
    adminData.history = {
        ...adminData.history,
        earlyHistory: document.getElementById('histEarly').value,
        timeline: getTimelineData()
    };
}

function savePeopleData() {
    adminData.people = {
        ...adminData.people,
        sections: getSectionsData('peopleSections')
    };
}

function saveDutyData() {
    adminData.duty = {
        ...adminData.duty,
        sections: getSectionsData('dutySections')
    };
}

function saveDiaryData() {
    adminData.diary = {
        ...adminData.diary,
        entries: getEntriesData()
    };
}

function saveGalleryData() {
    // Images are saved automatically when uploaded
}

function saveThoughtsData() {
    adminData.thoughts = {
        ...adminData.thoughts,
        murphyLaws: getLawsData('murphyLaws'),
        g6Laws: getLawsData('g6Laws')
    };
}

function saveSettingsData() {
    adminData.settings = {
        siteTitle: document.getElementById('siteTitle').value,
        siteSubtitle: document.getElementById('siteSubtitle').value,
        contactEmail1: document.getElementById('contactEmail1').value,
        contactEmail2: document.getElementById('contactEmail2').value
    };
}

// Image Upload
function setupImageUploads() {
    const uploadInputs = [
        'geoImageUpload', 'histImageUpload', 'peopleImageUpload',
        'dutyImageUpload', 'diaryImageUpload', 'galleryImageUpload',
        'thoughtsImageUpload'
    ];

    uploadInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('change', (e) => {
                handleImageUpload(e, inputId);
            });
        }
    });
}

function handleImageUpload(e, inputId) {
    const files = Array.from(e.target.files);
    const sectionMap = {
        'geoImageUpload': 'geography',
        'histImageUpload': 'history',
        'peopleImageUpload': 'people',
        'dutyImageUpload': 'duty',
        'diaryImageUpload': 'diary',
        'galleryImageUpload': 'gallery',
        'thoughtsImageUpload': 'thoughts'
    };

    const section = sectionMap[inputId];
    const listId = inputId.replace('Upload', 'sList');

    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = {
                    name: file.name,
                    data: event.target.result,
                    id: Date.now() + Math.random()
                };

                if (!adminData[section].images) {
                    adminData[section].images = [];
                }
                adminData[section].images.push(imageData);
                
                displayImages(listId, adminData[section].images);
                localStorage.setItem('adminData', JSON.stringify(adminData));
            };
            reader.readAsDataURL(file);
        }
    });
}

function displayImages(listId, images) {
    const list = document.getElementById(listId);
    if (!list) return;

    list.innerHTML = '';
    
    if (!images || images.length === 0) {
        list.innerHTML = '<p style="color: #999; padding: 2rem; text-align: center;">No images yet. Upload images to get started.</p>';
        return;
    }
    
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'image-item-admin';
        // Use path if data is a path, otherwise use data (base64)
        const imageSrc = (img.data && img.data.startsWith('images/')) ? img.data : 
                        (img.path || img.data || '');
        const imageName = img.name || img.path?.split('/').pop() || 'Image';
        item.innerHTML = `
            <img src="${imageSrc}" alt="${imageName}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23ddd\' width=\'200\' height=\'200\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'14\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\'%3EImage%3C/text%3E%3C/svg%3E'">
            <div class="image-actions">
                <span class="image-name" title="${imageName}">${imageName}</span>
                <button class="btn-delete" onclick="deleteImage('${img.id}', '${listId}')">🗑️ Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function deleteImage(imageId, listId) {
    const sectionMap = {
        'geoImagesList': 'geography',
        'histImagesList': 'history',
        'peopleImagesList': 'people',
        'dutyImagesList': 'duty',
        'diaryImagesList': 'diary',
        'galleryImagesList': 'gallery',
        'thoughtsImagesList': 'thoughts'
    };

    const section = sectionMap[listId];
    if (adminData[section] && adminData[section].images) {
        adminData[section].images = adminData[section].images.filter(img => img.id != imageId);
        displayImages(listId, adminData[section].images);
        localStorage.setItem('adminData', JSON.stringify(adminData));
    }
}

// Timeline Functions
function displayTimeline(timeline) {
    const container = document.getElementById('timelineItems');
    container.innerHTML = '';
    timeline.forEach((item, index) => {
        addTimelineItemElement(item, index);
    });
}

function addTimelineItem() {
    const item = { year: '', text: '' };
    adminData.history.timeline = adminData.history.timeline || [];
    adminData.history.timeline.push(item);
    addTimelineItemElement(item, adminData.history.timeline.length - 1);
}

function addTimelineItemElement(item, index) {
    const container = document.getElementById('timelineItems');
    const div = document.createElement('div');
    div.className = 'timeline-item-editor';
    div.innerHTML = `
        <div class="form-group">
            <label>Year</label>
            <input type="text" class="timeline-year" data-index="${index}" value="${item.year || ''}" placeholder="1991">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="timeline-text" data-index="${index}" rows="3" placeholder="Description...">${item.text || ''}</textarea>
        </div>
        <button type="button" class="btn-delete" onclick="removeTimelineItem(${index})">Delete</button>
    `;
    container.appendChild(div);
}

function removeTimelineItem(index) {
    adminData.history.timeline.splice(index, 1);
    displayTimeline(adminData.history.timeline);
}

function getTimelineData() {
    const items = [];
    document.querySelectorAll('.timeline-item-editor').forEach((item, index) => {
        const year = item.querySelector('.timeline-year').value;
        const text = item.querySelector('.timeline-text').value;
        items.push({ year, text });
    });
    return items;
}

// Sections Functions
function displaySections(containerId, sections) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    sections.forEach((section, index) => {
        addSectionElement(containerId, section, index);
    });
}

function addPeopleSection() {
    adminData.people.sections = adminData.people.sections || [];
    adminData.people.sections.push({ title: '', content: '' });
    addSectionElement('peopleSections', adminData.people.sections[adminData.people.sections.length - 1], adminData.people.sections.length - 1);
}

function addDutySection() {
    adminData.duty.sections = adminData.duty.sections || [];
    adminData.duty.sections.push({ title: '', content: '' });
    addSectionElement('dutySections', adminData.duty.sections[adminData.duty.sections.length - 1], adminData.duty.sections.length - 1);
}

function addSectionElement(containerId, section, index) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'section-item-editor';
    const sectionType = containerId.replace('Sections', '');
    div.innerHTML = `
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="section-title" data-index="${index}" value="${section.title || ''}" placeholder="Section Title">
        </div>
        <div class="form-group">
            <label>Content</label>
            <textarea class="section-content" data-index="${index}" rows="5" placeholder="Content...">${section.content || ''}</textarea>
        </div>
        <button type="button" class="btn-delete" onclick="removeSection('${containerId}', ${index})">Delete</button>
    `;
    container.appendChild(div);
}

function removeSection(containerId, index) {
    const sectionType = containerId.replace('Sections', '');
    adminData[sectionType].sections.splice(index, 1);
    displaySections(containerId, adminData[sectionType].sections);
}

function getSectionsData(containerId) {
    const sections = [];
    document.querySelectorAll(`#${containerId} .section-item-editor`).forEach((item, index) => {
        const title = item.querySelector('.section-title').value;
        const content = item.querySelector('.section-content').value;
        sections.push({ title, content });
    });
    return sections;
}

// Diary Functions
function displayEntries(entries) {
    const container = document.getElementById('diaryEntries');
    container.innerHTML = '';
    entries.forEach((entry, index) => {
        addEntryElement(entry, index);
    });
}

function addDiaryEntry() {
    adminData.diary.entries = adminData.diary.entries || [];
    adminData.diary.entries.push({ title: '', content: '' });
    addEntryElement(adminData.diary.entries[adminData.diary.entries.length - 1], adminData.diary.entries.length - 1);
}

function addEntryElement(entry, index) {
    const container = document.getElementById('diaryEntries');
    const div = document.createElement('div');
    div.className = 'entry-item-editor';
    div.innerHTML = `
        <div class="form-group">
            <label>Entry Title</label>
            <input type="text" class="entry-title" data-index="${index}" value="${entry.title || ''}" placeholder="Entry Title">
        </div>
        <div class="form-group">
            <label>Content</label>
            <textarea class="entry-content" data-index="${index}" rows="6" placeholder="Diary content...">${entry.content || ''}</textarea>
        </div>
        <button type="button" class="btn-delete" onclick="removeDiaryEntry(${index})">Delete</button>
    `;
    container.appendChild(div);
}

function removeDiaryEntry(index) {
    adminData.diary.entries.splice(index, 1);
    displayEntries(adminData.diary.entries);
}

function getEntriesData() {
    const entries = [];
    document.querySelectorAll('.entry-item-editor').forEach((item, index) => {
        const title = item.querySelector('.entry-title').value;
        const content = item.querySelector('.entry-content').value;
        entries.push({ title, content });
    });
    return entries;
}

// Laws Functions
function displayLaws(containerId, laws) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    laws.forEach((law, index) => {
        addLawElement(containerId, law, index);
    });
}

function addLaw(type) {
    const containerId = type === 'murphy' ? 'murphyLaws' : 'g6Laws';
    const lawType = type === 'murphy' ? 'murphyLaws' : 'g6Laws';
    
    adminData.thoughts[lawType] = adminData.thoughts[lawType] || [];
    adminData.thoughts[lawType].push('');
    addLawElement(containerId, '', adminData.thoughts[lawType].length - 1);
}

function addLawElement(containerId, law, index) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'law-item-editor';
    div.innerHTML = `
        <input type="text" class="law-text" data-index="${index}" value="${law || ''}" placeholder="Enter law...">
        <button type="button" class="btn-delete" onclick="removeLaw('${containerId}', ${index})">Delete</button>
    `;
    container.appendChild(div);
}

function removeLaw(containerId, index) {
    const lawType = containerId === 'murphyLaws' ? 'murphyLaws' : 'g6Laws';
    adminData.thoughts[lawType].splice(index, 1);
    displayLaws(containerId, adminData.thoughts[lawType]);
}

function getLawsData(containerId) {
    const laws = [];
    document.querySelectorAll(`#${containerId} .law-text`).forEach(input => {
        laws.push(input.value);
    });
    return laws;
}

// Settings Functions
function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        showAlert('Passwords do not match!', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showAlert('Password must be at least 6 characters!', 'error');
        return;
    }

    localStorage.setItem('adminPassword', newPassword);
    showAlert('Password changed successfully!', 'success');
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function exportData() {
    const dataStr = JSON.stringify(adminData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scent-of-sahara-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    showAlert('Data exported successfully!', 'success');
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            adminData = imported;
            localStorage.setItem('adminData', JSON.stringify(adminData));
            loadCurrentSectionData();
            showAlert('Data imported successfully!', 'success');
        } catch (error) {
            showAlert('Error importing data!', 'error');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

function resetData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone!')) {
        localStorage.removeItem('adminData');
        location.reload();
    }
}

function importExistingContent() {
    if (confirm('This will extract all content and images from your website pages and load them into the admin panel. Continue?')) {
        showAlert('Extracting content from website...', 'success');
        
        // Wait for extract script to load
        setTimeout(() => {
            if (typeof extractExistingContent === 'function') {
                extractExistingContent();
                showAlert('Content extraction started. Please wait...', 'success');
                
                // Reload data after extraction
                setTimeout(() => {
                    loadAdminData();
                    loadExistingImages();
                    loadCurrentSectionData();
                    showAlert('Existing content and images loaded successfully! You can now edit everything.', 'success');
                }, 3000);
            } else {
                showAlert('Extraction script not loaded. Please refresh the page.', 'error');
            }
        }, 500);
    }
}

// Update Main Website
function updateMainWebsite() {
    // This will be called by the main website pages to load admin data
    // The main pages need to check localStorage for 'adminData'
}

// Utility Functions
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success' : 'error'}`;
    alert.textContent = message;
    
    const content = document.querySelector('.admin-content');
    content.insertBefore(alert, content.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Make functions globally available
window.deleteImage = deleteImage;
window.removeTimelineItem = removeTimelineItem;
window.removeSection = removeSection;
window.removeDiaryEntry = removeDiaryEntry;
window.removeLaw = removeLaw;


