/*
  Electronik Tribulation Army BBS — GitHub Edition

  This is the main file a sysop edits. The site can usually detect the
  GitHub owner/repository automatically when hosted at username.github.io.
  Set github.owner and github.repo explicitly when using a custom domain.
*/
window.ETA_CONFIG = {
  version: '2.0.0-github',
  bbsName: 'Electronik Tribulation Army BBS',
  shortName: 'ETA BBS',
  sysopName: 'GhostExodus',
  tagline: 'Signal Through the Static',
  location: 'The Undernet',
  announcement: 'The carrier is live. Enter the boards, monitor the public signal, and test your reflexes in the door arcade.',
  rules: 'Think clearly. Verify claims. Respect other operators. Keep illegal activity, doxxing, malware, and harassment off the node.',
  github: {
    owner: '',
    repo: '',
    branch: 'main',
    chatLabel: 'eta:chat',
    scoreLabel: 'score:submission',
    verifiedScoreLabel: 'score:verified',
    announcementLabel: 'eta:announcement',
    refreshSeconds: 90,
    showUnverifiedScores: true,
    apiVersion: '2026-03-10'
  },
  theme: {
    accent: '#39ff88',
    accent2: '#00e5ff',
    danger: '#ff3b81'
  },
  boards: [
    {
      id: 'general',
      name: 'GENERAL TRANSMISSIONS',
      description: 'Open discussion, introductions, station news, and general signal traffic.',
      label: 'board:general'
    },
    {
      id: 'hacker-culture',
      name: 'HACKER CULTURE',
      description: 'Computing history, digital subcultures, hardware, software, and creative experimentation.',
      label: 'board:hacker-culture'
    },
    {
      id: 'cybersecurity',
      name: 'CYBERSECURITY',
      description: 'Defensive security, research, incident analysis, privacy, and responsible disclosure.',
      label: 'board:cybersecurity'
    },
    {
      id: 'intelligence',
      name: 'INTELLIGENCE OPERATIONS',
      description: 'OSINT methodology, verification, source evaluation, and investigative tradecraft.',
      label: 'board:intelligence'
    },
    {
      id: 'door-games',
      name: 'DOOR GAME SCORES',
      description: 'Challenges, tactics, rivalries, and operator score reports.',
      label: 'board:door-games'
    }
  ],
  doors: [
    { id: 'snake', name: 'NEON SNAKE', description: 'Eat data blocks. Avoid your own corrupted trail.', type: 'ARCADE / REFLEX', icon: '▦' },
    { id: 'codebreaker', name: 'CODEBREAKER', description: 'Crack a four-digit access sequence before trace completes.', type: 'PUZZLE / LOGIC', icon: '⌘' },
    { id: 'packet', name: 'PACKET RUNNER', description: 'Dodge firewalls and keep the payload moving.', type: 'ARCADE / ENDLESS', icon: '⇶' },
    { id: 'blackjack', name: 'VOID JACK', description: 'Beat the house node without crossing twenty-one.', type: 'CARDS / CHANCE', icon: '♠' },
    { id: 'trader', name: 'SECTOR TRADER', description: 'Buy low, jump sectors, sell high, survive ten cycles.', type: 'STRATEGY / TRADING', icon: '¤' },
    { id: 'cipher', name: 'CIPHER STRIKE', description: 'Decode scrambled words against a running clock.', type: 'WORDS / SPEED', icon: 'AZ' }
  ]
};
