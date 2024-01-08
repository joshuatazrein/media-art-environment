import esbuild from 'esbuild'

const MODE = process.env.MODE

const context = await esbuild.context({
  target: 'es2015',
  format: 'cjs',
  entryPoints: ['src/objects/*.ts'],
  bundle: true,
  sourcemap: false,
  treeShaking: true,
  outdir: `dist`,
  dropLabels: ['DEV'],
  minify: false,
})

if (MODE === 'production') {
  await context.rebuild()
  process.exit(0)
} else {
  await context.watch()
}
