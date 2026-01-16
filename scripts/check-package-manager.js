#!/usr/bin/env node
/* eslint-disable no-undef */

const execPath = process.env.npm_execpath || "";
const isBlocked = execPath.includes("npm") || execPath.includes("npx") || execPath.includes("pnpm");

if (isBlocked) {
  console.error("\x1b[31m%s\x1b[0m", "⛔ This project only supports yarn!");
  console.error("\x1b[33m%s\x1b[0m", "Please use: yarn install");
  process.exit(1);
}
