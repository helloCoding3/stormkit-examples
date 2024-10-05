import * as http from "http";
import fetch from "node-fetch";

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const response = await fetch(
    "https://happyoriginserver.vercel.app/api/server"
  );
  // 设置响应头
  res.writeHead(
    response.status,
    Object.fromEntries(response.headers.entries())
  );

  // 将响应流转发到客户端
  response.body.pipe(res);
};
