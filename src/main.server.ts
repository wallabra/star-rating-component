import '@angular/platform-server/init';
import { render } from '@analogjs/router/server';

import { App } from './app/app';
import { config } from './app/app.config.server';

// biome-ignore lint/style/noDefaultExport: main.server.ts is required to export default
export default render(App, config);
