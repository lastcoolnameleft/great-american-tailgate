/* This is a script to create a new post markdown file with front-matter */

import fs from "node:fs";
import path from "node:path";

function printHelp() {
	console.log(`Create a new Markdown post with starter front matter.

Usage:
  pnpm new-post <filename>
  node scripts/new-post.js <filename>

Arguments:
  <filename>  Post path relative to src/content/posts; .md is optional

Options:
  -h, --help  Show this help information

Examples:
  pnpm new-post my-tailgate
  pnpm new-post 2026/my-tailgate.md`);
}

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
	printHelp();
	process.exit(0);
}

let fileName = args[0];

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i;
if (!fileExtensionRegex.test(fileName)) {
	fileName += ".md";
}

const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, fileName);

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists `);
	process.exit(1);
}

// recursive mode creates multi-level directories
const dirPath = path.dirname(fullPath);
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

const content = `---
title: ${args[0]}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`;

fs.writeFileSync(path.join(targetDir, fileName), content);

console.log(`Post ${fullPath} created`);
