# For Vioyo — Four years of us

The complete editable anniversary website, packaged for Antigravity and GitHub Pages. The current Vioyo personalization, online-relationship messages, original letter and all interactions are included.

## Open in Antigravity

1. Extract this ZIP.
2. Open the **Vioyo-Anniversary** folder in Antigravity. In versions with Projects, create a project and use **Add Folder** to select it.
3. Read **ANTIGRAVITY-HANDOFF.md** or ask the agent to read it before editing.
4. Install Node.js 22 or later if needed, then run in the project terminal:

```sh
npm run dev
```

Open **http://127.0.0.1:4173**. Stop the preview with Ctrl+C. No npm install or build is required: this project has no external packages. If the port is occupied, set the PORT environment variable to another port.

Reference: [Antigravity getting started](https://www.antigravity.google/docs/getting-started/).

## Change content and media

Edit **public/content.js** to change Vioyo's name, the optional anniversary date, timeline messages, captions, letter, music, theme colors, future cards and final message. The letter remains exactly as originally supplied.

Put photographs, screenshots and music in **public/assets/**. Set a memory's `src` or a timeline entry's `photo` to a relative path such as `assets/our-chat.webp`; give the image meaningful `alt` text. Set `music.src` to `assets/our-song.mp3`. Leave paths empty to keep the attractive placeholders. Music only plays after a visitor presses its button.

Use compressed images around 1200 pixels on the long edge. Paths and filename capitalization must match exactly. Do not start asset paths with `/`, because a GitHub project website lives under a repository subdirectory.

Edit **public/styles.css** for layout and detailed colors, **public/index.html** for section structure, and **public/app.js** for behavior. Google Fonts load when available; local font fallbacks keep the website usable without them.

## Host on GitHub Pages

1. Create an empty GitHub repository, for example **vioyo-anniversary**. On GitHub Free, use a public repository for Pages. The published gift and its letter will be publicly accessible; the existing private Sites access does not transfer to GitHub Pages.
2. Use GitHub Desktop to add this extracted folder as a local repository and publish it to your GitHub account, or use Git from this folder:

```sh
git init -b main
git add .
git commit -m "Add Vioyo anniversary website"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the two placeholders with your actual GitHub username and repository name. Publish the folder contents with package.json and .github at the repository root; do not upload the ZIP itself or add another enclosing folder. Include the hidden `.github` directory.

3. In the GitHub repository, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Go to **Actions → Deploy anniversary website → Run workflow**, choose **main**, and run it. If a first run failed because Pages was not enabled yet, rerun it now.
5. When the workflow succeeds, open the URL shown by the deployment or Settings → Pages, usually **https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/**.

Future pushes to **main** automatically publish your edits. If you choose another branch name, update `.github/workflows/pages.yml`. The workflow only publishes **public/**, so developer notes and helper scripts are not part of the website.

No API keys, custom token, paid backend or ChatGPT service is required for the site. GitHub uses its built-in workflow token for deployment. Reference: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Checks

```sh
npm run check
```

This checks JavaScript syntax, required content and local asset links. It is also run by the deployment workflow. For UI changes, inspect opening, timeline, gallery, letter and mobile layout in a browser; this command is not a visual or accessibility audit. QA.md records prior browser verification of the original site.

## Project layout

```text
Vioyo-Anniversary/
  public/
    index.html
    content.js
    styles.css
    app.js
    assets/
  scripts/
    serve.cjs
    check.cjs
  .github/workflows/pages.yml
  package.json
  ANTIGRAVITY-HANDOFF.md
  README.md
  QA.md
```

This export is standalone. Its files have no local-machine paths, Sites identity, credentials, or existing Git history. It has not yet been uploaded to your GitHub account. Your existing hosted site remains available separately.
