import * as http from 'http';
import fetch, { RequestInit } from 'node-fetch';

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log('sample log from sample-project');

  // 假设这是你代理转发的目标URL，这里是从请求参数中获取的
  const targetUrl = new URL(req.url || '').searchParams.get('url') || '';

  // 如果没有提供目标URL，则返回错误
  if (!targetUrl) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'No target URL provided' }));
    return;
  }

  // 收集请求体
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  // 等待请求体接收完毕
  await new Promise((resolve) => req.on('end', resolve));

  // 设置转发请求的选项
  const fetchOptions: RequestInit = {
    method: req.method || 'GET',
    headers: req.headers as any,
    body: body,
    redirect: 'manual', // 禁止自动重定向，因为我们想要控制响应
  };

  // 使用fetch转发请求
  try {
    const response = await fetch(targetUrl, fetchOptions);

    // 设置响应头
    res.writeHead(response.status, {
      ...response.headers.raw(),
      // 由于fetch的Headers对象与Node.js的http.OutgoingHttpHeaders不完全兼容，可能需要手动转换
    });

    // 将响应流转发到客户端
    response.body.pipe(res);
  } catch (error) {
    // 处理fetch错误
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'An error occurred during the fetch operation' }));
  }
};
