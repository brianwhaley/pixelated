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

// Combine all component files
const allComponentFiles = [...tsFiles, ...tsxFiles];

// Analyze each component file to determine if it's client-required or server-safe
function analyzeComponentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Client-side patterns that require the component to run on client
  const clientPatterns = [
    /\buseState\b/,
    /\buseEffect\b/,
    /\buseContext\b/,
    /\bcreateContext\b/,
    /\buseCallback\b/,
    /\buseMemo\b/,
    /\buseRef\b/,
    /\buseReducer\b/,
    /\buseLayoutEffect\b/,
    /\bwindow\./,
    /\bdocument\./,
    /\blocalStorage\b/,
    /\bsessionStorage\b/,
    /\bnavigator\./,
    /\bonClick\b/,
    /\bonChange\b/,
    /\bonSubmit\b/,
    /\bonMouse\b/,
    /\bonKey\b/,
    /\bonFocus\b/,
    /\bonBlur\b/,
    /\bonInput\b/,
    /\baddEventListener\b/,
    /\bremoveEventListener\b/
  ];

  // Check if file contains any client-side patterns
  const isClientRequired = clientPatterns.some(pattern => pattern.test(content)) || content.includes("'use client'");

  return {
    filePath,
    isClientRequired,
    exportPath: filePath.replace('src/', './').replace(/\.tsx?$/, '')
  };
}

// Analyze all component files
const analyzedComponents = allComponentFiles.map(analyzeComponentFile);

// Create arrays of components for each bundle
const clientRequiredComponents = analyzedComponents.filter(comp => comp.isClientRequired);
const serverSafeComponents = analyzedComponents.filter(comp => !comp.isClientRequired);

// Read index files
const indexServer = fs.readFileSync('src/index.server.js', 'utf8');
const indexClient = fs.readFileSync('src/index.js', 'utf8');

// Helper function to extract exports from index file
function extractExports(content) {
  // Remove comments
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  content = content.replace(/\/\/.*$/gm, '');

  const exports = [];

  // Handle export * from './path' syntax
  const exportAllRegex = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = exportAllRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // Handle export { ... } from './path' syntax
  const exportRegex = /export\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g;
  while ((match = exportRegex.exec(content)) !== null) {
    const exportList = match[1];
    const exportItems = exportList.split(',').map(item => item.trim());
    exports.push(...exportItems.map(item => match[2])); // Use the from path
  }

  return exports;
}

// Extract exports from both index files
const serverExports = extractExports(indexServer);
const clientExports = extractExports(indexClient);

const missing = {
  server: [],
  client: [],
  files: [] // New: exported paths that don't correspond to existing files
};

const bundleErrors = {
  server: [], // Client-required components incorrectly in server bundle
  client: []  // Components missing from client bundle
};

// Check if exported paths correspond to existing files
function checkExportPathsExist(exports, bundleName) {
  exports.forEach(exportPath => {
    // Convert export path to file path (./components/... -> src/components/...)
    const filePathBase = exportPath.replace('./', 'src/');
    const tsFile = `${filePathBase}.ts`;
    const tsxFile = `${filePathBase}.tsx`;
    
    const tsExists = fs.existsSync(tsFile);
    const tsxExists = fs.existsSync(tsxFile);
    
    if (!tsExists && !tsxExists) {
      missing.files.push(`${bundleName}: ${exportPath} (.ts/.tsx files not found)`);
    }
  });
}

checkExportPathsExist(serverExports, 'server bundle');
checkExportPathsExist(clientExports, 'client bundle');

// Check for missing exports
serverSafeComponents.forEach(comp => {
  if (!serverExports.includes(comp.exportPath)) {
    missing.server.push(comp.exportPath);
  }
});

allComponentFiles.forEach(file => {
  const exportPath = file.replace('src/', './').replace(/\.tsx?$/, '');
  if (!clientExports.includes(exportPath)) {
    missing.client.push(exportPath);
  }
});

// Check for bundle contamination errors
clientRequiredComponents.forEach(comp => {
  if (serverExports.includes(comp.exportPath)) {
    bundleErrors.server.push(comp.exportPath);
  }
});

// Report results
console.log('📊 Analysis Results:');
console.log(`   Found ${allComponentFiles.length} component files`);
console.log(`   ${clientRequiredComponents.length} client-required components`);
console.log(`   ${serverSafeComponents.length} server-safe components\n`);

if (missing.server.length > 0) {
  console.log('❌ Missing from server bundle (index.server.js):');
  missing.server.forEach(path => console.log(`   - ${path}`));
  console.log('');
}

if (missing.client.length > 0) {
  console.log('❌ Missing from client bundle (index.js):');
  missing.client.forEach(path => console.log(`   - ${path}`));
  console.log('');
}

if (bundleErrors.server.length > 0) {
  console.log('🚨 Bundle contamination errors:');
  console.log('   Client-required components incorrectly exported from server bundle:');
  bundleErrors.server.forEach(path => console.log(`   - ${path}`));
  console.log('');
}

if (missing.files.length > 0) {
  console.log('❌ Exported paths that don\'t exist:');
  missing.files.forEach(path => console.log(`   - ${path}`));
  console.log('');
}

const hasErrors = missing.server.length > 0 || missing.client.length > 0 || bundleErrors.server.length > 0 || missing.files.length > 0;

if (hasErrors) {
  console.log('❌ Validation failed!');
  process.exit(1);
} else {
  console.log('✅ All exports validated successfully!');
}
