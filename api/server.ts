import * as http from "node:http";
// Using object-return syntax
export default (req: http.IncomingMessage) => {
  const obj = {
    name: "张三",
    age: 18,
  };
  return {
    body: obj,
    headers: {
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
