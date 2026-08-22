import { createServer } from "node:http";

const port = Number(process.env.PORT || 5000);
const users = new Map();
const trips = [
  {
    id: "trip-europe-2026",
    name: "Grand European Loop",
    destination: "Paris -> Amsterdam -> Rome",
    startDate: "2026-08-25",
    endDate: "2026-09-06",
    budget: 4200,
    status: "upcoming",
  },
];

function send(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": process.env.CLIENT_URL || "http://localhost:5173",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  let body = "";
  for await (const chunk of request) body += chunk;
  return body ? JSON.parse(body) : {};
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (request.method === "OPTIONS") return send(response, 204, {});
  if (request.method === "GET" && url.pathname === "/api/health") {
    return send(response, 200, { status: "ok", service: "globetrotter-api" });
  }

  try {
    if (request.method === "POST" && url.pathname === "/api/auth/login") {
      const { email, password } = await readBody(request);
      if (!email || !password) return send(response, 400, { message: "Email and password are required" });
      users.set(email, { email });
      return send(response, 200, { token: `demo-token-${encodeURIComponent(email)}`, user: { email } });
    }

    if (request.method === "GET" && url.pathname === "/api/trips") {
      if (!request.headers.authorization) return send(response, 401, { message: "Authentication required" });
      return send(response, 200, trips);
    }

    send(response, 404, { message: "Route not found" });
  } catch (error) {
    send(response, 400, { message: error instanceof Error ? error.message : "Invalid request" });
  }
});

server.listen(port, () => console.log(`GlobeTrotter API listening on http://localhost:${port}`));