# build-your-city.org

The parent site for the Build Your City network. A single page that reuses
the components in `../../src/components` and the brand tokens in
`../../src/styles.css`.

- `npm run dev:byc` — dev server on port 3001
- `npm run build:byc` — production build into `dist-byc/`

Deploy it as its own Netlify site with build command `npm run build:byc` and
publish directory `dist-byc`.

City-specific copy lives in `config.ts`. To list a new city, add an entry to
`cities` there.
