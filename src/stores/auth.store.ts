import type { User } from "firebase/auth";
import { writable } from "svelte/store";

export const user = writable<User | null>(null);
export const token = writable<string | null>(null);
export const loading = writable<boolean>(true);