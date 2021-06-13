console.log("Module File!");

async function start() {
  return await Promise.resolve("async Working");
}

start().then(console.log);
