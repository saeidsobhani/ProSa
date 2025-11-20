/**
 * Common JavaScript utilities for ProSa Circular Economy Project
 * Provides reusable functions for file uploads, data management, and navigation
 */

// Data management object
const ProSaData = {
    // Store data for each participant page
    storage: {},
    
    // Save data to localStorage
    save: function(pageId, data) {
        this.storage[pageId] = data;
        try {
            localStorage.setItem('prosa_' + pageId, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    },
    
    // Load data from localStorage
    load: function(pageId) {
        try {
            const stored = localStorage.getItem('prosa_' + pageId);
            if (stored) {
                this.storage[pageId] = JSON.parse(stored);
                return this.storage[pageId];
            }
        } catch (e) {
            console.error('Error loading data:', e);
        }
        return null;
    },
    
    // Clear data for a specific page
    clear: function(pageId) {
        delete this.storage[pageId];
        try {
            localStorage.removeItem('prosa_' + pageId);
        } catch (e) {
            console.error('Error clearing data:', e);
        }
    },
    
    // Get all stored data
    getAll: function() {
        return this.storage;
    }
};

// File upload handler class
class FileUploadHandler {
    constructor(uploadButtonId, uploadAreaId, options = {}) {
        this.uploadButton = document.getElementById(uploadButtonId);
        this.uploadArea = document.getElementById(uploadAreaId);
        this.fileInput = null;
        this.currentFile = null;
        this.options = {
            acceptedTypes: options.acceptedTypes || ['*/*'],
            maxSize: options.maxSize || 10 * 1024 * 1024, // 10MB default
            onFileSelect: options.onFileSelect || null,
            onFileRemove: options.onFileRemove || null
        };
        
        this.init();
    }
    
    init() {
        // Create hidden file input
        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = this.options.acceptedTypes.join(',');
        this.fileInput.style.display = 'none';
        document.body.appendChild(this.fileInput);
        
        // Button click handler
        if (this.uploadButton) {
            this.uploadButton.addEventListener('click', () => {
                this.fileInput.click();
            });
        }
        
        // File input change handler
        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFile(e.target.files[0]);
            }
        });
        
        // Drag and drop handlers
        if (this.uploadArea) {
            this.uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.uploadArea.classList.add('dragover');
            });
            
            this.uploadArea.addEventListener('dragleave', () => {
                this.uploadArea.classList.remove('dragover');
            });
            
            this.uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                this.uploadArea.classList.remove('dragover');
                if (e.dataTransfer.files.length > 0) {
                    this.handleFile(e.dataTransfer.files[0]);
                }
            });
            
            this.uploadArea.addEventListener('click', () => {
                if (!this.currentFile) {
                    this.fileInput.click();
                }
            });
        }
    }
    
    handleFile(file) {
        // Validate file size
        if (file.size > this.options.maxSize) {
            showMessage('Datei ist zu groß. Maximum: ' + this.formatFileSize(this.options.maxSize), 'error');
            return;
        }
        
        this.currentFile = file;
        this.displayFile(file);
        
        // Call callback if provided
        if (typeof this.options.onFileSelect === 'function') {
            this.options.onFileSelect(file);
        }
    }
    
    displayFile(file) {
        if (!this.uploadArea) return;
        
        this.uploadArea.classList.add('has-file');
        this.uploadArea.innerHTML = `
            <div class="file-info">
                <span class="file-icon">📄</span>
                <div>
                    <div class="file-name">${this.escapeHtml(file.name)}</div>
                    <div class="file-size">${this.formatFileSize(file.size)}</div>
                </div>
                <button class="remove-file-btn" onclick="this.parentElement.parentElement.uploadHandler.removeFile()">Entfernen</button>
            </div>
        `;
        
        // Store reference for remove button
        this.uploadArea.uploadHandler = this;
    }
    
    removeFile() {
        this.currentFile = null;
        this.fileInput.value = '';
        
        if (this.uploadArea) {
            this.uploadArea.classList.remove('has-file');
            this.uploadArea.innerHTML = '<div class="upload-placeholder">Datei hier ablegen oder klicken zum Hochladen</div>';
        }
        
        // Call callback if provided
        if (typeof this.options.onFileRemove === 'function') {
            this.options.onFileRemove();
        }
    }
    
    getFile() {
        return this.currentFile;
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Form data manager
class FormDataManager {
    constructor(formId, pageId) {
        this.form = document.getElementById(formId);
        this.pageId = pageId;
        this.hasChanges = false;
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        // Track changes
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.hasChanges = true;
                this.showActionBar();
            });
        });
        
        // Load saved data
        this.loadData();
    }
    
    saveData() {
        if (!this.form) return false;
        
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        const success = ProSaData.save(this.pageId, data);
        
        if (success) {
            this.hasChanges = false;
            this.hideActionBar();
            showMessage('Daten erfolgreich gespeichert', 'success');
        } else {
            showMessage('Fehler beim Speichern', 'error');
        }
        
        return success;
    }
    
    loadData() {
        const data = ProSaData.load(this.pageId);
        if (!data || !this.form) return;
        
        Object.keys(data).forEach(key => {
            const element = this.form.elements[key];
            if (element) {
                element.value = data[key];
            }
        });
    }
    
    showActionBar() {
        const actionBar = document.querySelector('.action-bar');
        if (actionBar) {
            actionBar.classList.remove('hidden');
        }
    }
    
    hideActionBar() {
        const actionBar = document.querySelector('.action-bar');
        if (actionBar) {
            actionBar.classList.add('hidden');
        }
    }
    
    hasUnsavedChanges() {
        return this.hasChanges;
    }
}

// Navigation functions
function navigateToHome() {
    if (window.formManager && window.formManager.hasUnsavedChanges()) {
        if (confirm('Sie haben nicht gespeicherte Änderungen. Möchten Sie wirklich fortfahren?')) {
            window.location.href = 'index.html';
        }
    } else {
        window.location.href = 'index.html';
    }
}

function navigateToPage(page) {
    if (window.formManager && window.formManager.hasUnsavedChanges()) {
        if (confirm('Sie haben nicht gespeicherte Änderungen. Möchten Sie wirklich fortfahren?')) {
            window.location.href = page;
        }
    } else {
        window.location.href = page;
    }
}

function handleLogout() {
    if (confirm('Möchten Sie sich wirklich abmelden?')) {
        // Clear all stored data
        Object.keys(ProSaData.storage).forEach(key => {
            ProSaData.clear(key);
        });
        
        // In a real application, this would clear session and redirect to login
        showMessage('Abmeldung erfolgreich', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Status message display
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existing = document.querySelectorAll('.status-message');
    existing.forEach(el => el.remove());
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `status-message ${type}`;
    messageEl.innerHTML = `
        <span>${getMessageIcon(type)}</span>
        <span>${escapeHtml(message)}</span>
    `;
    
    // Insert at top of main container
    const container = document.querySelector('.main-container');
    if (container) {
        container.insertBefore(messageEl, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

function getMessageIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        info: 'ℹ',
        warning: '⚠'
    };
    return icons[type] || icons.info;
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-save functionality
let autoSaveTimer = null;
function enableAutoSave(formManager, interval = 30000) {
    if (autoSaveTimer) {
        clearInterval(autoSaveTimer);
    }
    
    autoSaveTimer = setInterval(() => {
        if (formManager && formManager.hasUnsavedChanges()) {
            formManager.saveData();
            console.log('Auto-saved data');
        }
    }, interval);
}

// Prevent accidental navigation
function setupNavigationWarning() {
    window.addEventListener('beforeunload', (e) => {
        if (window.formManager && window.formManager.hasUnsavedChanges()) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up navigation warnings
    setupNavigationWarning();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (window.formManager) {
                window.formManager.saveData();
            }
        }
        
        // Escape to go home
        if (e.key === 'Escape') {
            navigateToHome();
        }
    });
});

// Export functions for use in pages
window.ProSaData = ProSaData;
window.FileUploadHandler = FileUploadHandler;
window.FormDataManager = FormDataManager;
window.navigateToHome = navigateToHome;
window.navigateToPage = navigateToPage;
window.handleLogout = handleLogout;
window.showMessage = showMessage;
window.enableAutoSave = enableAutoSave;
