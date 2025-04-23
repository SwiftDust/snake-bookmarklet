/* 
    A big shoutout to @lu2000luk on GitHub for sharing his code! 
    This is an automatic minifier for bookmarklet code, so you can write all the logic in Typescript and in a seperate file without having to worry about minifying.
*/
import ts from "typescript";
import { minify } from "terser";
import path from "path";

const inputFileName = 'bookmark.ts';
const inputFilePath = path.resolve(inputFileName);

async function processFile() {
    console.log(`Processing file: ${inputFilePath}`);

    try {
        const file = Bun.file(inputFilePath);
        if (!(await file.exists())) {
             console.error(`❌ Error: Input file not found at ${inputFilePath}`);
             process.exit(1);
        }
        const sourceCode = await file.text();
        console.log("✅ File read successfully.");

        console.log("⏳ Compiling TypeScript...");
        const compileResult = ts.transpileModule(sourceCode, {
            compilerOptions: {
                module: ts.ModuleKind.ESNext,
                target: ts.ScriptTarget.ESNext,
            },
            fileName: inputFilePath,
            reportDiagnostics: true,
        });

        const diagnostics = compileResult.diagnostics;
        if (diagnostics && diagnostics.length > 0) {
            console.error("❌ TypeScript Compilation Errors Found:");
            const formattedDiagnostics = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
                getCanonicalFileName: (fileName) => fileName,
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getNewLine: () => ts.sys.newLine,
            });
            console.error(formattedDiagnostics);
            process.exit(1);
        }

        console.log("✅ TypeScript compilation successful.");
        const compiledJs = compileResult.outputText;

        console.log("⏳ Minifying JavaScript...");
        const minifyResult = await minify(compiledJs, {
             sourceMap: false,
             compress: true,
             mangle: true,
             format: {
                 comments: false,
             }
        });

        if (minifyResult.code) {
            console.log("Done! Bookmark compiled and minified successfully.\n\n");
            console.log("javascript:(() => {"+minifyResult.code+"})()");
        } else {
             console.warn("⚠️ Minification completed but resulted in empty code.");
        }

    } catch (error: any) {
        console.error("\n❌ An unexpected error occurred during the process:");
         if (error instanceof Error) {
             console.error(`Error Type: ${error.name}`);
             console.error(`Message: ${error.message}`);
             if (error.stack) {
                 console.error(`Stack Trace:\n${error.stack}`);
             }
         } else {
             console.error(error);
         }
        process.exit(1);
    }
}

processFile();