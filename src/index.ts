import AppModule from "./app.module";
require('dotenv').config([".env"]);

async function main() {
    const app = new AppModule();
}

main()
    .then(console.log)
    .catch(console.error);
