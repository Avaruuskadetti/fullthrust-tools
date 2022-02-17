# Full Thrust Fleet Tools

This is a site hosting multitude of useful tools for players of spaceship combat miniature game [Full Thrust](https://en.wikipedia.org/wiki/Full_Thrust). It is currently in early development stages and hosted for now on [fullthrust-tools.vercel.app](https://fullthrust-tools.vercel.app).

## Bug reports and feature requests

Found a bug? Want a feature? Feel free to let me know, I appreciate it! You can leave feedback in the feedback form on the site itself or add an issue to this repository.

## Contributing

Full Thrust Fleet Tools is my personal hobby project with no larger goals or schedule beyond what I fancy to do any given evening. This software is released under MIT license in case someone else wants to develop it further. All rights related to Full Thrust are retained by their copyright holders.

If you want to contribute this project, just fork this repository and create a pull request for your contribution. Short instructions for development are included below.

## Development

This site is written in Typescript with [Next.js](https://nextjs.org) seasoned with [Mantine](https://mantine.dev/) UI library and hosted on [Vercel](https://vercel.com/). It doesn't currently utilise any other backend software or databases, everything is included in the Next.js app. You can run a development version of the site locally with Node following the instructions below.

After cloning the repository install the packages and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Your development instance will be up on [http://localhost:3000](http://localhost:3000).

Warning: the code base is largely not refactored or cleaned up yet. This has been
