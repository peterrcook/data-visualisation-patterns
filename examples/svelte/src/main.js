import App from './App.svelte';
import { json } from 'd3-fetch';

// let data = [
//   {
//     x: 100,
//     y: 100,
//     r0: 10,
//     r1: 20
//   },
//   {
//     x: 200,
//     y: 150,
//     r0: 50,
//     r1: 30
//   }
// ];

// for(let i=0; i<150; i++) {
//     data.push({
//         x: 800 * Math.random(),
//         y: 600 * Math.random(),
//         r0: 50 * Math.random(),
//         r1: 50 * Math.random()
//     });
// }

json('data/data.json')
    .then(data => {
        console.log(data);
        const app = new App({
            target: document.body,
            props: {
	        data
            }
        });

    });

export default app;
