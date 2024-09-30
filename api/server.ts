import * as http from "node:http";
import fetch from "node-fetch";

// Using standard Node.js API
export default (req, res) => {
  console.log("sample log from sample-project");

  res.setHeader("Content-Type", "application/json");
  res.write(
    JSON.stringify({
      name: "张三",
      age: 18,
      height: "1.77",
    })
  );

  res.end();
};
