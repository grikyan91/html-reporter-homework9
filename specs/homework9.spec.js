import { Check, BuildMail } from '../framework';

const { faker } = require('@faker-js/faker');

const api_key = '647ff7d6a07d83c8d33e9d267a6d1f1a';

describe('Валидируем email в mailboxlayer.com', () => {
    
    test('Проверим корректность возвращаемых данных с правильным email и access_key', async () => {
        const user = new BuildMail().addUsername().addDomainName()
            .generate();
        const mail = `${user.username}@${user.domainname}`;
    
        const response = await Check.get(api_key, mail);
        expect(response.body.email).toEqual(mail);
        expect(response.body.user).toEqual(user.username);
        expect(response.body.domain).toEqual(user.domainname);
        expect(response.body.format_valid).toEqual(true);
    });

    test.each`
        mail                               | expected
        ${'TEST@MAIL.RU'}                  | ${true}
        ${'TEST123@MAIL.RU'}               | ${true}
        ${'TEST%20Test@MAIL.RU'}           | ${true} 
        ${'TE-_~!+=ST@MAIL.RU'}            | ${true}
        ${'TEST..Kseniya@MAIL.RU'}         | ${'format_not_valid'}
        ${'test@test.'}                    | ${'format_not_valid'}
        ${'test.ru'}                       | ${'format_not_valid'}
        ${'@test.ru'}                      | ${'format_not_valid'}
        ${'test@test'}                     | ${true}
    `('$mail = $expected', async ({ mail, expected }) => {
        const response = await Check.get(api_key, mail);

        expect(response.body.format_valid || response.body.error.type).toBe(expected);
    });

    test('Проверим права доступа к точке без access_key', async () => {
        const mail =  faker.internet.email();
        const response = await Check.get('', mail);
        expect(response.body.success).toEqual(false);
        expect(response.body.error.code).toEqual(101);
        expect(response.body.error.type).toEqual('missing_access_key');
    });

});
