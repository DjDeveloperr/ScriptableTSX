// These break intellisense rn
//// <reference lib="deno.ns" />
//// <reference lib="deno.unstable" />
//// <reference lib="deno.window" />

import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";

const GREEN = "#0DBB78";

await new Command()
  .name("scriptable")
  .version("0.0.1")
  .description("A CLI for Scriptable TSX.")
  .action(() => {
    console.log("Use with --help for a list of commands.");
  })
  .command("init [name:string]")
  .description("Initialize workspace for script.")
  .option("-v, --vscode", "Add configuration for Deno VS Code extension.")
  .action((options: { vscode?: boolean }, name?: string) => {
    if (name) {
      Deno.mkdirSync(name);
      Deno.chdir(name);
    }

    Deno.writeTextFileSync(
      "main.tsx",
      `import { Scriptable } from "scriptable";\n`,
    );

    Deno.writeTextFileSync(
      ".gitignore",
      `.vscode/\nbundle.js\nbundle.js.map\n`,
    );

    Deno.writeTextFileSync(
      "import_map.json",
      JSON.stringify(
        {
          imports: {
            scriptable:
              "https://raw.githubusercontent.com/DjDeveloperr/ScriptableTSX/main/mod.ts",
          },
        },
        null,
        2,
      ),
    );

    Deno.writeTextFileSync(
      "deno.json",
      JSON.stringify(
        {
          "compilerOptions": {
            "lib": ["ES2021"],
            "jsxFactory": "Scriptable.createElement",
          },
        },
        null,
        2,
      ),
    );

    if (options.vscode) {
      Deno.mkdirSync(".vscode");
      Deno.writeTextFileSync(
        ".vscode/settings.json",
        JSON.stringify(
          {
            "deno.enable": true,
            "deno.config": "./deno.json",
          },
          null,
          2,
        ),
      );
    }

    console.log(
      `Initialized project ${name ? name : "in current directory."}!`,
    );
    console.log(`Use %cscriptable bundle %cto compile.`, "color: " + GREEN, "");
  })
  .command("bundle [file:string]")
  .option("-m, --source-map", "Generate source map.")
  .description("Bundle your script.")
  .action(
    async (
      options: { sourceMap?: boolean },
      file?: string,
    ) => {
      file = file ?? "main.tsx";
      console.log(`%cBundle %c${file}`, "color: " + GREEN, "");
      const res = await Deno.emit(file, {
        bundle: "module",
        compilerOptions: {
          lib: ["ES2021"],
          jsxFactory: "Scriptable.createElement",
          sourceMap: options.sourceMap ?? false,
        },
        importMapPath: (await Deno.lstat("import_map.json").then(() =>
            true
          ).catch(() => false))
          ? "import_map.json"
          : undefined,
      });

      if (res.diagnostics?.length) {
        console.log(res.diagnostics);
        Deno.exit(0);
      } else {
        for (const [name, data] of Object.entries(res.files)) {
          Deno.writeTextFileSync(`${name.split("///").pop()}`, data);
        }
        console.log(
          `%cEmit %cbundle.js, took ${
            res.stats.find((e) => e[0] === "Compile time")![1]
          }ms`,
          "color: " + GREEN,
          "",
        );
      }
    },
  )
  // Because of tsconfig set in IDE Deno is not defined.
  .parse((globalThis as any).Deno.args);
