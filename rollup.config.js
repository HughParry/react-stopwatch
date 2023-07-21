import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default {
    input: "src/Stopwatch.tsx",
    output: [
        {
            dir: "dist",
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
        {
            dir: "dist",
            format: "es",
            exports: "named",
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: "tsconfig.build.json" }),
    ],
};
