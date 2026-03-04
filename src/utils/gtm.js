/**
 * Google Tag Manager utilities
 * 
 * GTM container ID should be set in environment variable: VITE_GTM_ID
 * 
 * The GTM script is injected in index.html.
 * This module provides helper functions for custom events.
 */

/**
 * Push a custom event to the GTM data layer
 * @param {string} event - Event name
 * @param {Object} data - Additional data
 */
export function pushEvent(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...data,
  });
}

/**
 * Track a page view (useful for SPA navigation)
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export function trackPageView(path, title) {
  pushEvent('virtualPageview', {
    page: path,
    title,
  });
}

/**
 * Track a form submission
 * @param {string} formName - Name of the form
 * @param {Object} data - Form data (sanitized)
 */
export function trackFormSubmission(formName, data = {}) {
  pushEvent('formSubmission', {
    formName,
    ...data,
  });
}

/**
 * Track a CTA click
 * @param {string} ctaName - CTA identifier
 * @param {string} location - Where on the page
 */
export function trackCTAClick(ctaName, location) {
  pushEvent('ctaClick', {
    ctaName,
    ctaLocation: location,
  });
}
