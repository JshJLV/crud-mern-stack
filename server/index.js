const app = require("./app");
const connectDb = require("./src/db/db");
const { PORT } = require("./src/config/config");

// conectando a base de datos
connectDb();

// iniciando app
app.listen(PORT);
console.log(`Server on port ${PORT}`);
