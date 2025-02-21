const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');

const HandlebarsMiddleware = {
  setup(app) {
    // Set up handlebars view engine, register w/ express
    app.engine(
      ".hbs",
      engine({
        extname: ".hbs",
        defaultLayout: "main",
      })
    );
    app.set("view engine", ".hbs");
    app.set("views", "./src/views");
  },
};

module.exports = HandlebarsMiddleware;