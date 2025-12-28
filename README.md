# Goodreads Lookup - Chrome Extension

A simple Chrome extension that adds a "View on Goodreads" button to Amazon book pages.

## Installation

### 1. Download and unzip this extension folder

Download the files by clicking the big green "Code" button in this repo, then "Download ZIP":
<img width="120" alt="image" src="https://github.com/user-attachments/assets/524191b7-c114-4d71-b0be-ec03dd95c6b6" />

<img width="153" alt="image" src="https://github.com/user-attachments/assets/c0735d72-17d5-4673-8483-4161a200103a" />

On your file system, open the ZIP file you just downloaded, and save the folder it opens someplace safe.

### 2. Load extension

Open Chrome and go to `chrome://extensions/`. If it isn't already turned on, turn on Developer Mode by clicking the switch on the top-right corner:

<img width="156" alt="image" src="https://github.com/user-attachments/assets/55ab5fc1-ff35-4bef-a35a-b35c83e2ac66" />

Then, click "Load unpacked" on the top left:

<img width="151" alt="image" src="https://github.com/user-attachments/assets/872b2c91-2450-48c6-8850-0f2c3f52fcd7" />

Select the `goodreads-lookup` folder, into which you previously safely stored your files. 

Done! You can try it out with Andy Weir's "The Martian" ([link](https://www.amazon.com/Martian-Andy-Weir/dp/0553418025/ref=sr_1_1?crid=C5L0GRB8J3T6&dib=eyJ2IjoiMSJ9.4YgDB6vZjBnG85UQ3M5xnWpLTstaNDWrl441vA_mT98myajFayl6uh9zWOzQsmcDARMEi-hsqsG0xTC9zZ8faaugs05Y3NFtVdiOxW9Of6CdFtdj98bO0WTZUHDLQhdJS6oSvW2jbzp61O_M7xtG45k-pZHISdWw9d0wIhX_ajuLOHhhJ0eXBSoTHx0jao_hGtz5ZK_X5aeNDYnySjmk-j0pHYz2a_OVgRR8NeZIaA8.biM7SGwOyJlWntogRlWqR8gtXkDhQBXO1Ho6jg4hZQA&dib_tag=se&keywords=andy+weir+the+martian&qid=1766945912&sprefix=andy+weir+the+%2Caps%2C1094&sr=8-1)).


## Usage

1. Navigate to any book page on Amazon
2. Look for the brown "View on Goodreads" button above the buy box
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
