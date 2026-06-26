// utils/environment.ts
// ─────────────────────────────────────────────────────────────────────────────
// Multi-environment resolver. All values come from the (gitignored) .env file —
// nothing is hardcoded here. See .env.example for the expected variables.
//
// Select the target environment with the TEST_ENV variable (qa1 | qa2 | dev).
//   - PowerShell:  $env:TEST_ENV='qa1'; npm test
//   - bash:        TEST_ENV=qa1 npm test
//
// Per environment, define <ENV>_URL / <ENV>_USERNAME / <ENV>_PASSWORD in .env,
// e.g. QA1_URL, QA1_USERNAME, QA1_PASSWORD.
//
// Optional global overrides (win over the per-env values when set):
//   APP_URL, APP_USERNAME, APP_PASSWORD.
// ─────────────────────────────────────────────────────────────────────────────
import 'dotenv/config';

/** Supported environment keys. */
export type EnvName = 'qa1' | 'qa2' | 'dev';

/** Shape of a fully-resolved environment. */
export interface ResolvedEnv {
  name: EnvName;
  url: string;
  username: string;
  password: string;
}

/** Default environment when TEST_ENV is unset. */
const DEFAULT_ENV: EnvName = 'dev';

/** Normalises and validates the TEST_ENV value. */
export function getEnvName(): EnvName {
  const raw = (process.env.TEST_ENV ?? DEFAULT_ENV).trim().toLowerCase();
  if (raw === 'qa1' || raw === 'qa2' || raw === 'dev') {
    return raw;
  }
  throw new Error(
    `Unknown TEST_ENV "${process.env.TEST_ENV}". Expected one of: qa1, qa2, dev.`,
  );
}

/** Reads a required env var, throwing a clear error when it is missing. */
function required(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing environment variable "${key}". Add it to your .env file (see .env.example).`,
    );
  }
  return value;
}

/** Resolves the active environment from .env using the precedence rules above. */
export function resolveEnv(): ResolvedEnv {
  const name = getEnvName();
  const prefix = name.toUpperCase(); // QA1 | QA2 | DEV

  return {
    name,
    url:      process.env.APP_URL      ?? required(`${prefix}_URL`),
    username: process.env.APP_USERNAME ?? required(`${prefix}_USERNAME`),
    password: process.env.APP_PASSWORD ?? required(`${prefix}_PASSWORD`),
  };
}

/** The resolved environment for the current run. */
export const environment: ResolvedEnv = resolveEnv();
