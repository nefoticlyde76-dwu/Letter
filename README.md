# A Letter for You

A small interactive love letter. She answers five playful riddles, then unlocks the letter and a final question. It is a static website: HTML, CSS, and vanilla JavaScript, with Bootstrap 5 for layout and buttons.

## Technology

- HTML5
- CSS3
- Bootstrap 5 (CDN)
- Vanilla JavaScript
- Google Fonts (Playfair Display and Lato), with Georgia and Segoe UI as fallbacks
- Netlify, or any static host

There is no build step, backend, database, or paid API.

## Run it locally

Open `index.html` in a browser, or from this folder start a tiny local server:

```bash
py -m http.server 5500
```

Then visit `http://localhost:5500`.

JavaScript is required. The letter itself is not saved anywhere and refreshing the page starts again from the welcome screen.

## Customise the letter

Edit only `assets/js/content.js`.

- `welcome` is the opening screen.
- `riddles` holds each question, the accepted answers, the hint, and the replies.
- `letter.paragraphs` is the full letter, one paragraph per string.
- `final` is the last question and the closing lines.
- `ui` and `skip` are the button labels and the skip warning.

Answer checking ignores capital letters, extra spaces, punctuation, and a leading "a", "an", "the", "my", or "your". A one-letter typo is accepted on longer answers such as "clock" or "towel". To allow another reply, add it to that riddle's `answers` array.

Do not put secrets in this file. Nothing she types is stored or sent anywhere.

## Deploy on Netlify

`netlify.toml` publishes the project folder and does not set a build command. Use Netlify's current free option for static sites. Hosting terms can change, so check the plan shown in your Netlify account before you deploy.

### Method A: Netlify through GitHub

1. Commit and push this project to a GitHub repository.
2. Log in to Netlify.
3. Import the repository.
4. Set the publish directory to the repository root (`.`).
5. Leave the build command empty.
6. Deploy the site.

No environment variables are required.

### Method B: Manual deployment

1. Open Netlify.
2. Use the manual deploy or drag-and-drop option.
3. Upload the folder that contains `index.html`, `netlify.toml`, and `assets`.
4. Open the deployed URL and walk through the letter once.

The site is one page, `index.html`. It does not need a server, a database, or a build.
