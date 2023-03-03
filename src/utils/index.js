const bcrypt = require("bcrypt");

module.exports.enCodePassword = (password) => bcrypt.hashSync(password, 8);

module.exports.checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
