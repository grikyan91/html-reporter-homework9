import supertest from 'supertest';
import urls from '../config/urls';

const Check = {
    get: async(key, mail) => {
        const r = await supertest(`${urls.apilayer}`).get(`api/check?access_key=${key}&email=${mail}`);
        return r;
    },
};

export default Check;
