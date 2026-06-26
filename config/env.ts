// config/env.ts
// Backed by the multi-environment resolver in utils/environment.ts.
// Select the target with TEST_ENV (qa1 | qa2 | dev); see that file for details.
import { environment } from '../utils/environment';

export const env = {
  name:     environment.name,
  url:      environment.url,
  username: environment.username,
  password: environment.password,
};
