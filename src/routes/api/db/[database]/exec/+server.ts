import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const db = locals.db[params.database];
	if (!db) {
		throw error(404, "Database not found");
	}

	let data: any;
	try {
		data = await request.json<{ query?: string }>();
	} catch (err: any) {
		throw error(400, err.message);
	}

	const { query } = data;
	if (!query) {
		throw error(400, "Missing query");
	}

	try {
		const result = await db.exec(query);
		return json(result);
	} catch (err: any) {
		return json({
			error: {
				message: err.message,
				cause: err.cause.message,
			},
		});
	}
};
