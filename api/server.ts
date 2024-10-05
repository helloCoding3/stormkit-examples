import * as http from "http";
import fetch from "node-fetch";

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  // 假设这是你代理转发的目标URL，这里是从请求参数中获取的
  const targetUrl = new URL(req.url || "").searchParams.get("url") || "";

  // 如果没有提供目标URL，则返回错误
  if (!targetUrl) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "No target URL provided" }));
    return;
  }

  if (req.method === "POST") {
    // 收集请求体
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    // 等待请求体接收完毕
    await new Promise((resolve) => req.on("end", resolve));
  }

  const response = await fetch(targetUrl);
  // 设置响应头
  res.writeHead(
    response.status,
    Object.fromEntries(response.headers.entries())
  );

  // 将响应流转发到客户端
  response.body.pipe(res);
};
