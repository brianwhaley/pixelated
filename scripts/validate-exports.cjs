const fs = require('fs');
const glob = require('glob');

console.log('🔍 Validating exports...\n');

// Find all .ts files (excluding .d.ts, test files, stories, examples, types.ts)
const tsFiles = glob.sync('src/components/**/*.ts', {
  ignore: [
    '**/*.d.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/*.stories.ts',
    '**/documentation/**',
    '**/examples/**',
    '**/*.example.*',
  ]
});

// Find all .tsx files (excluding test files, stories, examples)
const tsxFiles = glob.sync('src/components/**/*.tsx', {
  ignore: [
    '**/*.test.tsx',
    '**/*.spec.tsx',
    '**/*.stories.tsx',
    '**/documentation/**',
    '**/examples/**',
    '**/*.example.*'
  ]
});

// Read index files
const indexServer = fs.readFileSync('src/index.server.js', 'utf8');
const indexClient = fs.readFileSync('src/index.js', 'utf8');

const missing = {
  server: [],
  client: []
};

// Check .ts files in index.server.js
tsFiles.forEach(file => {
  const exportPath = file.replace('src/', './').replace('.ts', '');
  if (!indexServer.includes(`from '${exportPath}'`)) {
    missing.server.push(exportPath);
  }
});

// Check all .ts and .tsx files in index.js
[...tsFiles, ...tsxFiles].forEach(file => {
  const exportPath = file.replace('src/', './').replace(/\.tsx?$/, '');
  if (!indexClient.includes(`from '${exportPath}'`)) {
    missing.client.push(exportPath);
  }
});

// Check for exports that point to non-existent files
const invalidExports = {
  server: [],
  client: []
};

// Remove comments from content before checking exports
function removeComments(content) {
  // Remove single-line comments (// ...) 
  content = content.replace(/\/\/.*$/gm, '');
  // Remove multi-line comments (/* ... */)
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  return content;
}

const indexServerNoComments = removeComments(indexServer);
const indexClientNoComments = removeComments(indexClient);

// Extract all export paths from index.server.js (excluding comments)
const serverExportMatches = indexServerNoComments.matchAll(/from\s+['"](\.[^'"]+)['"]/g);
for (const match of serverExportMatches) {
  const exportPath = match[1];
  const filePath = exportPath.replace('./', 'src/');
  
  // Check if .ts or .tsx file exists
  const tsExists = fs.existsSync(`${filePath}.ts`);
  const tsxExists = fs.existsSync(`${filePath}.tsx`);
  
  if (!tsExists && !tsxExists) {
    invalidExports.server.push(exportPath);
  }
}

// Extract all export paths from index.js (excluding comments)
const clientExportMatches = indexClientNoComments.matchAll(/from\s+['"](\.[^'"]+)['"]/g);
for (const match of clientExportMatches) {
  const exportPath = match[1];
  const filePath = exportPath.replace('./', 'src/');
  
  // Check if .ts or .tsx file exists
  const tsExists = fs.existsSync(`${filePath}.ts`);
  const tsxExists = fs.existsSync(`${filePath}.tsx`);
  const jsExists = fs.existsSync(`${filePath}.js`);
  const jsxExists = fs.existsSync(`${filePath}.jsx`);
  
  if (!tsExists && !tsxExists && !jsExists && !jsxExists) {
    invalidExports.client.push(exportPath);
  }
}

// Report results
let hasErrors = false;

if (missing.server.length > 0) {
  console.error('❌ Missing from index.server.js:');
  missing.server.forEach(p => console.error(`   ${p}`));
  console.error('');
  hasErrors = true;
}

if (missing.client.length > 0) {
  console.error('❌ Missing from index.js:');
  missing.client.forEach(p => console.error(`   ${p}`));
  console.error('');
  hasErrors = true;
}

if (invalidExports.server.length > 0) {
  console.error('❌ Invalid exports in index.server.js (file does not exist):');
  invalidExports.server.forEach(p => console.error(`   ${p}`));
  console.error('');
  hasErrors = true;
}

if (invalidExports.client.length > 0) {
  console.error('❌ Invalid exports in index.js (file does not exist):');
  invalidExports.client.forEach(p => console.error(`   ${p}`));
  console.error('');
  hasErrors = true;
}

if (hasErrors) {
  console.error('💥 Export validation failed!\n');
  process.exit(1);
}

console.log('✅ All exports validated\n');
process.exit(0);
