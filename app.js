const fs = require("fs");

const userName = "Habakuk";

//alert(userName); //Not accessible API

fs.writeFile("user-data.txt", "Name: " + userName, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("File is ready!");
  }
});
