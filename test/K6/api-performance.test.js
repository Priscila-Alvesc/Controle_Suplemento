import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";

import { baseUrl, performanceOptions, users } from "./config.js";
import { assertStatus, assertStatusIn, thinkTime } from "./helpers.js";

export const options = performanceOptions;

function jsonHeaders(token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function createUser() {
  const email = `priscila.alves+${__VU}-${__ITER}-${Date.now()}@email.com`;
  const payload = JSON.stringify({
    name: users.name,
    email,
    password: users.password,
  });
  const response = http.post(`${baseUrl}/api/users`, payload, {
    headers: jsonHeaders(),
    tags: { endpoint: "createUser" },
    responseCallback: http.expectedStatuses(201),
  });

  assertStatus(response, 201, "createUser");
  return email;
}

function loginUser(email) {
  const payload = JSON.stringify({
    email,
    password: users.password,
  });

  const response = http.post(`${baseUrl}/api/auth/login`, payload, {
    headers: jsonHeaders(),
    tags: { endpoint: "loginUser" },
    responseCallback: http.expectedStatuses(200),
  });

  assertStatus(response, 200, "loginUser");
  return response.json("accessToken");
}

function getAvailableDoses(token) {
  const response = http.get(`${baseUrl}/api/stock/doses`, {
    headers: jsonHeaders(token),
    tags: { endpoint: "getAvailableDoses" },
    responseCallback: http.expectedStatuses(200),
  });

  assertStatus(response, 200, "getAvailableDoses");
}

function createWithdrawal(token) {
  const payload = JSON.stringify({ quantity: 1 });
  const response = http.post(`${baseUrl}/api/withdrawals`, payload, {
    headers: jsonHeaders(token),
    tags: { endpoint: "createWithdrawal" },
    responseCallback: http.expectedStatuses(201, 409),
  });

  assertStatusIn(response, [201, 409], "createWithdrawal");
}

function getDailyWithdrawals(token) {
  const response = http.get(`${baseUrl}/api/withdrawals/daily`, {
    headers: jsonHeaders(token),
    tags: { endpoint: "getDailyWithdrawals" },
    responseCallback: http.expectedStatuses(200),
  });

  assertStatus(response, 200, "getDailyWithdrawals");
}

export default function () {
  const email = createUser();
  thinkTime();

  const token = loginUser(email);
  thinkTime();

  getAvailableDoses(token);
  thinkTime();

  createWithdrawal(token);
  thinkTime();

  getDailyWithdrawals(token);
  thinkTime();
}

export function handleSummary(summary) {
  return {
    "test-results/k6/performance-report.html": htmlReport(summary),
    stdout: textSummary(summary, { indent: " ", enableColors: true }),
  };
}
