import * as http from "node:http";
import fetch from "node-fetch";

// Using standard Node.js API
export default (req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log("sample log from sample-project");

  res.setHeader("Content-Type", "application/json");
  res.write(
    JSON.stringify({
      name: "张三",
      age: 18,
      source: "https://www.baidu.com",
    })
  );

  res.end();
};
