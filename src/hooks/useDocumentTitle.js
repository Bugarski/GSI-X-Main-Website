import { useEffect } from 'react';

/**
 * Sets the document title and meta description.
 * @param {string} title - Page title
 * @param {string} [description] - Meta description
 */
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | GSI`;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }
  }, [title, description]);
}
