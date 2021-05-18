require("dotenv-flow").config();
const Doge = require("./classes/Doge");
const client = new Doge();

(async function () {
    // client.mongoose.init();
    await client.registerClient();
    if (process.env.MODE == "dev") {
        client.login(process.env.DEV_CLIENT_TOKEN);
    } else {
        client.login(process.env.CLIENT_TOKEN);
    }
})();
