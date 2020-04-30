module.exports = (api) => {
  const make = require("./make");
  const yaml = require("./yaml");
  api.registerCommand("crud:make", make.options, (args) =>
    make.service(args, api)
  );
  api.registerCommand("crud:yaml", yaml.options, (args) =>
    yaml.service(args, api)
  );
};
