export const baseUrl = __ENV.BASE_URL || "http://localhost:3000";

export const users = {
  name: "Priscila Alves",
  password: "123456",
};

export const performanceOptions = {
  scenarios: {
    api_workflow: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "20s", target: 5 },
        { duration: "40s", target: 10 },
        { duration: "20s", target: 0 },
      ],
      gracefulRampDown: "10s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"],
    "http_req_duration{endpoint:createUser}": ["p(95)<800"],
    "http_req_duration{endpoint:loginUser}": ["p(95)<800"],
    "http_req_duration{endpoint:getAvailableDoses}": ["p(95)<800"],
    "http_req_duration{endpoint:createWithdrawal}": ["p(95)<800"],
    "http_req_duration{endpoint:getDailyWithdrawals}": ["p(95)<800"],
  },
};
