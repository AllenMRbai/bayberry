import typescript from "@rollup/plugin-typescript";

export default function (args) {
  return [
    {
      input: "src/index.ts",
      output: {
        dir: "dist",
      },
      plugins: [
        typescript({
          declaration: true,
          outDir: "dist",
        }),
      ],
    },
  ];
}
