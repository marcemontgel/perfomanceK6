import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    scenarios: {
        TestCompare: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '1m', target: 10},
                // { duration: '5m', target: 500},
            ],
            gracefulRampDown: '10s'
        },
    },
}

export default function () {
    const res = http.get('https://jsonplaceholder.typicode.com/users');
    check(res, {
        'status is 200': (r) => r.status == 200,
    });
    sleep(6);
}