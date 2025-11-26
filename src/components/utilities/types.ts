import * as fs from 'fs';
import * as path from 'path';

export function exportAllTypes(directory: string): { [key: string]: any } {
	const exports: { [key: string]: any } = {};
	const files = fs.readdirSync(directory);
	files.forEach(file => {
		const filePath = path.join(directory, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			exportAllTypes(filePath); // Recursive
		} else if ( ['.ts', '.tsx'].some(ext => file.endsWith(ext)) ) {
			const filePath = path.join(directory, file);
			// const moduleName = file.slice(0, -'.js'.length);
			// exports[moduleName] = require(filePath);
			exports.push(filePath);
			/* try {
                // Use `export * from` to re-export all named exports
                console.log(`export * from "${filePath}";`); // For demonstration purposes, print the export statement
                //  Can be replaced with actual implementation in your file
            } catch (error) {
                console.error(`Error exporting from ${filePath}:`, error);
            } */
		}
	});
	// module.exports = exports
	return (exports);
}
