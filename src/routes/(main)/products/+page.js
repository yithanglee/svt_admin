/** @type {import('./$types').PageLoad} */
import { genInputs } from '$lib/index.js';
import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
export async function load() {
    let url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;
    let inputs = await genInputs(url, 'Product')
    // if (!inputs.some((v) => v.key === 'override_perc_max')) {
    //     inputs.push({ key: 'override_perc_max', value: 'float' });
    //     inputs.sort((a, b) => a.key.localeCompare(b.key));
    // }

    return {
        module: 'Product',
        inputs: inputs
    };
};