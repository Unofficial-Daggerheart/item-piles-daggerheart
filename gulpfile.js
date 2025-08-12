const fs = require('fs-extra');
const archiver = require('archiver');

const distPath = "./dist";

/* ----------------------------------------- */
/*  Create versioned module file
/* ----------------------------------------- */

async function setVersion() {
  const path = `${distPath}/module.json`
  await fs.copy(`./module.json`, path);

  const version = process.env.RELEASE_VER || tag?.replace('v', '');
  console.log(`Set Version: ${version}`);
  const moduleData = JSON.parse(fs.readFileSync(path, 'utf8'));
  moduleData.version = version;

  // Write back to file
  fs.writeFileSync(path, JSON.stringify(moduleData, null, 2));
}


/* ----------------------------------------- */
/*  Build release files and archives
/* ----------------------------------------- */

async function buildRelease() {
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  // Create a file to stream archive data to
  const output = fs.createWriteStream(
    `${distPath}/module.zip`
  );
  output.on('close', function () {
    console.log(`Module data: ${archive.pointer()} bytes`);
  });

  // Create the output archive
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.on('error', function (err) {
    throw err;
  });
  archive.pipe(output);

  // Add files and packs
  archive.file(`${distPath}/module.json`, {
    name: 'module.json'
  });
  archive.file(`${distPath}/license.md`, {
    name: 'license.md'
  });
  archive.file(`${distPath}/README.md`, {
    name: 'README.md'
  });
  archive.directory('./module', 'module');

  // Finalize the archive
  await archive.finalize().then((resolve) => {
    output.close();
  });
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

module.exports = {
  version: setVersion,
  release: buildRelease
}