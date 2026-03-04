/**
 * GSI API Service
 * Handles communication with the backend (AWS Lambda via API Gateway)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Submit the contact form
 * @param {Object} formData - Form field values
 * @returns {Promise<Object>} Response from the API
 */
export async function submitContactForm(formData) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to submit form');
  }

  return response.json();
}
