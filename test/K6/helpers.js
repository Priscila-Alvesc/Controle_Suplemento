import { check, sleep } from "k6";

export function thinkTime(minSeconds = 0.5, maxSeconds = 1.5) {
  const seconds = minSeconds + Math.random() * (maxSeconds - minSeconds);
  sleep(seconds);
}

export function assertStatus(response, statusCode, endpointName) {
  check(response, {
    [`${endpointName} returns ${statusCode}`]: (res) => res.status === statusCode,
  });
}

export function assertStatusIn(response, allowedStatusCodes, endpointName) {
  const allowed = new Set(allowedStatusCodes);
  check(response, {
    [`${endpointName} returns one of [${allowedStatusCodes.join(", ")}]`]: (res) =>
      allowed.has(res.status),
  });
}
