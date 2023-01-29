import type { User } from "firebase/auth";
import { writable } from "svelte/store";
import type { Account } from "../types/auth.types";

export const user = writable<User | null>(null);
export const token = writable<string | null>(null);
export const loading = writable<boolean>(true);
export const account = writable<Account | null>(null);