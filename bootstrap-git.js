const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '.tools');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const gitZip = path.join(targetDir, 'mingit.zip');
const gitDest = path.join(targetDir, 'git');

console.log('Downloading Portable MinGit...');

function download(url, dest, cb) {
  https.get(url, (res) => {
    if (res.statusCode === 302 || res.statusCode === 301) {
      download(res.headers.location, dest, cb);
    } else if (res.statusCode === 200) {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(cb);
      });
    } else {
      console.error('Failed download status:', res.statusCode);
    }
  }).on('error', (err) => console.error(err));
}

download('https://github.com/git-for-windows/git/releases/download/v2.45.2.windows.1/MinGit-2.45.2-64-bit.zip', gitZip, () => {
  console.log('MinGit downloaded. Extracting...');
  if (!fs.existsSync(gitDest)) fs.mkdirSync(gitDest, { recursive: true });
  try {
    execSync(`tar -xf "${gitZip}" -C "${gitDest}"`);
    console.log('Portable Git extracted successfully to:', gitDest);
  } catch (err) {
    console.error('Extract error:', err.message);
  }
});
