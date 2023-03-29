const http = require("http");

const server = http.createServer((req, res) => {
  console.log("INCOMING REQUEST");
  console.log(req.method, req.url);

  if (req.method === "POST") {
    let body = "";

    req.on("end", () => {
      const userName = body.split("=")[1];
      //   console.log(body);
      res.end("<h1>" + userName + "</h1>");
    });

    req.on("data", (chunk) => {
      body += chunk;
    });
  } else {
    //   res.setHeader("Content-Type", "text/plain"); // this tell that what is sent back is just text
    res.setHeader("Content-Type", "text/html"); // this tell that what is sent back is html

    res.end(
      '<form method="POST"><input name="username" type="text name="username"/><button type="submit">SEND</button></form>'
    );
  }
});

server.listen(5000);

//This code show how working with node alone can be cumbersome. That's why we wanna use express.
