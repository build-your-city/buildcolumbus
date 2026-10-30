# build-your-city.org

The parent site for the Build Your City network. A single page that reuses
the shared components in `../../src/components` and the brand tokens in
`../../src/styles.css`.

- `npm run dev:byc` — dev server on port 3001
- `npm run build:byc` — production build into `dist/build-your-city/`

Netlify: a separate project on this repo with **Base directory** set to
`sites/build-your-city`, so Netlify reads the `netlify.toml` in this folder.

City copy lives in `config.ts`. To list a new city, add an entry to `cities`
there.
