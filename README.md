# Goodreads Lookup - Chrome Extension

A simple Chrome extension that adds a "View on Goodreads" button to Amazon book pages.

## Features

- Adds a button to Amazon book product pages
- Automatically detects book pages (Kindle, hardcover, paperback, audiobooks)
- Searches Goodreads by ISBN (most accurate) or by title/author
- Works on multiple Amazon regional sites (US, UK, Canada, Germany, France, etc.)

## Installation

1. Download and unzip this extension folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the `goodreads-lookup` folder

## Usage

1. Navigate to any book page on Amazon
2. Look for the brown "View on Goodreads" button near the buy box
3. Click the button to open the Goodreads page in a new tab

## How It Works

The extension extracts book information from the Amazon page in this order of priority:

1. **ISBN** - If found, searches Goodreads by ISBN for the most accurate match
2. **Title + Author** - Falls back to searching by title and author name

## Supported Sites

- amazon.com
- amazon.co.uk
- amazon.ca
- amazon.de
- amazon.fr
- amazon.es
- amazon.it
- amazon.co.jp
- amazon.in
- amazon.com.au

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that adds the button
- `styles.css` - Button styling
- `icon48.png` / `icon128.png` - Extension icons
