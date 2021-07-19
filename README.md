# Eternal Mess

Generates an endless stream of ever-changing datamosh and algorithmic visuals in the browser

Uses [Supermosh](https://supermosh.github.io/) and some functions [also exposed here](https://supermosh.github.io/) under the hood

## Setup

1. Obligatory `npm install`
2. Upload a bunch of videos in `/in/src/.`
3. Open your browser and zoom a bit (more zoom = less quality but also faster rendering)
4. Log `window.innerWidth` and `window.innerHeight`, saves them as bash variables `WIDTH` and `HEIGHT`
5. Run `source ./resize.sh $WIDTH $HEIGHT`. That'll crop and resize your videos so that they cover (in the sense of [`object-fit: cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)) a rectangle of the dimensions of your browser. Go and grab a coffee because this might take a while.
6. Run `source ./prepare.sh $WIDTH $HEIGHT`. That'll open a bunch of browsers on different ports that'll compute movements between each frames, required for the datamosh runs that'll happen after. Call your friends and grab a beer because this will take a long time. When finished, a bunch of files should be in your downloads folder. You might want to configure your browser to automatically download files.
7. `npm run dev`. That'll open a snowpack dev server, fetch the shifts (might take 30s the first time, but on future runs that'll be cached), and run the visuals!

## Contributions / usage / forks

License is GLPv3 so it's pretty permissive. Do whatever you want with it, but I'd be glad to hear about what you're building :)

I didn't really made any efforts for this code to run on any other machine besides mine, but glad if it works on yours!
