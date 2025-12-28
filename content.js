// Goodreads Lookup - Content Script
// Adds a button to Amazon book pages to open the book on Goodreads

(function() {
  'use strict';

  // Check if we're on a book product page
  function isBookPage() {
    // Check for book-specific indicators
    const bookCategories = document.querySelector('#wayfinding-breadcrumbs_container, .a-breadcrumb');
    const categoryText = bookCategories?.textContent?.toLowerCase() || '';
    
    const bookKeywords = ['books', 'kindle', 'ebook', 'audiobook', 'hardcover', 'paperback'];
    const hasBookCategory = bookKeywords.some(keyword => categoryText.includes(keyword));
    
    // Also check product details for format indicators
    const productDetails = document.body.textContent.toLowerCase();
    const formatIndicators = ['hardcover', 'paperback', 'kindle edition', 'audiobook', 'isbn-10', 'isbn-13'];
    const hasFormatIndicator = formatIndicators.some(indicator => productDetails.includes(indicator));
    
    // Check if there's a book title element
    const hasTitle = document.querySelector('#productTitle, #ebooksProductTitle');
    
    return hasTitle && (hasBookCategory || hasFormatIndicator);
  }

  // Extract book information from the page
  function getBookInfo() {
    // Get the title
    const titleElement = document.querySelector('#productTitle, #ebooksProductTitle');
    const title = titleElement?.textContent?.trim() || '';

    // Get the author
    const authorElement = document.querySelector('.author a, #bylineInfo .author a, .contributorNameID, #bylineInfo a.a-link-normal');
    let author = authorElement?.textContent?.trim() || '';
    
    // Clean up author name (remove "by" prefix if present)
    author = author.replace(/^by\s+/i, '');

    // Try to get ISBN
    let isbn = '';
    const detailBullets = document.querySelectorAll('#detailBullets_feature_div li, #productDetailsTable .content li, .detail-bullet-list span');
    detailBullets.forEach(bullet => {
      const text = bullet.textContent;
      const isbnMatch = text.match(/ISBN-(?:10|13)\s*:\s*([\dXx-]+)/);
      if (isbnMatch && !isbn) {
        isbn = isbnMatch[1].replace(/-/g, '');
      }
    });

    // Also check the product details section
    if (!isbn) {
      const pageText = document.body.innerHTML;
      const isbnMatch = pageText.match(/ISBN-13.*?(\d{13})|ISBN-10.*?([\dXx]{10})/);
      if (isbnMatch) {
        isbn = (isbnMatch[1] || isbnMatch[2]).replace(/-/g, '');
      }
    }

    return { title, author, isbn };
  }

  // Create Goodreads search URL
  function createGoodreadsUrl(bookInfo) {
    // If we have an ISBN, search by that (most accurate)
    if (bookInfo.isbn) {
      return `https://www.goodreads.com/search?q=${encodeURIComponent(bookInfo.isbn)}`;
    }
    
    // Otherwise search by title and author
    let searchQuery = bookInfo.title;
    if (bookInfo.author) {
      searchQuery += ' ' + bookInfo.author;
    }
    
    return `https://www.goodreads.com/search?q=${encodeURIComponent(searchQuery)}`;
  }

  // Create and inject the Goodreads button
  function injectButton() {
    // Don't add button if already exists
    if (document.querySelector('#goodreads-lookup-btn')) {
      return;
    }

    const bookInfo = getBookInfo();
    
    // Only proceed if we have at least a title
    if (!bookInfo.title) {
      return;
    }

    const goodreadsUrl = createGoodreadsUrl(bookInfo);

    // Create the button
    const button = document.createElement('button');
    button.id = 'goodreads-lookup-btn';
    button.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-right: 6px;">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
      View on Goodreads
    `;
    
    button.addEventListener('click', () => {
      window.open(goodreadsUrl, '_blank');
    });

    // Find a good place to insert the button
    const buyBox = document.querySelector('#buybox, #rightCol, #desktop_buybox');
    const titleSection = document.querySelector('#titleSection, #centerCol, #title');
    
    if (buyBox) {
      buyBox.insertBefore(button, buyBox.firstChild);
    } else if (titleSection) {
      titleSection.appendChild(button);
    } else {
      // Fallback: add after title
      const title = document.querySelector('#productTitle, #ebooksProductTitle');
      if (title && title.parentNode) {
        title.parentNode.insertBefore(button, title.nextSibling);
      }
    }
  }

  // Initialize
  function init() {
    // Wait a bit for page to fully load
    setTimeout(() => {
      if (isBookPage()) {
        injectButton();
      }
    }, 500);
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also handle dynamic page changes (Amazon uses a lot of JS)
  const observer = new MutationObserver((mutations) => {
    if (isBookPage() && !document.querySelector('#goodreads-lookup-btn')) {
      injectButton();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
