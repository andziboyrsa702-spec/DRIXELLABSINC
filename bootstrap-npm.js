const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '.tools');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Downloading npm package bundle...');
const file = fs.createWriteStream(path.join(targetDir, 'npm.tgz'));

https.get('https://registry.npmjs.org/npm/-/npm-10.9.0.tgz', (response) => {
  if (response.statusCode === 302 || response.statusCode === 301) {
    https.get(response.headers.location, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log('Downloaded npm.tgz successfully.');
          extractNpm();
        });
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log('Downloaded npm.tgz successfully.');
        extractNpm();
      });
    });
  }
}).on('error', (err) => {
  console.error('Error downloading npm:', err);
});

function extractNpm() {
  console.log('Extracting npm...');
  try {
    const tarFile = path.join(targetDir, 'npm.tgz');
    const dest = path.join(targetDir, 'npm');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    
    // Use tar built into Windows
    execSync(`tar -xzf "${tarFile}" -C "${dest}"`);
    console.log('NPM extracted successfully to:', dest);
  } catch (err) {
    console.error('Extraction error:', err.message);
  }
}
