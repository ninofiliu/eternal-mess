const fs = require("fs");
const http = require("http");
const { loadConfiguration, startServer } = require("snowpack");

const maxPara = 15;

(async () => {
  if (process.argv.length < 4) {
    console.log("Usage: node prepare.js WIDTH HEIGHT");
    return;
  }
  const [, , w, h] = process.argv;
  const names = await fs.promises.readdir("./in/src");

  let port = 8082;
  const queue = [];
  const inProgress = {};

  const start = async (name) => {
    console.log(`starting ${name}`);
    const sp = new URLSearchParams();
    sp.set("fn", "prepare");
    sp.set("w", w);
    sp.set("h", h);
    sp.set("name", name);
    const overrides = {
      devOptions: {
        port,
        openUrl: `/?${sp}`,
        open: "firefox",
      },
    };
    port++;
    const config = await loadConfiguration(overrides, "./snowpack.config.js");
    const server = await startServer({ config });
    inProgress[name] = server;
  };

  const stop = async (name) => {
    console.log(`stopping ${name}`);
    await inProgress[name].shutdown();
    delete inProgress[name];
    const newName = queue.pop();
    if (newName) {
      await start(newName);
    }
  };

  const addToQueue = async (name) => {
    console.log(`adding ${name} to queue`);
    if (Object.keys(inProgress).length < maxPara) {
      await start(name);
    } else {
      queue.push(name);
    }
  };

  const stopServer = http.createServer((req, res) => {
    const name = req.url.substring(1);
    stop(name);
    res.end(`stopped ${name}\n`);
    if (queue.length === 0 && Object.keys(inProgress).length === 0) {
      console.log("nothing processing or in the queue, exiting");
      stopServer.close();
      process.exit(0);
    }
  });

  stopServer.listen(8081, async () => {
    console.log("stop server listening on http://localhost:8081");

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      try {
        await fs.promises.stat(`./in/${w}x${h}/${name}.shifts.json`);
        console.log(`skipping ${name}`);
      } catch (e) {
        await addToQueue(name);
      }
    }

    if (queue.length === 0 && Object.keys(inProgress).length === 0) {
      console.log("nothing processing or in the queue, exiting");
      stopServer.close();
      process.exit(0);
    }
  });
})();
