// Build the static site and publish it to the `gh-pages` branch.
// GitHub Pages serves that branch at https://<user>.github.io/learncivilwithme/
// Usage: npm run deploy
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, cpSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const remote = execSync("git remote get-url origin").toString().trim();

run("npm run build", { env: { ...process.env, PAGES_BASE_PATH: "/learncivilwithme" } });
writeFileSync("out/.nojekyll", ""); // let Pages serve the _next/ folder

const dir = mkdtempSync(join(tmpdir(), "lcwm-pages-"));
try {
  cpSync("out", dir, { recursive: true });
  const git = (cmd) => run(`git ${cmd}`, { cwd: dir });
  git("init -q -b gh-pages");
  git("add -A");
  git(`commit -q -m "Deploy ${new Date().toISOString()}"`);
  git(`push -f "${remote}" gh-pages`);
  console.log("\nDeployed. Live in ~1 minute at https://bibekbhattarai9811-create.github.io/learncivilwithme/");
} finally {
  rmSync(dir, { recursive: true, force: true });
}
