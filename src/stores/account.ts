import { writable } from 'svelte/store';
import type { CommonAccountPayloadFragment } from '/services/graphql/generated/types';

export const account = writable<CommonAccountPayloadFragment|null>(null);
