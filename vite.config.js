import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

// @todo à mettre pour du code à déployer en prod
// cf https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
// import legacy from '@vitejs/plugin-legacy' // il faut aussi installer terser

// pour la gestion du statique, on laisse pas mal de trucs dans docroot/, que l'on ne veut pas voir supprimés
// la pratique usuelle est de mettre ça dans un dossier {root}/public/, dont vite copie le contenu à chaque build dans {root}/docroot/
// (cf https://vitejs.dev/config/build-options.html#build-copypublicdir)
// mais le dossier annexes est >60Mo, pas très utile de recopier tout ça, on précise donc emptyOutDir: false
// cf https://vitejs.dev/guide/assets.html

const srcDir = resolve(__dirname, 'src')

export default defineConfig({
  root: __dirname,
  // ça c'est important, le mettre en relatif (./) va permettre de copier le dossier docroot n'importe où, mais ne permettra pas l'usage en cross-domain
  // pour charger un js en cross-domain, il faut préciser ici le chemin absolu où seront déployés les js (https://xxx)
  base: '/apigeom/', // https://vitejs.dev/config/shared-options.html#base
  build: {
    outDir: 'docroot/build', // https://vitejs.dev/config/build-options.html#build-outdir
    emptyOutDir: true, // https://vitejs.dev/config/build-options.html#build-emptyoutdir
    assetsDir: 'assets', // relatif au précédent, cf https://vitejs.dev/config/build-options.html#build-assetsdir
    reportCompressedSize: false, // pas besoin que vite nous donne la taille du résultat gzippé, ça prend du temps pour une info annexe, https://vitejs.dev/config/build-options.html#build-reportcompressedsize
    sourcemap: true, // https://vitejs.dev/config/build-options.html#build-sourcemap
    target: 'modules' // https://vitejs.dev/config/build-options.html#build-target
  },
  // pour avoir un js dont le nom ne change pas, que l'on peut charger en cross-domain, il faut passer par le library mode
  // cf https://vitejs.dev/guide/build.html#library-mode et https://vitejs.dev/config/build-options.html#build-lib
  lib: {
    entry: {
      main: resolve(srcDir, 'main.js')
    }
  },
  plugins: [
    splitVendorChunkPlugin() // https://vitejs.dev/guide/build.html#chunking-strategy
    // @todo décommenter quand le build ira en prod
    // legacy({ targets: ['defaults'] }) // c'est le defaults de browserlist
  ],
  publicDir: 'public', // https://vitejs.dev/config/shared-options.html#publicdir
  resolve: {
    // Attention à répercuter toutes ces modifs dans le tsconfig (paths)
    // alias: { // cf https://vitejs.dev/config/shared-options.html#resolve-alias
    //   actions: resolve(srcDir, 'actions'),
    //   dynamicNumbers: resolve(srcDir, 'dynamicNumbers'),
    //   elements: resolve(srcDir, 'elements'),
    //   transformations: resolve(srcDir, 'transformations')
    // }
  },
  rollupOptions: { // https://vitejs.dev/guide/build.html#customizing-the-build
    maxParallelFileOps: 10 // https://rollupjs.org/guide/en/#maxparallelfileops
  },
  server: {
    open: true,
    port: 8081,
    // on préfère planter si le 8081 est déjà occupé (car on doit déjà tourner à coté)
    // cf https://vitejs.dev/config/server-options.html#server-strictport
    strictPort: true
  }
})
