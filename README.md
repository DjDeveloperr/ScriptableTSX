# ScriptableTSX

A framework for [Scriptable](https://scriptable.app) to make creating iOS widgets with JavaScript easier, also adding support for TypeScript.

## Usage

Just import `Scriptable` from `mod.ts`.

Then you can use `deno bundle -c tsconfig.json filename.tsx outfile.js` to compile it.

`tsconfig.json`
```json
{
  "compilerOptions": {
    "lib": ["ES2021"],
    "jsxFactory": "Scriptable.createElement"
  }
}
```

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
```

## TODO

- Complete the `env.d.ts` types.
- Maybe a small HTML renderer for Widgets to make development easier?

## Credits

`env.d.ts` is entirely based on https://docs.scriptable.app. Even the JS Doc comments.

## License

Licensed under [Apache 2.0](./LICENSE).

Copyright 2021 (c) DjDeveloperr
