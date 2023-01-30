import type { RequestHandler } from "./$types";
import { Delete } from "./Delete";
import { Get } from "./GET";
import { Post } from "./POST";


export const POST: RequestHandler = (r) => Post(r);
export const GET: RequestHandler = (r) => Get(r);
export const DELETE: RequestHandler = (r) => Delete(r);