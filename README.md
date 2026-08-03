# Electronik Tribulation Army BBS — GitHub Edition

A static, GitHub-native BBS that runs entirely on **GitHub Pages** and uses **GitHub Issues and comments** as its shared public data layer.

It does not require Node.js, a database, a paid host, an API key, or a personal access token.

## Included

- CRT terminal and hacker/BBS interface
- GitHub-backed forum boards and threads
- GitHub-backed public chat/shoutbox
- GitHub identities and native moderation
- Browser-local profiles and game saves
- Global score submissions through GitHub Issues
- Six playable door games
- Local and global leaderboards
- Mobile and desktop layouts
- In-browser Sysop Console with `config.js` export
- Automatic GitHub Pages deployment workflow
- One-click bootstrap workflow for labels and starter channels
- Demo mode for local previewing

## Door games

1. Neon Snake
2. Codebreaker
3. Packet Runner
4. Void Jack
5. Sector Trader
6. Cipher Strike

## How the shared features work

| BBS feature | GitHub implementation |
|---|---|
| Forum board | Issue label such as `board:general` |
| Thread | GitHub Issue |
| Reply | GitHub Issue comment |
| Public chat | Comments on the Issue carrying `eta:chat` |
| User identity | GitHub account |
| Moderation | GitHub repository permissions and Issue controls |
| Global score | Issue carrying `score:submission` |
| Verified score | Maintainer adds `score:verified` |
| Door-game save | Browser local storage |

The site only reads public repository data through GitHub's REST API. Posting opens GitHub itself so the visitor signs and submits under their own account. This avoids putting a secret token in browser JavaScript.

# Fast deployment

## 1. Create the repository

Create a **public** GitHub repository. A suitable name is:

```text
electronik-tribulation-army-bbs
```

Make sure **Issues** are enabled under:

```text
Settings → General → Features → Issues
```

## 2. Upload the project

Upload the **contents** of this folder to the repository root, including the hidden `.github` directory.

The repository root should contain:

```text
.github/
assets/
doors/
app.js
config.js
index.html
styles.css
README.md
```

Using GitHub Desktop or Git is the most reliable way to preserve the `.github` directory.

### Git command example

```bash
git init
git add .
git commit -m "Deploy ETA BBS GitHub Edition"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## 3. Enable GitHub Pages

Open:

```text
Settings → Pages → Build and deployment → Source
```

Choose:

```text
GitHub Actions
```

The included **Deploy ETA BBS** workflow publishes the static site whenever the `main` branch changes.

## 4. Bootstrap the BBS data layer

Open:

```text
Actions → Bootstrap ETA BBS → Run workflow
```

The workflow creates:

- All forum-board labels
- The `eta:chat` label
- The `score:submission` and `score:verified` labels
- A permanent public chat Issue
- A starter welcome thread
- A sysop bulletin

The bootstrap is safe to run again. It updates existing labels and avoids duplicating starter channels.

## 5. Open the site

For a normal project repository, the address will look like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

The BBS automatically detects the owner and repository from that address.

# Custom domain or local preview

When using a custom domain, edit `config.js`:

```js
window.ETA_CONFIG = {
  // ...
  github: {
    owner: 'YOUR-USERNAME',
    repo: 'YOUR-REPOSITORY',
    // ...
  }
};
```

For a local preview, serve the folder with any static web server:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

Local previews use the built-in demo node unless you enter a public GitHub owner and repository in the identity screen or Sysop Console.

# Editing the station

The easiest permanent edits are made in `config.js`.

You can change:

- BBS name
- Sysop name
- Tagline
- Node location
- Announcement
- House rules
- Theme colors
- GitHub owner/repository
- Chat and score labels
- Refresh interval
- Board names, descriptions, and labels
- Door-game presentation

The in-browser **Sysop Console** can preview changes locally and export a replacement `config.js`. Commit that exported file to make the configuration public for everyone.

## Adding a forum board

Add an entry to `boards` in `config.js`:

```js
{
  id: 'hardware',
  name: 'HARDWARE LAB',
  description: 'Repairs, retro systems, radio, embedded devices, and builds.',
  label: 'board:hardware'
}
```

Then create the matching `board:hardware` label in GitHub Issues. You may also extend `.github/workflows/bootstrap.yml` so the workflow creates it automatically.

# Chat behavior

The chat box displays comments from the Issue carrying the `eta:chat` label.

Because GitHub Pages is static, the site cannot securely post a comment on a visitor's behalf. Pressing **SEND** therefore:

1. Copies the composed message to the clipboard.
2. Opens the shared chat Issue.
3. Lets the visitor paste and submit through GitHub.
4. Refreshes the BBS feed when the visitor returns.

The default refresh interval is 90 seconds. GitHub permits unauthenticated reading of public repository data but applies a per-IP API limit, so very aggressive polling is intentionally avoided.

# Score verification

Door-game scores are saved immediately in the visitor's browser.

A visitor can submit a score to GitHub. The site displays it as **UNVERIFIED** until a repository maintainer adds:

```text
score:verified
```

You can hide unverified scores by setting this in `config.js`:

```js
showUnverifiedScores: false
```

# Security and privacy

- Never put a personal access token in `app.js`, `config.js`, or any public repository file.
- All GitHub forum posts and chat messages are public.
- The local callsign is cosmetic and stored only in the visitor's browser.
- The site stores door scores and demo messages in browser local storage.
- There are no BBS passwords or private messages in the GitHub-only edition.
- GitHub's moderation, blocking, interaction limits, locking, and reporting tools remain available.

# Important limitations

This is a convincing GitHub-native BBS, but GitHub Pages is not a permanent application server.

- Chat is a periodically refreshed public comment channel, not WebSocket chat.
- Posting and replying finish on GitHub.
- Separate ETA password accounts are not used.
- Private messaging is not supported.
- The interface reads the latest 100 Issues or comments per channel.
- Public API limits can temporarily force the interface into demo/degraded mode.

# File map

```text
index.html                          Main BBS interface
404.html                            GitHub Pages fallback
styles.css                          Full CRT/hacker theme
app.js                              GitHub adapter and interface logic
config.js                           Editable station configuration
doors/doors.js                      Six browser door games
assets/eta-sigil.svg                Site icon
manifest.webmanifest                Installable web-app metadata
.github/workflows/deploy.yml        GitHub Pages deployment
.github/workflows/bootstrap.yml     Labels and starter channels
.github/ISSUE_TEMPLATE/             Forum and score submission forms
```

## Licence

MIT. See `LICENSE`.
