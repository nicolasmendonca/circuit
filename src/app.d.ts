// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { IAppService } from './lib/services/types';

// and what to do when importing types

declare global {

  declare namespace App {
    // interface Error {}
    interface Locals {
      appService: IAppService
    }
	// interface PageData {}
	// interface Platform {}
}

}
