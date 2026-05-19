# Dungeon Runner

An "idle" dungeon crawler where it is you who does the running. Go for a run with the game's timers as a guide to level up your character and fitness to epic proportions!

## Building/Running

To build:

```bash
npm install .
npm run build
```

Then your static assets are in the `dist` directory. You may need to adjust [vite.config.ts](./vite.config.ts) and set `base` to something tha makes sense for where you're serving the app. I'm serving the app under the path `/dungeon-runner/` for my uses.

To develop:

```bash
npm install .
npm run dev
```

The terminal will tell you where to access the page; for example, [http://localhost:5173/dungeon-runner/](http://localhost:5173/dungeon-runner/).
