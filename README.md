# ScriptableTSX

A framework for [Scriptable](https://scriptable.app) to make creating iOS widgets with JavaScript easier, also adding support for TypeScript.

## Usage

Install the CLI using [Deno](https://deno.land/):

```
deno install -Arf -n scriptable https://raw.githubusercontent.com/DjDeveloperr/ScriptableTSX/main/cli.ts
```

And do `scriptable init <name>`. After this you can go in the project directory
and do `scriptable bundle`, which will output a `bundle.js` file that you can use
on Scriptable.

Note: add `--vscode` (or `-v`) flag to `scriptable init` to generate VS Code config to setup IntelliSense!

## Example

```tsx
function MyWidget() {
  return (
    <widget>
      <text 
        font={Font.headline()}
        color="#ff0000"
      >
        Hello, world!
      </text>
    </widget>
  );
}

// MyWidget() would return ListWidget now
```

## TODO

- Complete the `env.d.ts` types.
- Maybe a small HTML renderer for Widgets to make development easier?

## Credits

`env.d.ts` is entirely based on https://docs.scriptable.app. Even the JS Doc comments.

## License

Licensed under [Apache 2.0](./LICENSE).

Copyright 2021 (c) DjDeveloperr
