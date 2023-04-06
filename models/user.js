const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //não ta funcionando com o mongoose@7, tive q baixar pra mongoose@6

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true }, //speeds up the querying process of the email, unique: true
  password: { type: String, require: true, minlength: 6 },
  image: { type: String, require: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }], //the square brackets tells mongoose that can be multiple
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
