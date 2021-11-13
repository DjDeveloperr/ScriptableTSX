import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";

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
    console.log("init");
  })
  .command("bundle [file:string]")
  .option(
    "-o, --output <file:string>",
    "Output file. By default, current file but with .dist.js is written.",
  )
  .description("Bundle your script.")
  .action((options: { file?: string }, file?: string) => {
    console.log("bundle");
  })
  // Because of tsconfig set in IDE Deno is not defined.
  .parse((globalThis as any).Deno.args);
