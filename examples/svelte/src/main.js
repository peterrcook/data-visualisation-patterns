import App from './App.svelte';
import { json } from 'd3-fetch';

json('data/data.json')
    .then(data => {
        const app = new App({
            target: document.body,
            props: {
	        data
            }
        });

    });

export default app;
