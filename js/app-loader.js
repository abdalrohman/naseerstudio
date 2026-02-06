/**
 * NaseerStudio App Loader
 * Dynamically loads and renders apps from apps.json
 */

const AppLoader = (function() {
    let appsData = null;
    
    async function loadAppsData() {
        if (appsData) return appsData;
        
        try {
            const response = await fetch('data/apps.json');
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
            <div class="game-card ${isComingSoon ? 'coming-soon' : ''}" data-category="${app.category}" data-id="${app.id}">
                <div class="card-header">
                    <div class="app-icon" ${!isPublished ? 'style="background: rgba(255,255,255,0.05); box-shadow: none;"' : ''}>
                        ${app.icon}
                    </div>
                    <div class="card-title">
                        <h3>${app.name}</h3>
                        <span class="version-badge" ${!isPublished ? 'style="background: rgba(255,255,255,0.05); color: #94a3b8;"' : ''}>
                            ${isPublished ? app.category.charAt(0).toUpperCase() + app.category.slice(1) : 'Development'}
                        </span>
                    </div>
                </div>
                <p style="margin-bottom: 1.5rem; color: #cbd5e1;">${app.tagline}</p>
                ${isPublished ? `
                    <ul class="features-list">
                        ${app.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <div class="app-meta">
                        <span class="meta-item">⭐ ${app.rating}</span>
                        <span class="meta-item">⬇️ ${app.downloads}</span>
                        <span class="meta-item">📱 ${app.size}</span>
                    </div>
                    <a href="${app.playStoreUrl}" class="cta-button" target="_blank" rel="noopener noreferrer">
                        Download on Google Play
                    </a>
                    <a href="/naseerstudio/apps/${app.id}/" class="secondary-button">View Details</a>
                ` : `
                    <p style="color: #64748b; font-size: 0.9rem;">We are building the next generation of ${app.category} experiences.</p>
                    <div style="text-align: center; color: #64748b; font-size: 0.9rem; padding: 12px;">
                        Stay Tuned
                    </div>
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
                <div class="app-hero">
                    <div class="app-icon-large">${app.icon}</div>
                    <div class="app-info">
                        <h1>${app.name}</h1>
                        <p class="tagline">${app.tagline}</p>
                        <div class="app-stats">
                            <span class="stat">⭐ ${app.rating}</span>
                            <span class="stat">⬇️ ${app.downloads}</span>
                            <span class="stat">📱 ${app.size}</span>
                        </div>
                        <div class="app-buttons">
                            ${app.playStoreUrl ? `<a href="${app.playStoreUrl}" class="cta-button" target="_blank">Get it on Google Play</a>` : ''}
                            ${app.appStoreUrl ? `<a href="${app.appStoreUrl}" class="cta-button secondary" target="_blank">Download on App Store</a>` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="app-content">
                    <section class="features-section">
                        <h2>Features</h2>
                        <ul class="features-list detailed">
                            ${app.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </section>
                    
                    <section class="info-section">
                        <h2>App Information</h2>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="label">Version</span>
                                <span class="value">${app.version}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Category</span>
                                <span class="value">${app.category}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Content Rating</span>
                                <span class="value">${app.contentRating}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Released</span>
                                <span class="value">${new Date(app.releaseDate).toLocaleDateString()}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Price</span>
                                <span class="value">${app.price}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">In-app Purchases</span>
                                <span class="value">${app.inAppPurchases ? 'Yes' : 'No'}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Contains Ads</span>
                                <span class="value">${app.containsAds ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                    </section>
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
        AppLoader.renderApps('.games-grid');
    });
} else {
    AppLoader.renderApps('.games-grid');
}
