/// <reference types="@cloudflare/workers-types" />

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Record<string, D1Database>;
		}
		// interface PageData {}
		interface Platform {
			env: Record<string, Fetcher | string>;
		}
	}
}

export {};
