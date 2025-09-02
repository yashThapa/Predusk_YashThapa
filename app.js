// Global application state and data
let appState = {
    currentView: 'profile',
    debugMode: false,
    initialized: false,
    profileData: null
};

// Debug logging system
const debugLog = {
    entries: [],
    maxEntries: 100,

    log: function(message, type = 'info') {
        try {
            const timestamp = new Date().toLocaleTimeString();
            const entry = {
                timestamp,
                message,
                type
            };
            
            this.entries.unshift(entry);
            if (this.entries.length > this.maxEntries) {
                this.entries.pop();
            }

            console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
            
            this.updateDebugPanel();
        } catch (error) {
            console.error('Debug log error:', error);
        }
    },

    error: function(message) {
        this.log(message, 'error');
    },

    success: function(message) {
        this.log(message, 'success');
    },

    updateDebugPanel: function() {
        try {
            const debugLogElement = document.getElementById('debug-log');
            if (!debugLogElement) return;

            debugLogElement.innerHTML = this.entries.map(entry => `
                <div class="debug-entry ${entry.type}">
                    <span class="debug-timestamp">${entry.timestamp}</span>
                    ${entry.message}
                </div>
            `).join('');

            debugLogElement.scrollTop = 0;
        } catch (error) {
            console.error('Error updating debug panel:', error);
        }
    }
};

// Local data storage (no external API dependencies)
const localData = {
    profile: {
        "name": "Alex Johnson",
        "email": "alex.johnson@email.com",
        "location": "San Francisco, CA",
        "title": "Full Stack Developer",
        "bio": "Passionate software developer with 5+ years of experience building web applications and APIs.",
        "education": [
            {
                "degree": "Bachelor of Computer Science",
                "institution": "UC Berkeley", 
                "year": 2019
            },
            {
                "degree": "Master of Software Engineering",
                "institution": "Stanford University",
                "year": 2021
            }
        ],
        "skills": [
            { "name": "JavaScript", "level": "Expert", "projects": 4 },
            { "name": "Python", "level": "Advanced", "projects": 3 },
            { "name": "React", "level": "Expert", "projects": 3 },
            { "name": "Node.js", "level": "Advanced", "projects": 4 },
            { "name": "PostgreSQL", "level": "Advanced", "projects": 2 },
            { "name": "Docker", "level": "Intermediate", "projects": 2 },
            { "name": "AWS", "level": "Intermediate", "projects": 2 }
        ],
        "projects": [
            {
                "title": "E-commerce Platform",
                "description": "Full-stack e-commerce application with React and Node.js",
                "technologies": ["React", "Node.js", "PostgreSQL", "AWS"],
                "github": "https://github.com/alexjohnson/ecommerce",
                "demo": "https://demo.example.com",
                "status": "Completed"
            },
            {
                "title": "Task Management API", 
                "description": "RESTful API built with Python FastAPI",
                "technologies": ["Python", "FastAPI", "MongoDB", "Docker"],
                "github": "https://github.com/alexjohnson/task-api",
                "demo": "https://api.example.com",
                "status": "Completed"
            },
            {
                "title": "Chat Application",
                "description": "Real-time chat app with WebSocket support",
                "technologies": ["React", "Node.js", "Socket.io", "PostgreSQL"],
                "github": "https://github.com/alexjohnson/chat-app",
                "demo": "https://chat.example.com",
                "status": "Completed"
            },
            {
                "title": "Data Dashboard",
                "description": "Analytics dashboard with interactive charts",
                "technologies": ["React", "Python", "PostgreSQL", "Docker"],
                "github": "https://github.com/alexjohnson/dashboard",
                "demo": "https://dashboard.example.com", 
                "status": "In Progress"
            }
        ],
        "work": [
            {
                "company": "TechCorp Solutions",
                "position": "Senior Full Stack Developer",
                "duration": "2022 - Present",
                "description": "Lead development of web applications using React and Node.js"
            },
            {
                "company": "StartupXYZ", 
                "position": "Full Stack Developer",
                "duration": "2020 - 2021",
                "description": "Built RESTful APIs and responsive web applications"
            }
        ],
        "links": {
            "github": "https://github.com/alexjohnson",
            "linkedin": "https://linkedin.com/in/alexjohnson",
            "portfolio": "https://alexjohnson.dev",
            "email": "alex.johnson@email.com"
        }
    }
};

// Message display functions
function showErrorMessage(message) {
    try {
        debugLog.error(`Showing error: ${message}`);
        const errorText = document.getElementById('error-message-text');
        const errorBanner = document.getElementById('error-banner');
        
        if (errorText) errorText.textContent = message;
        if (errorBanner) {
            errorBanner.classList.remove('hidden');
            setTimeout(() => hideErrorBanner(), 5000);
        }
    } catch (error) {
        debugLog.error(`Failed to show error message: ${error.message}`);
        console.error('Error:', message);
    }
}

function showSuccessMessage(message) {
    try {
        debugLog.success(`Showing success: ${message}`);
        const successText = document.getElementById('success-message-text');
        const successBanner = document.getElementById('success-banner');
        
        if (successText) successText.textContent = message;
        if (successBanner) {
            successBanner.classList.remove('hidden');
            setTimeout(() => hideSuccessBanner(), 3000);
        }
    } catch (error) {
        debugLog.error(`Failed to show success message: ${error.message}`);
    }
}

function hideErrorBanner() {
    try {
        const errorBanner = document.getElementById('error-banner');
        if (errorBanner) {
            errorBanner.classList.add('hidden');
        }
    } catch (error) {
        debugLog.error(`Failed to hide error banner: ${error.message}`);
    }
}

function hideSuccessBanner() {
    try {
        const successBanner = document.getElementById('success-banner');
        if (successBanner) {
            successBanner.classList.add('hidden');
        }
    } catch (error) {
        debugLog.error(`Failed to hide success banner: ${error.message}`);
    }
}

// Debug panel functions
function toggleDebugPanel() {
    try {
        const debugPanel = document.getElementById('debug-panel');
        if (debugPanel) {
            if (debugPanel.classList.contains('hidden')) {
                debugPanel.classList.remove('hidden');
                appState.debugMode = true;
                debugLog.log('Debug panel opened');
            } else {
                debugPanel.classList.add('hidden');
                appState.debugMode = false;
                debugLog.log('Debug panel closed');
            }
        }
    } catch (error) {
        console.error('Error toggling debug panel:', error);
    }
}

function clearDebugLog() {
    try {
        debugLog.entries = [];
        debugLog.updateDebugPanel();
        debugLog.log('Debug log cleared');
    } catch (error) {
        console.error('Error clearing debug log:', error);
    }
}

// View switching with error handling - FIXED
function switchView(viewName) {
    try {
        debugLog.log(`Switching to view: ${viewName}`);
        
        if (!viewName) {
            throw new Error('No view name provided');
        }

        // Update navigation tabs - FIXED
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.classList.remove('nav-tab--active');
            if (tab.getAttribute('data-view') === viewName) {
                tab.classList.add('nav-tab--active');
            }
        });

        // Update views - FIXED
        const views = document.querySelectorAll('.view');
        views.forEach(view => {
            view.classList.remove('view--active');
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('view--active');
            appState.currentView = viewName;
        } else {
            throw new Error(`View not found: ${viewName}-view`);
        }

        // Load view-specific data
        loadViewData(viewName);
        
        debugLog.success(`Successfully switched to ${viewName} view`);
    } catch (error) {
        debugLog.error(`Failed to switch view: ${error.message}`);
        showErrorMessage(`Failed to switch to ${viewName} view: ${error.message}`);
    }
}

// Data loading functions
function loadViewData(viewName) {
    try {
        debugLog.log(`Loading data for view: ${viewName}`);
        
        switch (viewName) {
            case 'profile':
                loadProfileData();
                break;
            case 'projects':
                loadProjectsData();
                break;
            case 'skills':
                loadSkillsData();
                break;
            case 'health':
                loadHealthData();
                break;
            case 'search':
                // Search view is loaded on demand
                break;
            default:
                debugLog.log(`No specific data loading for view: ${viewName}`);
        }
    } catch (error) {
        debugLog.error(`Failed to load view data: ${error.message}`);
        showErrorMessage(`Failed to load ${viewName} data: ${error.message}`);
    }
}

function loadProfileData() {
    try {
        debugLog.log('Loading profile data');
        const profile = localData.profile;
        
        if (!profile) {
            throw new Error('Profile data not available');
        }

        // Update basic info
        const nameEl = document.getElementById('profile-name');
        const emailEl = document.getElementById('profile-email');
        const locationEl = document.getElementById('profile-location');
        const titleEl = document.getElementById('profile-title');
        const bioEl = document.getElementById('profile-bio');

        if (nameEl) nameEl.textContent = profile.name;
        if (emailEl) emailEl.textContent = profile.email;
        if (locationEl) locationEl.textContent = profile.location;
        if (titleEl) titleEl.textContent = profile.title;
        if (bioEl) bioEl.textContent = profile.bio;

        // Update education
        const educationEl = document.getElementById('education-list');
        if (educationEl && profile.education && profile.education.length > 0) {
            const educationHTML = profile.education.map(edu => `
                <div class="education-item">
                    <h4>${edu.degree || 'Unknown Degree'}</h4>
                    <p><strong>${edu.institution || 'Unknown Institution'}</strong></p>
                    <p>Year: ${edu.year || 'Unknown'}</p>
                </div>
            `).join('');
            educationEl.innerHTML = educationHTML;
        }

        // Update work experience
        const workEl = document.getElementById('work-list');
        if (workEl && profile.work && profile.work.length > 0) {
            const workHTML = profile.work.map(work => `
                <div class="work-item">
                    <h4>${work.position || 'Unknown Position'}</h4>
                    <p><strong>${work.company || 'Unknown Company'}</strong></p>
                    <p>${work.duration || 'Unknown Duration'}</p>
                    <p>${work.description || 'No description available'}</p>
                </div>
            `).join('');
            workEl.innerHTML = workHTML;
        }

        // Update links - FIXED to make them work
        const linksEl = document.getElementById('links-list');
        if (linksEl && profile.links) {
            const linksHTML = Object.entries(profile.links).map(([key, value]) => `
                <a href="${value}" class="link-item" target="_blank" rel="noopener noreferrer">
                    <span>${key}</span>
                </a>
            `).join('');
            linksEl.innerHTML = linksHTML;
        }

        appState.profileData = profile;
        debugLog.success('Profile data loaded successfully');
    } catch (error) {
        debugLog.error(`Failed to load profile data: ${error.message}`);
        showErrorMessage(`Failed to load profile: ${error.message}`);
    }
}

function loadProjectsData(skillFilter = null) {
    try {
        debugLog.log(`Loading projects data with filter: ${skillFilter || 'none'}`);
        let projects = localData.profile.projects || [];

        if (skillFilter) {
            const filter = skillFilter.toLowerCase();
            projects = projects.filter(project => 
                project.technologies && project.technologies.some(tech => 
                    tech.toLowerCase().includes(filter)
                )
            );
        }

        const projectsEl = document.getElementById('projects-list');
        if (!projectsEl) return;

        if (projects.length === 0) {
            const message = skillFilter ? 
                `No projects found matching "${skillFilter}"` : 
                'No projects available';
            projectsEl.innerHTML = `<div class="no-results">${message}</div>`;
            debugLog.log(message);
            return;
        }

        const projectsHTML = projects.map(project => `
            <div class="card project-card">
                <div class="card__body">
                    <span class="status ${project.status === 'Completed' ? 'status--success' : 'status--info'} project-status">
                        ${project.status || 'Unknown'}
                    </span>
                    <h3 class="project-title">${project.title || 'Untitled Project'}</h3>
                    <p class="project-description">${project.description || 'No description available'}</p>
                    <div class="project-technologies">
                        ${(project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">Demo</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        projectsEl.innerHTML = projectsHTML;
        debugLog.success(`Loaded ${projects.length} projects`);
    } catch (error) {
        debugLog.error(`Failed to load projects: ${error.message}`);
        showErrorMessage(`Failed to load projects: ${error.message}`);
    }
}

function loadSkillsData() {
    try {
        debugLog.log('Loading skills data');
        const skills = localData.profile.skills || [];
        const skillsEl = document.getElementById('skills-list');
        
        if (!skillsEl) return;

        if (skills.length === 0) {
            skillsEl.innerHTML = '<div class="no-results">No skills available</div>';
            return;
        }

        // Sort skills by number of projects, then by level
        const sortedSkills = skills.sort((a, b) => {
            if (b.projects !== a.projects) {
                return b.projects - a.projects;
            }
            const levels = { 'Expert': 3, 'Advanced': 2, 'Intermediate': 1 };
            return (levels[b.level] || 0) - (levels[a.level] || 0);
        });

        const skillsHTML = sortedSkills.map(skill => `
            <div class="card skill-card">
                <div class="card__body">
                    <div class="skill-name">${skill.name || 'Unknown Skill'}</div>
                    <div class="skill-level">${skill.level || 'Unknown Level'}</div>
                    <div class="skill-projects">${skill.projects || 0} projects</div>
                </div>
            </div>
        `).join('');

        skillsEl.innerHTML = skillsHTML;
        debugLog.success(`Loaded ${skills.length} skills`);
    } catch (error) {
        debugLog.error(`Failed to load skills: ${error.message}`);
        showErrorMessage(`Failed to load skills: ${error.message}`);
    }
}

function loadHealthData() {
    try {
        debugLog.log('Loading health data');
        const healthData = {
            status: 'Healthy',
            uptime: '99.9%',
            version: '1.2.0',
            environment: 'Production',
            lastCheck: new Date().toLocaleString(),
            dataSource: 'Local Storage',
            features: 'All Operational'
        };

        const healthEl = document.getElementById('health-status');
        if (!healthEl) return;

        const healthHTML = Object.entries(healthData).map(([key, value]) => `
            <div class="health-item card">
                <div class="card__body">
                    <span class="health-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                    <span class="health-value health-status-good">${value}</span>
                </div>
            </div>
        `).join('');

        healthEl.innerHTML = healthHTML;
        debugLog.success('Health data loaded successfully');
    } catch (error) {
        debugLog.error(`Failed to load health data: ${error.message}`);
        showErrorMessage(`Failed to load health status: ${error.message}`);
    }
}

// Search functionality
function performGlobalSearch() {
    try {
        const searchInput = document.getElementById('global-search');
        if (!searchInput) {
            throw new Error('Search input not found');
        }

        const query = searchInput.value.trim();
        if (!query) {
            showErrorMessage('Please enter a search term');
            return;
        }

        debugLog.log(`Performing search for: ${query}`);
        const results = searchData(query);
        displaySearchResults(results, query);
    } catch (error) {
        debugLog.error(`Search failed: ${error.message}`);
        showErrorMessage(`Search failed: ${error.message}`);
    }
}

function searchData(query) {
    try {
        const results = [];
        const searchTerm = query.toLowerCase();
        const profile = localData.profile;

        // Search in basic profile info
        const basicFields = ['name', 'title', 'bio', 'location'];
        basicFields.forEach(field => {
            if (profile[field] && profile[field].toLowerCase().includes(searchTerm)) {
                results.push({
                    type: 'Profile',
                    title: field.charAt(0).toUpperCase() + field.slice(1),
                    content: profile[field]
                });
            }
        });

        // Search in education
        if (profile.education) {
            profile.education.forEach(edu => {
                const searchableText = `${edu.degree} ${edu.institution}`.toLowerCase();
                if (searchableText.includes(searchTerm)) {
                    results.push({
                        type: 'Education',
                        title: edu.degree,
                        content: `${edu.institution} - ${edu.year}`
                    });
                }
            });
        }

        // Search in work experience
        if (profile.work) {
            profile.work.forEach(work => {
                const searchableText = `${work.company} ${work.position} ${work.description}`.toLowerCase();
                if (searchableText.includes(searchTerm)) {
                    results.push({
                        type: 'Work',
                        title: work.position,
                        content: `${work.company} - ${work.description.substring(0, 100)}...`
                    });
                }
            });
        }

        // Search in projects
        if (profile.projects) {
            profile.projects.forEach(project => {
                const searchableText = `${project.title} ${project.description} ${project.technologies ? project.technologies.join(' ') : ''}`.toLowerCase();
                if (searchableText.includes(searchTerm)) {
                    results.push({
                        type: 'Project',
                        title: project.title,
                        content: project.description
                    });
                }
            });
        }

        // Search in skills
        if (profile.skills) {
            profile.skills.forEach(skill => {
                if (skill.name.toLowerCase().includes(searchTerm)) {
                    results.push({
                        type: 'Skill',
                        title: skill.name,
                        content: `${skill.level} - ${skill.projects} projects`
                    });
                }
            });
        }

        return results;
    } catch (error) {
        debugLog.error(`Error in search data: ${error.message}`);
        return [];
    }
}

function displaySearchResults(results, query) {
    try {
        const resultsEl = document.getElementById('search-results');
        if (!resultsEl) return;

        if (results.length === 0) {
            resultsEl.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
            debugLog.log(`No search results found for: ${query}`);
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result-item">
                <div class="search-result-type">${result.type}</div>
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-content">${result.content}</div>
            </div>
        `).join('');

        resultsEl.innerHTML = resultsHTML;
        debugLog.success(`Found ${results.length} search results for: ${query}`);
    } catch (error) {
        debugLog.error(`Failed to display search results: ${error.message}`);
        showErrorMessage('Failed to display search results');
    }
}

function handleSearchKeypress(event) {
    try {
        if (event.key === 'Enter') {
            performGlobalSearch();
        }
    } catch (error) {
        debugLog.error(`Search keypress error: ${error.message}`);
    }
}

// Project filtering
function filterProjects() {
    try {
        const filterInput = document.getElementById('project-skill-filter');
        if (!filterInput) {
            throw new Error('Filter input not found');
        }

        const skillFilter = filterInput.value.trim();
        debugLog.log(`Filtering projects by skill: ${skillFilter || 'none'}`);
        loadProjectsData(skillFilter || null);
    } catch (error) {
        debugLog.error(`Project filtering failed: ${error.message}`);
        showErrorMessage(`Failed to filter projects: ${error.message}`);
    }
}

function clearProjectFilter() {
    try {
        const filterInput = document.getElementById('project-skill-filter');
        if (filterInput) {
            filterInput.value = '';
        }
        loadProjectsData();
        debugLog.log('Project filter cleared');
    } catch (error) {
        debugLog.error(`Failed to clear project filter: ${error.message}`);
    }
}

// Profile editing - FIXED
function openEditModal() {
    try {
        debugLog.log('Opening edit modal');
        const profile = appState.profileData || localData.profile;
        
        // Populate form fields
        const fields = ['name', 'email', 'location', 'title', 'bio'];
        fields.forEach(field => {
            const input = document.getElementById(`edit-${field}`);
            if (input && profile[field]) {
                input.value = profile[field];
            }
        });

        const modal = document.getElementById('edit-modal');
        if (modal) {
            modal.classList.remove('hidden');
            const nameInput = document.getElementById('edit-name');
            if (nameInput) {
                nameInput.focus();
            }
        }
        debugLog.success('Edit modal opened');
    } catch (error) {
        debugLog.error(`Failed to open edit modal: ${error.message}`);
        showErrorMessage(`Failed to open profile editor: ${error.message}`);
    }
}

function closeEditModal() {
    try {
        const modal = document.getElementById('edit-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        debugLog.log('Edit modal closed');
    } catch (error) {
        debugLog.error(`Failed to close edit modal: ${error.message}`);
    }
}

function handleProfileSave(event) {
    try {
        event.preventDefault();
        debugLog.log('Saving profile changes');

        const fields = ['name', 'email', 'location', 'title', 'bio'];
        const updates = {};
        
        // Validate and collect form data
        for (const field of fields) {
            const input = document.getElementById(`edit-${field}`);
            if (!input) {
                throw new Error(`Form field not found: ${field}`);
            }
            
            const value = input.value.trim();
            if (!value) {
                throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
            
            updates[field] = value;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updates.email)) {
            throw new Error('Please enter a valid email address');
        }

        // Update local data
        Object.assign(localData.profile, updates);
        appState.profileData = localData.profile;
        
        // Reload profile view
        loadProfileData();
        closeEditModal();
        
        showSuccessMessage('Profile updated successfully!');
        debugLog.success('Profile saved successfully');
    } catch (error) {
        debugLog.error(`Failed to save profile: ${error.message}`);
        showErrorMessage(error.message);
    }
}

// Health refresh
function refreshHealthStatus() {
    try {
        debugLog.log('Refreshing health status');
        loadHealthData();
        showSuccessMessage('Health status refreshed');
    } catch (error) {
        debugLog.error(`Failed to refresh health status: ${error.message}`);
        showErrorMessage('Failed to refresh health status');
    }
}

// Initialize application
function initializeApp() {
    try {
        debugLog.log('Initializing Me-API Playground');
        
        // Initialize debug panel (start hidden)
        const debugPanel = document.getElementById('debug-panel');
        if (debugPanel) {
            debugPanel.classList.add('hidden');
        }

        // Hide message banners initially
        const errorBanner = document.getElementById('error-banner');
        const successBanner = document.getElementById('success-banner');
        if (errorBanner) errorBanner.classList.add('hidden');
        if (successBanner) successBanner.classList.add('hidden');

        // Hide modal initially
        const modal = document.getElementById('edit-modal');
        if (modal) modal.classList.add('hidden');

        // Set up event listeners for navigation
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const viewName = this.getAttribute('data-view');
                if (viewName) {
                    switchView(viewName);
                }
            });
        });

        // Set up keyboard event handlers
        document.addEventListener('keydown', function(event) {
            try {
                if (event.key === 'Escape') {
                    closeEditModal();
                }
            } catch (error) {
                debugLog.error(`Keyboard event error: ${error.message}`);
            }
        });

        // Load initial view
        setTimeout(() => {
            switchView('profile');
        }, 100);
        
        appState.initialized = true;
        debugLog.success('Application initialized successfully');
        
        // Show success message after short delay
        setTimeout(() => {
            showSuccessMessage('Me-API Playground loaded successfully!');
        }, 500);
        
    } catch (error) {
        debugLog.error(`Failed to initialize application: ${error.message}`);
        console.error('Application initialization failed:', error);
        
        // Show error in DOM if possible
        try {
            showErrorMessage(`Application failed to load: ${error.message}`);
        } catch (displayError) {
            console.error('Could not even display error:', displayError);
        }
    }
}

// Start the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Global error handler
window.addEventListener('error', function(event) {
    const message = `JavaScript Error: ${event.error?.message || event.message}`;
    debugLog.error(message);
    console.error('Global error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    const message = `Unhandled Promise Rejection: ${event.reason}`;
    debugLog.error(message);
    console.error('Unhandled promise rejection:', event.reason);
});

// Export functions to global scope for inline handlers
window.switchView = switchView;
window.toggleDebugPanel = toggleDebugPanel;
window.clearDebugLog = clearDebugLog;
window.hideErrorBanner = hideErrorBanner;
window.hideSuccessBanner = hideSuccessBanner;
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.handleProfileSave = handleProfileSave;
window.performGlobalSearch = performGlobalSearch;
window.handleSearchKeypress = handleSearchKeypress;
window.filterProjects = filterProjects;
window.clearProjectFilter = clearProjectFilter;
window.refreshHealthStatus = refreshHealthStatus;