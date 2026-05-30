#!/usr/bin/env node
/**
 * validate-events.js — Check every event in dist/index.html has at least one choice.
 * Uses a simple state-machine approach: find each event id, then find its choices bracket.
 * Exit code 0 = all good, 1 = problems found.
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../dist/index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract EVENTS block
const eventsStart = html.indexOf('const EVENTS = {');
if (eventsStart === -1) {
  console.error('FAIL: Could not find EVENTS declaration');
  process.exit(1);
}

// Find end: walk braces
let depth = 0, eventsEnd = -1;
for (let i = eventsStart; i < html.length; i++) {
  if (html[i] === '{') depth++;
  else if (html[i] === '}') { depth--; if (depth === 0) { eventsEnd = i + 1; break; } }
}
if (eventsEnd === -1) { console.error('FAIL: Unclosed EVENTS block'); process.exit(1); }

const block = html.substring(eventsStart, eventsEnd);

// Find all event ids and their positions
const idRegex = /id:\s*'([^']+)'/g;
const problems = [];
let totalEvents = 0;
let idMatch;

while ((idMatch = idRegex.exec(block)) !== null) {
  const evId = idMatch[1];
  const idPos = idMatch.index;
  
  // Find the next "choices: [" after this id
  const choicesStart = block.indexOf('choices: [', idPos);
  if (choicesStart === -1) {
    problems.push(`Event "${evId}": no choices array found`);
    continue;
  }
  
  // Find the matching closing bracket
  const bracketStart = block.indexOf('[', choicesStart);
  let bDepth = 0, bracketEnd = -1;
  for (let i = bracketStart; i < block.length; i++) {
    if (block[i] === '[') bDepth++;
    else if (block[i] === ']') { bDepth--; if (bDepth === 0) { bracketEnd = i; break; } }
  }
  if (bracketEnd === -1) {
    problems.push(`Event "${evId}": unclosed choices bracket`);
    continue;
  }
  
  const choicesContent = block.substring(bracketStart + 1, bracketEnd).trim();
  totalEvents++;
  
  if (choicesContent.length === 0) {
    problems.push(`Event "${evId}": choices array is EMPTY — no buttons will render`);
  } else if (!choicesContent.includes('{')) {
    problems.push(`Event "${evId}": choices array has no choice objects`);
  }
}

console.log(`Validated ${totalEvents} events.`);

if (problems.length > 0) {
  console.error(`\nFAIL: ${problems.length} issue(s):\n`);
  problems.forEach(p => console.error(`  ✗ ${p}`));
  process.exit(1);
} else {
  console.log('PASS: All events have non-empty choices arrays.');
  process.exit(0);
}
