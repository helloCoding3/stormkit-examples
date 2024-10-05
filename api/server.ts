import * as http from 'http';
import { Readable } from 'stream';

export default (req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log('sample log from sample-project');

  // 获取请求头
  const headers = req.headers;

  // 用于收集请求体的数据
  let body = '';

  // 监听 'data' 事件，用于收集请求体数据
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  // 监听 'end' 事件，当请求体传输完成时触发
  req.on('end', () => {
    // 打印请求头和请求体
    console.log('Request Headers:', headers);
    console.log('Request Body:', body);

    // 设置响应头
    res.setHeader('Content-Type', 'application/json');

    // 响应客户端，包含请求头和请求体
    res.write(JSON.stringify({
      headers: headers,
      body: body
    }));

    // 结束响应
    res.end();
  });
};
