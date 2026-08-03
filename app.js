'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const STORAGE = {
  identity: 'eta-github-identity-v2',
  config: 'eta-github-config-v2',
  scores: 'eta-github-local-scores-v2',
  demoChat: 'eta-github-demo-chat-v2',
  chatDraft: 'eta-github-chat-draft-v2'
};

const DEMO = {
  issues: [
    {
      id: 'demo-101', number: 101, title: 'Welcome to the Electronik Tribulation Army',
      body: 'The carrier is online. Introduce yourself, test the door arcade, and help shape the station.',
      user: { login: 'GhostExodus', avatar_url: './assets/eta-sigil.svg', html_url: '#' },
      labels: [{ name: 'board:general' }], comments: 4,
      created_at: '2026-08-01T19:30:00Z', updated_at: '2026-08-03T09:44:00Z', html_url: '#', state: 'open'
    },
    {
      id: 'demo-102', number: 102, title: 'What did your first computer teach you?',
      body: 'Share the machine, operating system, BBS, or game that first made computing feel like a world rather than an appliance.',
      user: { login: 'ZeroCool88', avatar_url: './assets/eta-sigil.svg', html_url: '#' },
      labels: [{ name: 'board:hacker-culture' }], comments: 7,
      created_at: '2026-08-02T10:15:00Z', updated_at: '2026-08-03T08:03:00Z', html_url: '#', state: 'open'
    },
    {
      id: 'demo-103', number: 103, title: 'Defensive checklist for a newly exposed service',
      body: 'A practical checklist: minimize the attack surface, require strong authentication, patch dependencies, centralize logs, and test restoration before you need it.',
      user: { login: 'PacketWitch', avatar_url: './assets/eta-sigil.svg', html_url: '#' },
      labels: [{ name: 'board:cybersecurity' }], comments: 3,
      created_at: '2026-08-02T14:02:00Z', updated_at: '2026-08-02T20:11:00Z', html_url: '#', state: 'open'
    },
    {
      id: 'demo-104', number: 104, title: 'Corroboration before attribution',
      body: 'Do not collapse matching usernames, profile images, or writing style into identity. Preserve uncertainty and document what would falsify the working hypothesis.',
      user: { login: 'SourceVector', avatar_url: './assets/eta-sigil.svg', html_url: '#' },
      labels: [{ name: 'board:intelligence' }], comments: 9,
      created_at: '2026-08-01T16:50:00Z', updated_at: '2026-08-02T17:34:00Z', html_url: '#', state: 'open'
    },
    {
      id: 'demo-105', number: 105, title: '[SCORE] Neon Snake — 2400',
      body: '### Game\n\nNEON SNAKE\n\n### Score\n\n2400\n\n### Callsign\n\nBitShifter',
      user: { login: 'BitShifter', avatar_url: './assets/eta-sigil.svg', html_url: '#' },
      labels: [{ name: 'score:submission' }, { name: 'score:verified' }], comments: 0,
      created_at: '2026-08-02T18:00:00Z', updated_at: '2026-08-02T18:00:00Z', html_url: '#', state: 'closed'
    },
    {
      id: 'demo-106', number: 106, title: '[SCORE] Cipher Strike — 1789',
      body: '### Game\n\nCIPHER STRIKE\n\n### Score\n\n1789\n\n### Callsign\n\nSignalGhost',
      user: { login: 'SignalGhost', avatar_url: './assets/eta-sigil.svg', html_url: '#' },
      labels: [{ name: 'score:submission' }], comments: 0,
      created_at: '2026-08-03T07:40:00Z', updated_at: '2026-08-03T07:40:00Z', html_url: '#', state: 'open'
    },
    {
      id: 'demo-chat', number: 1, title: '[ETA CHAT] General Signal',
      body: 'This Issue is the public party line for the BBS.',
      user: { login: 'GhostExodus', avatar_url: './assets/eta-sigil.svg', html_url: '#' },
      labels: [{ name: 'eta:chat' }], comments: 4,
      created_at: '2026-08-01T12:00:00Z', updated_at: '2026-08-03T10:04:00Z', html_url: '#', state: 'open'
    }
  ],
  comments: {
    101: [
      demoComment('demo-c1', 'PacketWitch', 'Carrier received. The interface looks like trouble in the correct way.', '2026-08-01T20:01:00Z'),
      demoComment('demo-c2', 'SourceVector', 'Board labels make a surprisingly effective GitHub-native message base.', '2026-08-02T07:22:00Z')
    ],
    102: [
      demoComment('demo-c3', 'BitShifter', 'A beige 486, DOS, and the sound of a modem attempting to negotiate with the universe.', '2026-08-02T11:04:00Z')
    ],
    103: [
      demoComment('demo-c4', 'SignalGhost', 'Add rate limiting, an off-host backup, and a tested incident contact route.', '2026-08-02T15:20:00Z')
    ],
    104: [
      demoComment('demo-c5', 'GhostExodus', 'Treat inference as inference. A neat story is not the same thing as corroborated attribution.', '2026-08-02T18:00:00Z')
    ]
  },
  chat: [
    demoComment('demo-chat-1', 'GhostExodus', 'General signal is live. Check your carrier.', '2026-08-03T09:58:00Z'),
    demoComment('demo-chat-2', 'PacketWitch', 'Carrier locked. Running Codebreaker.', '2026-08-03T10:00:00Z'),
    demoComment('demo-chat-3', 'BitShifter', 'Neon Snake score packet inbound.', '2026-08-03T10:02:00Z'),
    demoComment('demo-chat-4', 'SourceVector', 'Received. Forum archive is clean.', '2026-08-03T10:04:00Z')
  ],
  members: [
    { login: 'GhostExodus', contributions: 42, avatar_url: './assets/eta-sigil.svg', html_url: '#' },
    { login: 'PacketWitch', contributions: 19, avatar_url: './assets/eta-sigil.svg', html_url: '#' },
    { login: 'SourceVector', contributions: 15, avatar_url: './assets/eta-sigil.svg', html_url: '#' },
    { login: 'BitShifter', contributions: 11, avatar_url: './assets/eta-sigil.svg', html_url: '#' },
    { login: 'SignalGhost', contributions: 8, avatar_url: './assets/eta-sigil.svg', html_url: '#' }
  ]
};

function demoComment(id, login, body, createdAt) {
  return { id, body, created_at: createdAt, updated_at: createdAt, html_url: '#', user: { login, avatar_url: './assets/eta-sigil.svg', html_url: '#' } };
}

const state = {
  config: mergeConfig(window.ETA_CONFIG || {}, readJson(STORAGE.config, {})),
  identity: readJson(STORAGE.identity, null),
  repo: null,
  live: false,
  fallback: false,
  issues: [],
  selectedBoard: null,
  currentThread: null,
  chatIssue: null,
  chatTimer: null,
  scoreTab: 'global',
  lastScore: null,
  cache: new Map(),
  rateRemaining: null
};

function mergeConfig(base, override) {
  if (!override || typeof override !== 'object') return structuredCloneSafe(base);
  const result = structuredCloneSafe(base);
  for (const [key, value] of Object.entries(override)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
      result[key] = { ...result[key], ...value };
    } else {
      result[key] = value;
    }
  }
  return result;
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function renderBody(value) {
  let text = escapeHtml(value || '');
  text = text.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/(https:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  return text.replace(/\n/g, '<br>');
}

function fmtDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'UNKNOWN DATE';
  return date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

function labelNames(issue) {
  return (issue.labels || []).map(label => typeof label === 'string' ? label : label.name);
}

function hasLabel(issue, name) {
  return labelNames(issue).includes(name);
}

function toast(message, error = false) {
  const el = $('#toast');
  el.textContent = message;
  el.style.borderColor = error ? 'var(--pink)' : 'var(--green)';
  el.style.color = error ? 'var(--pink)' : 'var(--green)';
  el.classList.remove('hidden');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.add('hidden'), 4200);
}

function openModal(id) {
  $('#' + id)?.classList.remove('hidden');
}

function closeModal(id) {
  $('#' + id)?.classList.add('hidden');
  if (id === 'gameModal' && window.ETADoors) window.ETADoors.stop();
}

function openExternal(url) {
  if (!url || url === '#') {
    toast('Connect this node to a GitHub repository first.', true);
    navigate('sysop');
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

function resolveRepository() {
  const explicitOwner = String(state.config.github?.owner || '').trim();
  const explicitRepo = String(state.config.github?.repo || '').trim();
  const identityOwner = String(state.identity?.owner || '').trim();
  const identityRepo = String(state.identity?.repo || '').trim();
  if (identityOwner && identityRepo) return { owner: identityOwner, repo: identityRepo, source: 'local identity' };
  if (explicitOwner && explicitRepo) return { owner: explicitOwner, repo: explicitRepo, source: 'config.js' };

  const host = location.hostname.toLowerCase();
  if (host.endsWith('.github.io')) {
    const owner = host.slice(0, -'.github.io'.length);
    const pathParts = location.pathname.split('/').filter(Boolean);
    const repo = pathParts[0] || `${owner}.github.io`;
    return { owner, repo, source: 'GitHub Pages URL' };
  }
  return null;
}

function repoUrl(path = '') {
  if (!state.repo) return '#';
  return `https://github.com/${encodeURIComponent(state.repo.owner)}/${encodeURIComponent(state.repo.repo)}${path}`;
}

function apiUrl(path) {
  return `https://api.github.com${path}`;
}

async function apiGet(path, { force = false, ttl = 45000 } = {}) {
  if (!state.repo) throw new Error('No GitHub repository configured.');
  const key = path;
  const cached = state.cache.get(key);
  if (!force && cached && Date.now() - cached.time < ttl) return cached.data;

  const response = await fetch(apiUrl(path), {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': state.config.github?.apiVersion || '2026-03-10'
    }
  });
  const remaining = response.headers.get('x-ratelimit-remaining');
  if (remaining !== null) {
    state.rateRemaining = Number(remaining);
    $('#apiRate').textContent = `API ${remaining}`;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.message || `GitHub API request failed (${response.status})`;
    throw new Error(message);
  }
  state.cache.set(key, { time: Date.now(), data });
  return data;
}

function bootSequence() {
  const lines = [
    '[BOOT] ETA GITHUB KERNEL 2.0',
    '[ OK ] STATIC CARRIER',
    '[ OK ] ISSUE ARCHIVE ADAPTER',
    '[ OK ] COMMENT CHANNEL',
    '[ OK ] LOCAL DOOR SUBSYSTEM',
    '[....] RESOLVING PUBLIC REPOSITORY',
    '[LINK] ELECTRONIK TRIBULATION ARMY BBS'
  ];
  let index = 0;
  const text = $('#bootText');
  const timer = setInterval(() => {
    text.textContent += lines[index++] + '\n';
    if (index === lines.length) {
      clearInterval(timer);
      setTimeout(() => {
        $('#boot').classList.add('hidden');
        initialize();
      }, 280);
    }
  }, 90);
}

async function initialize() {
  applyConfig();
  renderDoorGrid();
  renderBoardEditor(state.config.boards || []);
  setupClock();
  state.repo = resolveRepository();
  state.live = Boolean(state.repo);
  updateRepositoryDiagnostic();

  if (!state.identity) {
    populateIdentityForm();
    openModal('identityModal');
  } else {
    enterBBS();
  }
}

function enterBBS() {
  closeModal('identityModal');
  $('#app').classList.remove('hidden');
  state.repo = resolveRepository();
  state.live = Boolean(state.repo);
  applyConfig();
  updateRepositoryDiagnostic();
  navigate('home');
  loadOverview();
}

function applyConfig() {
  const config = state.config;
  document.title = config.bbsName || 'Electronik Tribulation Army BBS';
  $('#bbsName').textContent = String(config.bbsName || 'ETA BBS').toUpperCase();
  $('#tagline').textContent = String(config.tagline || '').toUpperCase();
  $('#heroTagline').textContent = String(config.tagline || '').toUpperCase();
  $('#announcement').textContent = config.announcement || '';
  $('#rulesText').textContent = config.rules || '';
  $('#locationLabel').textContent = `NODE: ${String(config.location || 'THE UNDERNET').toUpperCase()}`;
  $('#operatorName').textContent = String(state.identity?.callsign || 'GUEST').toUpperCase();
  $('#operatorRole').textContent = state.identity?.githubUsername ? `GITHUB: @${state.identity.githubUsername}` : 'LOCAL OPERATOR';
  $('#chatPrompt').textContent = `${String(state.identity?.callsign || 'guest').toLowerCase()}@eta:~$`;
  document.documentElement.style.setProperty('--green', config.theme?.accent || '#39ff88');
  document.documentElement.style.setProperty('--cyan', config.theme?.accent2 || '#00e5ff');
  document.documentElement.style.setProperty('--pink', config.theme?.danger || '#ff3b81');
  renderBoards();
  renderDoorGrid();
  populateConfigForm();
}

function setupClock() {
  const update = () => $('#clock').textContent = new Date().toLocaleTimeString([], { hour12: false }) + ' LOCAL';
  update();
  setInterval(update, 1000);
}

function updateMode(mode, message) {
  const badge = $('#modeBadge');
  const status = $('#nodeStatus');
  const dot = $('#nodeDot');
  badge.textContent = mode;
  status.textContent = message;
  badge.classList.toggle('demo', mode.includes('DEMO'));
  dot.classList.toggle('warning-dot', mode.includes('DEMO') || mode.includes('DEGRADED'));
}

function navigate(view) {
  $$('.view').forEach(element => element.classList.toggle('active', element.id === `view-${view}`));
  $$('#mainNav button').forEach(button => button.classList.toggle('active', button.dataset.view === view));
  stopChatTimer();
  if (view === 'chat') loadChat();
  if (view === 'members') loadMembers();
  if (view === 'scores') loadScores();
  if (view === 'sysop') {
    populateConfigForm();
    updateRepositoryDiagnostic();
  }
}

async function loadOverview(force = false) {
  $('#recentTraffic').innerHTML = '<div class="empty-state">Scanning repository traffic…</div>';
  if (!state.repo) {
    useDemoData('DEMO NODE', 'NO REPOSITORY CONNECTED');
    return;
  }

  try {
    const issues = await apiGet(`/repos/${encodeURIComponent(state.repo.owner)}/${encodeURIComponent(state.repo.repo)}/issues?state=all&per_page=100&sort=updated&direction=desc`, { force, ttl: 60000 });
    state.issues = issues.filter(issue => !issue.pull_request);
    state.chatIssue = state.issues.find(issue => hasLabel(issue, state.config.github.chatLabel));
    state.live = true;
    state.fallback = false;
    updateMode('GITHUB LIVE', `${state.repo.owner}/${state.repo.repo}`.toUpperCase());
    renderBoards();
    renderOverviewStats();
    renderRecentTraffic();
  } catch (error) {
    state.fallback = true;
    useDemoData('DEGRADED DEMO', 'GITHUB API UNAVAILABLE');
    toast(`Live repository scan failed: ${error.message}`, true);
  }
}

function useDemoData(mode, status) {
  state.issues = structuredCloneSafe(DEMO.issues);
  state.chatIssue = state.issues.find(issue => hasLabel(issue, state.config.github.chatLabel));
  updateMode(mode, status);
  renderBoards();
  renderOverviewStats();
  renderRecentTraffic();
}

function forumIssues() {
  const boardLabels = new Set((state.config.boards || []).map(board => board.label));
  return state.issues.filter(issue => labelNames(issue).some(label => boardLabels.has(label)));
}

function renderOverviewStats(chatCount = null) {
  const operators = new Set();
  state.issues.forEach(issue => issue.user?.login && operators.add(issue.user.login));
  const localScores = readJson(STORAGE.scores, []);
  $('#statUsers').textContent = operators.size || DEMO.members.length;
  $('#statPosts').textContent = forumIssues().length;
  $('#statChat').textContent = chatCount ?? state.chatIssue?.comments ?? 0;
  $('#statScores').textContent = localScores.length;
}

function renderRecentTraffic() {
  const items = forumIssues().slice(0, 6);
  $('#recentTraffic').innerHTML = items.length ? items.map(issue => `
    <button class="traffic-row" data-thread="${escapeHtml(issue.number)}">
      <span>${escapeHtml(issue.user?.login || 'unknown')}</span>
      <strong>${escapeHtml(issue.title)}</strong>
      <time>${fmtDate(issue.updated_at)}</time>
    </button>`).join('') : '<div class="empty-state">No public traffic detected.</div>';
  $$('[data-thread]', $('#recentTraffic')).forEach(button => button.addEventListener('click', () => openThread(Number(button.dataset.thread))));
}

function renderBoards() {
  const boards = state.config.boards || [];
  $('#boardList').innerHTML = boards.map(board => {
    const count = state.issues.filter(issue => hasLabel(issue, board.label)).length;
    return `<button class="board-item" data-board="${escapeHtml(board.id)}"><h3>${escapeHtml(board.name)}</h3><p>${escapeHtml(board.description)}</p><span class="board-count">${count} THREAD${count === 1 ? '' : 'S'}</span></button>`;
  }).join('');
  $$('.board-item', $('#boardList')).forEach(button => button.addEventListener('click', () => selectBoard(button.dataset.board)));
  if (state.selectedBoard && boards.some(board => board.id === state.selectedBoard)) selectBoard(state.selectedBoard);
}

function selectBoard(id) {
  state.selectedBoard = id;
  const board = (state.config.boards || []).find(item => item.id === id);
  $$('.board-item').forEach(button => button.classList.toggle('active', button.dataset.board === id));
  $('#postAreaTitle').textContent = board?.name || id;
  const posts = state.issues.filter(issue => board && hasLabel(issue, board.label));
  $('#postCount').textContent = `${posts.length} ITEMS`;
  $('#postList').innerHTML = posts.length ? posts.map(issue => `
    <button class="post-row" data-thread="${escapeHtml(issue.number)}">
      <strong>${escapeHtml(issue.title)}</strong>
      <span>${escapeHtml(issue.user?.login || 'unknown')} · ${issue.comments || 0} replies</span>
      <time>${fmtDate(issue.updated_at)}</time>
    </button>`).join('') : '<div class="empty-state">No transmissions yet. Be the first operator to open one.</div>';
  $$('[data-thread]', $('#postList')).forEach(button => button.addEventListener('click', () => openThread(Number(button.dataset.thread))));
}

async function openThread(number) {
  const issue = state.issues.find(item => Number(item.number) === Number(number));
  if (!issue) return;
  state.currentThread = issue;
  $('#threadDetail').innerHTML = '<div class="empty-state">Decrypting transmission…</div>';
  openModal('threadModal');

  let comments = [];
  try {
    if (!state.repo || String(issue.id).startsWith('demo-') || state.fallback) {
      comments = DEMO.comments[issue.number] || [];
    } else {
      comments = await apiGet(`/repos/${encodeURIComponent(state.repo.owner)}/${encodeURIComponent(state.repo.repo)}/issues/${issue.number}/comments?per_page=100`, { ttl: 30000 });
    }
  } catch (error) {
    toast(`Replies could not be loaded: ${error.message}`, true);
  }

  $('#threadDetail').innerHTML = `
    <div class="post-head">
      <h2>${escapeHtml(issue.title)}</h2>
      <div class="post-meta">#${issue.number} // ${escapeHtml(issue.user?.login || 'unknown')} // ${fmtDate(issue.created_at)} // ${escapeHtml(issue.state || 'open')}</div>
    </div>
    <div class="message-body rendered-body">${renderBody(issue.body || '[NO MESSAGE BODY]')}</div>
    <h3>REPLIES [${comments.length}]</h3>
    ${comments.length ? comments.map(comment => `
      <div class="reply-block">
        <strong>${escapeHtml(comment.user?.login || 'unknown')}</strong>
        <span class="post-meta">${fmtDate(comment.created_at)}</span>
        <div class="message-body rendered-body">${renderBody(comment.body)}</div>
      </div>`).join('') : '<div class="empty-state slim">No replies received.</div>'}
  `;
  $('#replyOnGithub').disabled = !state.repo || issue.html_url === '#';
}

function newThread() {
  const board = (state.config.boards || []).find(item => item.id === state.selectedBoard) || state.config.boards?.[0];
  if (!state.repo || !board) {
    toast('Connect the BBS to a GitHub repository before opening a public thread.', true);
    navigate('sysop');
    return;
  }
  const params = new URLSearchParams({
    template: 'transmission.yml',
    labels: board.label,
    title: `[${board.name}] `
  });
  openExternal(`${repoUrl('/issues/new')}?${params.toString()}`);
}

async function loadChat(force = false) {
  stopChatTimer();
  $('#chatLog').innerHTML = '<div class="empty-state">Opening public signal…</div>';
  if (!state.repo || state.fallback) {
    renderDemoChat();
    $('#chatRefreshLabel').textContent = 'LOCAL DEMO CHANNEL';
    $('#chatStatus').innerHTML = '<span></span> DEMO UPLINK';
    return;
  }

  if (!state.chatIssue) {
    await loadOverview(force);
  }
  if (!state.chatIssue) {
    $('#chatLog').innerHTML = '<div class="empty-state">Chat Issue not found. Run the Bootstrap ETA BBS workflow from the Sysop Console.</div>';
    $('#chatStatus').textContent = 'CHANNEL MISSING';
    return;
  }

  try {
    const comments = await apiGet(`/repos/${encodeURIComponent(state.repo.owner)}/${encodeURIComponent(state.repo.repo)}/issues/${state.chatIssue.number}/comments?per_page=100`, { force, ttl: 45000 });
    renderChat(comments);
    renderOverviewStats(comments.length);
    $('#chatStatus').innerHTML = '<span></span> GITHUB UPLINK';
    const refresh = Math.max(60, Number(state.config.github.refreshSeconds) || 90);
    $('#chatRefreshLabel').textContent = `AUTO REFRESH: ${refresh}s`;
    state.chatTimer = setInterval(() => loadChat(true), refresh * 1000);
  } catch (error) {
    $('#chatLog').innerHTML = `<div class="empty-state">Public signal failed: ${escapeHtml(error.message)}</div>`;
    toast(error.message, true);
  }
}

function renderChat(comments) {
  $('#chatLog').innerHTML = comments.length ? comments.map(comment => `
    <div class="chat-line" data-message="${escapeHtml(comment.id)}">
      <time>${new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
      <strong>&lt;${escapeHtml(comment.user?.login || 'unknown')}&gt;</strong>
      <p>${renderBody(comment.body)}</p>
    </div>`).join('') : '<div class="empty-state">The channel is silent. Post the first burst on GitHub.</div>';
  $('#chatLog').scrollTop = $('#chatLog').scrollHeight;
}

function renderDemoChat() {
  const local = readJson(STORAGE.demoChat, []);
  const combined = [...DEMO.chat, ...local].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  renderChat(combined);
  renderOverviewStats(combined.length);
}

function stopChatTimer() {
  if (state.chatTimer) clearInterval(state.chatTimer);
  state.chatTimer = null;
}

async function submitChatMessage(body) {
  const message = String(body || '').trim();
  if (!message) return;
  if (!state.repo || state.fallback) {
    const local = readJson(STORAGE.demoChat, []);
    local.push(demoComment(`local-${Date.now()}`, state.identity?.callsign || 'GUEST', message, new Date().toISOString()));
    writeJson(STORAGE.demoChat, local.slice(-100));
    renderDemoChat();
    toast('Demo signal stored in this browser.');
    return;
  }
  if (!state.chatIssue) {
    toast('Chat Issue is missing. Run the bootstrap workflow.', true);
    navigate('sysop');
    return;
  }
  await copyText(message);
  sessionStorage.setItem(STORAGE.chatDraft, message);
  openExternal(`${state.chatIssue.html_url}#new_comment_field`);
  toast('Message copied. Paste it into the GitHub comment box and submit.');
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
}

function renderDoorGrid() {
  $('#doorGrid').innerHTML = (state.config.doors || []).map(door => `
    <button class="door-card" data-game="${escapeHtml(door.id)}">
      <span class="door-icon">${escapeHtml(door.icon)}</span>
      <h3>${escapeHtml(door.name)}</h3>
      <p>${escapeHtml(door.description)}</p>
      <em>${escapeHtml(door.type)}</em>
    </button>`).join('');
  $$('.door-card', $('#doorGrid')).forEach(card => card.addEventListener('click', () => launchDoor(card.dataset.game, card.querySelector('h3').textContent)));
}

function launchDoor(game, title) {
  $('#gameTitle').textContent = `${title}.EXE`;
  $('#scoreDock').classList.add('hidden');
  state.lastScore = null;
  openModal('gameModal');
  window.ETADoors.launch(game, $('#gameHost'), (gameId, score) => captureScore(gameId, score));
}

function captureScore(game, score) {
  const entry = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    game,
    score: Math.max(0, Math.floor(Number(score) || 0)),
    callsign: state.identity?.callsign || 'GUEST',
    createdAt: new Date().toISOString()
  };
  const scores = readJson(STORAGE.scores, []);
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score);
  writeJson(STORAGE.scores, scores.slice(0, 200));
  state.lastScore = entry;
  $('#capturedScore').textContent = `${gameDisplayName(game)} // ${entry.score.toLocaleString()}`;
  $('#scoreDock').classList.remove('hidden');
  renderOverviewStats();
  toast(`Score packet captured: ${entry.score.toLocaleString()}`);
}

function gameDisplayName(id) {
  const normalized = String(id || '').toLowerCase();
  const map = {
    'neon-snake': 'NEON SNAKE', snake: 'NEON SNAKE',
    codebreaker: 'CODEBREAKER',
    'packet-runner': 'PACKET RUNNER', packet: 'PACKET RUNNER',
    'void-jack': 'VOID JACK', blackjack: 'VOID JACK',
    'sector-trader': 'SECTOR TRADER', trader: 'SECTOR TRADER',
    'cipher-strike': 'CIPHER STRIKE', cipher: 'CIPHER STRIKE'
  };
  return map[normalized] || String(id || 'UNKNOWN DOOR').toUpperCase();
}

function scoreSubmissionUrl(entry) {
  if (!state.repo || !entry) return '#';
  const game = gameDisplayName(entry.game);
  const params = new URLSearchParams({
    template: 'score-submission.yml',
    labels: state.config.github.scoreLabel,
    title: `[SCORE] ${game} — ${entry.score}`,
    game,
    score: String(entry.score),
    callsign: entry.callsign || state.identity?.callsign || 'GUEST'
  });
  return `${repoUrl('/issues/new')}?${params.toString()}`;
}

function submitScore(entry) {
  if (!entry) {
    toast('No local score packet is available.', true);
    return;
  }
  if (!state.repo) {
    toast('Connect a GitHub repository before submitting global scores.', true);
    navigate('sysop');
    return;
  }
  openExternal(scoreSubmissionUrl(entry));
}

async function loadScores(force = false) {
  if (state.scoreTab === 'local') {
    renderLocalScores();
    return;
  }
  $('#scoreBoardTitle').textContent = 'GLOBAL GITHUB SCOREBOARD';
  $('#scoreTable').innerHTML = '<div class="empty-state">Scanning score packets…</div>';
  let issues;
  try {
    if (!state.repo || state.fallback) {
      issues = DEMO.issues.filter(issue => hasLabel(issue, state.config.github.scoreLabel));
    } else {
      issues = await apiGet(`/repos/${encodeURIComponent(state.repo.owner)}/${encodeURIComponent(state.repo.repo)}/issues?state=all&labels=${encodeURIComponent(state.config.github.scoreLabel)}&per_page=100&sort=created&direction=desc`, { force, ttl: 60000 });
      issues = issues.filter(issue => !issue.pull_request);
    }
    const scores = issues.map(parseScoreIssue).filter(Boolean)
      .filter(score => state.config.github.showUnverifiedScores || score.verified)
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);
    renderScoreRows(scores, true);
  } catch (error) {
    $('#scoreTable').innerHTML = `<div class="empty-state">Score scan failed: ${escapeHtml(error.message)}</div>`;
  }
}

function parseScoreIssue(issue) {
  const body = issue.body || '';
  const headingValue = heading => {
    const match = body.match(new RegExp(`###\\s+${heading}\\s*\\n+([^\\n]+)`, 'i'));
    return match ? match[1].trim() : '';
  };
  const titleMatch = issue.title?.match(/^\[SCORE\]\s*(.+?)\s*[—–:-]\s*([\d,]+)/i);
  const game = headingValue('Game') || titleMatch?.[1] || '';
  const numeric = headingValue('Score') || titleMatch?.[2] || '';
  const score = Number(String(numeric).replace(/[^0-9]/g, ''));
  if (!game || !Number.isFinite(score)) return null;
  return {
    game: game.toUpperCase(),
    score,
    callsign: headingValue('Callsign') || issue.user?.login || 'UNKNOWN',
    githubUser: issue.user?.login || '',
    createdAt: issue.created_at,
    url: issue.html_url,
    verified: hasLabel(issue, state.config.github.verifiedScoreLabel)
  };
}

function renderLocalScores() {
  $('#scoreBoardTitle').textContent = 'LOCAL DEVICE SCOREBOARD';
  const scores = readJson(STORAGE.scores, []).sort((a, b) => b.score - a.score).slice(0, 100).map(entry => ({
    game: gameDisplayName(entry.game), score: entry.score, callsign: entry.callsign, createdAt: entry.createdAt, verified: true, local: true
  }));
  renderScoreRows(scores, false);
}

function renderScoreRows(scores, global) {
  $('#scoreTable').innerHTML = `<div class="score-row header"><span>RANK</span><span>OPERATOR</span><span>DOOR</span><span>SCORE</span><span>${global ? 'STATUS' : 'DATE'}</span></div>` + (scores.length ? scores.map((score, index) => `
    <${score.url ? 'a' : 'div'} class="score-row score-link" ${score.url ? `href="${escapeHtml(score.url)}" target="_blank" rel="noopener noreferrer"` : ''}>
      <span>#${String(index + 1).padStart(2, '0')}</span>
      <strong>${escapeHtml(score.callsign)}</strong>
      <span>${escapeHtml(score.game)}</span>
      <strong>${Number(score.score).toLocaleString()}</strong>
      <span>${global ? (score.verified ? 'VERIFIED' : 'UNVERIFIED') : fmtDate(score.createdAt)}</span>
    </${score.url ? 'a' : 'div'}>`).join('') : '<div class="empty-state">No score packets received.</div>');
}

async function loadMembers(force = false) {
  $('#memberGrid').innerHTML = '<div class="empty-state">Resolving operator identities…</div>';
  let members;
  try {
    if (!state.repo || state.fallback) {
      members = DEMO.members;
    } else {
      const contributors = await apiGet(`/repos/${encodeURIComponent(state.repo.owner)}/${encodeURIComponent(state.repo.repo)}/contributors?per_page=100&anon=1`, { force, ttl: 120000 });
      const issueAuthors = new Map();
      state.issues.forEach(issue => {
        if (issue.user?.login) issueAuthors.set(issue.user.login, issue.user);
      });
      members = [...contributors];
      issueAuthors.forEach(user => {
        if (!members.some(member => member.login === user.login)) members.push({ ...user, contributions: 0 });
      });
    }
    $('#memberCount').textContent = `${members.length} IDENTITIES`;
    $('#memberGrid').innerHTML = members.length ? members.map(member => `
      <a class="member-card" href="${escapeHtml(member.html_url || '#')}" ${member.html_url && member.html_url !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        <img src="${escapeHtml(member.avatar_url || './assets/eta-sigil.svg')}" alt="" loading="lazy">
        <div><strong>${escapeHtml(member.login || member.name || 'ANONYMOUS')}</strong><span>GITHUB OPERATOR</span><time>${Number(member.contributions || 0)} REPOSITORY CONTRIBUTIONS</time></div>
      </a>`).join('') : '<div class="empty-state">No operators detected.</div>';
  } catch (error) {
    $('#memberGrid').innerHTML = `<div class="empty-state">Identity scan failed: ${escapeHtml(error.message)}</div>`;
  }
}

function populateIdentityForm() {
  const form = $('#identityForm');
  form.elements.callsign.value = state.identity?.callsign || '';
  form.elements.githubUsername.value = state.identity?.githubUsername || '';
  form.elements.owner.value = state.identity?.owner || state.config.github?.owner || '';
  form.elements.repo.value = state.identity?.repo || state.config.github?.repo || '';
}

function saveIdentity(values) {
  state.identity = {
    callsign: String(values.callsign || 'GUEST').trim().slice(0, 32),
    githubUsername: String(values.githubUsername || '').trim().slice(0, 39),
    owner: String(values.owner || '').trim().slice(0, 39),
    repo: String(values.repo || '').trim().slice(0, 100)
  };
  writeJson(STORAGE.identity, state.identity);
}

function populateConfigForm() {
  const form = $('#configForm');
  if (!form) return;
  const config = state.config;
  ['bbsName', 'shortName', 'sysopName', 'tagline', 'location', 'announcement', 'rules'].forEach(key => {
    if (form.elements[key]) form.elements[key].value = config[key] || '';
  });
  form.elements.owner.value = config.github?.owner || state.identity?.owner || '';
  form.elements.repo.value = config.github?.repo || state.identity?.repo || '';
  form.elements.refreshSeconds.value = Math.max(60, Number(config.github?.refreshSeconds) || 90);
  form.elements.showUnverifiedScores.checked = Boolean(config.github?.showUnverifiedScores);
  renderBoardEditor(config.boards || []);
}

function renderBoardEditor(boards) {
  const editor = $('#boardEditor');
  if (!editor) return;
  editor.innerHTML = boards.map((board, index) => `
    <div class="board-editor-row github-board-editor" data-index="${index}">
      <input data-field="id" value="${escapeHtml(board.id)}" placeholder="id">
      <input data-field="name" value="${escapeHtml(board.name)}" placeholder="name">
      <input data-field="label" value="${escapeHtml(board.label)}" placeholder="board:label">
      <input data-field="description" value="${escapeHtml(board.description)}" placeholder="description">
      <button type="button" data-remove-board>×</button>
    </div>`).join('');
  $$('[data-remove-board]', editor).forEach(button => button.addEventListener('click', () => button.closest('.board-editor-row').remove()));
}

function collectBoards() {
  return $$('.board-editor-row', $('#boardEditor')).map(row => ({
    id: $('[data-field="id"]', row).value.trim(),
    name: $('[data-field="name"]', row).value.trim(),
    label: $('[data-field="label"]', row).value.trim(),
    description: $('[data-field="description"]', row).value.trim()
  })).filter(board => board.id && board.name && board.label);
}

function applyLocalConfig() {
  const form = $('#configForm');
  const next = structuredCloneSafe(state.config);
  ['bbsName', 'shortName', 'sysopName', 'tagline', 'location', 'announcement', 'rules'].forEach(key => next[key] = form.elements[key].value.trim());
  next.github = {
    ...next.github,
    owner: form.elements.owner.value.trim(),
    repo: form.elements.repo.value.trim(),
    refreshSeconds: Math.max(60, Number(form.elements.refreshSeconds.value) || 90),
    showUnverifiedScores: form.elements.showUnverifiedScores.checked
  };
  next.boards = collectBoards();
  state.config = next;
  writeJson(STORAGE.config, next);
  state.repo = resolveRepository();
  state.live = Boolean(state.repo);
  state.cache.clear();
  applyConfig();
  updateRepositoryDiagnostic();
  loadOverview(true);
  toast('Local configuration preview applied. Export config.js to make it permanent.');
}

function exportConfig() {
  const payload = `/* Electronik Tribulation Army BBS — generated by the Sysop Console */\nwindow.ETA_CONFIG = ${JSON.stringify(state.config, null, 2)};\n`;
  const blob = new Blob([payload], { type: 'text/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'config.js';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('config.js exported. Replace the repository copy and commit it.');
}

function resetLocalConfig() {
  localStorage.removeItem(STORAGE.config);
  state.config = structuredCloneSafe(window.ETA_CONFIG || {});
  state.cache.clear();
  state.repo = resolveRepository();
  applyConfig();
  updateRepositoryDiagnostic();
  loadOverview(true);
  toast('Local configuration overrides cleared.');
}

function updateRepositoryDiagnostic() {
  state.repo = resolveRepository();
  const diagnostic = $('#repoDiagnostic');
  if (!diagnostic) return;
  if (state.repo) {
    diagnostic.innerHTML = `<strong>CONNECTED TARGET</strong><br>${escapeHtml(state.repo.owner)}/${escapeHtml(state.repo.repo)}<br><small>Detected from ${escapeHtml(state.repo.source)}.</small>`;
  } else {
    diagnostic.innerHTML = '<strong>DEMO MODE</strong><br>No GitHub owner/repository detected.<br><small>Set them here when using a custom domain.</small>';
  }
  ['openRepoBtn', 'openBootstrapBtn', 'openPagesBtn', 'openIssuesBtn'].forEach(id => $('#' + id).disabled = !state.repo);
}

function matrixEffect() {
  const canvas = $('#matrix');
  const context = canvas.getContext('2d');
  let columns = [];
  const font = 14;
  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    columns = Array(Math.ceil(canvas.width / font)).fill(1);
  }
  function draw() {
    context.fillStyle = 'rgba(3,5,4,.09)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green') || '#39ff88';
    context.font = `${font}px monospace`;
    columns.forEach((y, index) => {
      const character = String.fromCharCode(0x30A0 + Math.random() * 96);
      context.fillText(character, index * font, y * font);
      if (y * font > canvas.height && Math.random() > .975) columns[index] = 0;
      columns[index]++;
    });
    requestAnimationFrame(draw);
  }
  addEventListener('resize', resize);
  resize();
  draw();
}

$('#identityForm').addEventListener('submit', event => {
  event.preventDefault();
  saveIdentity(Object.fromEntries(new FormData(event.currentTarget)));
  enterBBS();
});

$('#enterDemoBtn').addEventListener('click', () => {
  saveIdentity({ callsign: $('#identityForm').elements.callsign.value || 'GUEST', githubUsername: '', owner: '', repo: '' });
  enterBBS();
});

$('#profileBtn').addEventListener('click', () => {
  populateIdentityForm();
  openModal('identityModal');
});

$$('[data-view], .jump').forEach(button => button.addEventListener('click', () => navigate(button.dataset.view)));
$$('[data-close]').forEach(button => button.addEventListener('click', () => closeModal(button.dataset.close)));

$('#refreshOverview').addEventListener('click', () => loadOverview(true));
$('#newPostBtn').addEventListener('click', newThread);
$('#replyOnGithub').addEventListener('click', () => openExternal(state.currentThread?.html_url ? `${state.currentThread.html_url}#new_comment_field` : '#'));

$('#chatForm').addEventListener('submit', async event => {
  event.preventDefault();
  const input = event.currentTarget.elements.body;
  const message = input.value;
  input.value = '';
  await submitChatMessage(message);
});

$('#refreshMembers').addEventListener('click', () => loadMembers(true));
$('#refreshScores').addEventListener('click', () => loadScores(true));

$$('[data-score-tab]').forEach(button => button.addEventListener('click', () => {
  state.scoreTab = button.dataset.scoreTab;
  $$('[data-score-tab]').forEach(item => item.classList.toggle('active', item === button));
  loadScores();
}));

$('#submitCapturedScore').addEventListener('click', () => submitScore(state.lastScore));
$('#submitBestScore').addEventListener('click', () => {
  const best = readJson(STORAGE.scores, []).sort((a, b) => b.score - a.score)[0];
  submitScore(best);
});

$('#configForm').addEventListener('submit', event => {
  event.preventDefault();
  applyLocalConfig();
});

$('#addBoardBtn').addEventListener('click', () => {
  const boards = collectBoards();
  boards.push({ id: `board-${boards.length + 1}`, name: 'NEW BOARD', label: `board:new-${boards.length + 1}`, description: 'Edit this board description.' });
  renderBoardEditor(boards);
});

$('#exportConfigBtn').addEventListener('click', exportConfig);
$('#resetConfigBtn').addEventListener('click', resetLocalConfig);
$('#openRepoBtn').addEventListener('click', () => openExternal(repoUrl()));
$('#openBootstrapBtn').addEventListener('click', () => openExternal(repoUrl('/actions/workflows/bootstrap.yml')));
$('#openPagesBtn').addEventListener('click', () => openExternal(repoUrl('/settings/pages')));
$('#openIssuesBtn').addEventListener('click', () => openExternal(repoUrl('/issues')));

addEventListener('focus', () => {
  if ($('#view-chat').classList.contains('active') && state.repo) loadChat(true);
});

addEventListener('keydown', event => {
  if (event.key === 'Escape') ['threadModal', 'gameModal'].forEach(closeModal);
  if (event.altKey && /^[1-6]$/.test(event.key)) navigate(['home', 'boards', 'chat', 'doors', 'members', 'scores'][Number(event.key) - 1]);
});

matrixEffect();
bootSequence();
