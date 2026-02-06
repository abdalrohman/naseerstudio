/**
 * NaseerStudio App Loader
 * Dynamically loads and renders apps from apps.json
 */

const AppLoader = (function() {
    let appsData = null;
    
    async function loadAppsData() {
        if (appsData) return appsData;
        
        try {
            const response = await fetch('/naseerstudio/data/apps.json');
            if (!response.ok) throw new Error('Failed to load apps data');
            appsData = await response.json();
            return appsData;
        } catch (error) {
            console.error('Error loading apps:', error);
            return null;
        }
    }
    
    function createAppCard(app, studio) {
        const isPublished = app.status === 'published';
        const isComingSoon = app.status === 'coming_soon';
        
        return `
            <div class="app-card ${isComingSoon ? 'coming-soon' : ''}" data-category="${app.category}" data-id="${app.id}">
                <div class="app-card-header">
                    <div class="app-icon" ${!isPublished ? 'style="background: var(--text-muted);"' : ''}>
                        ${app.icon}
                    </div>
                    <div class="app-title">
                        <h3>${app.name}</h3>
                        <span class="app-category">${app.category}</span>
                    </div>
                </div>
                <p class="app-description">${app.tagline}</p>
                ${isPublished ? `
                    <ul class="app-features">
                        ${app.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <div class="app-meta">
                        <span class="app-meta-item">⭐ ${app.rating}</span>
                        <span class="app-meta-item">⬇️ ${app.downloads}</span>
                        <span class="app-meta-item">📱 ${app.size}</span>
                    </div>
                    <div class="app-actions">
                        <a href="${app.playStoreUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            Download on Google Play
                        </a>
                        <a href="/naseerstudio/apps/${app.id}/" class="btn btn-secondary">View Details</a>
                    </div>
                ` : `
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: auto;">
                        Coming soon to mobile devices.
                    </p>
                `}
            </div>
        `;
    }
    
    async function renderApps(selector) {
        const container = document.querySelector(selector);
        if (!container) {
            console.error(`Container ${selector} not found`);
            return;
        }
        
        const data = await loadAppsData();
        if (!data || !data.apps) {
            container.innerHTML = '<p class="error">Failed to load apps. Please refresh the page.</p>';
            return;
        }
        
        container.innerHTML = data.apps.map(app => createAppCard(app, data.studio)).join('');
        
        // Dispatch event for other scripts
        document.dispatchEvent(new CustomEvent('appsLoaded', { detail: data }));
    }
    
    async function renderAppDetail(appId, selector) {
        const container = document.querySelector(selector);
        if (!container) return;
        
        const data = await loadAppsData();
        if (!data) return;
        
        const app = data.apps.find(a => a.id === appId);
        if (!app) {
            container.innerHTML = '<p class="error">App not found.</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="app-detail">
                <div class="app-detail-hero">
                    <div class="container">
                        <div class="app-detail-content">
                            <div class="app-icon-large">${app.icon}</div>
                            <div class="app-detail-info">
                                <h1>${app.name}</h1>
                                <p class="app-detail-tagline">${app.tagline}</p>
                                <div class="app-stats">
                                    <div class="app-stat">
                                        <span class="app-stat-value">⭐ ${app.rating}</span>
                                        <span class="app-stat-label">Rating</span>
                                    </div>
                                    <div class="app-stat">
                                        <span class="app-stat-value">⬇️ ${app.downloads}</span>
                                        <span class="app-stat-label">Downloads</span>
                                    </div>
                                    <div class="app-stat">
                                        <span class="app-stat-value">📱 ${app.size}</span>
                                        <span class="app-stat-label">Size</span>
                                    </div>
                                </div>
                                <div class="app-actions-row">
                                    ${app.playStoreUrl ? `<a href="${app.playStoreUrl}" class="btn btn-primary" target="_blank">Get it on Google Play</a>` : ''}
                                    ${app.appStoreUrl ? `<a href="${app.appStoreUrl}" class="btn btn-secondary" target="_blank">Download on App Store</a>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="container">
                    <div class="app-content">
                        <section class="features-section">
                            <div class="section-header">
                                <span class="section-tag">Features</span>
                                <h2 class="section-title">What Makes It Special</h2>
                            </div>
                            <ul class="app-features detailed">
                                ${app.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </section>
                        
                        <section class="info-section" style="margin-top: var(--space-2xl);">
                            <div class="section-header">
                                <span class="section-tag">Details</span>
                                <h2 class="section-title">App Information</h2>
                            </div>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Version</span>
                                    <span class="info-value">${app.version}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Category</span>
                                    <span class="info-value">${app.category}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Content Rating</span>
                                    <span class="info-value">${app.contentRating}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Released</span>
                                    <span class="info-value">${new Date(app.releaseDate).toLocaleDateString()}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Price</span>
                                    <span class="info-value">${app.price}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">In-app Purchases</span>
                                    <span class="info-value">${app.inAppPurchases ? 'Yes' : 'No'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Contains Ads</span>
                                    <span class="info-value">${app.containsAds ? 'Yes' : 'No'}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        `;
    }
    
    return {
        loadAppsData,
        renderApps,
        renderAppDetail
    };
})();

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        AppLoader.renderApps('#appsGrid');
    });
} else {
    AppLoader.renderApps('#appsGrid');
}
