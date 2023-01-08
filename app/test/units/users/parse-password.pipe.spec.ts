import { ArgumentMetadata, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "../../../src/users/dto/create-user.dto";
import { ParsePasswordPipe } from "../../../src/users/pipe/parse-password.pipe";


describe('ParsePasswordPipe', () => {
    let pipe: ParsePasswordPipe;
    const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateUserDto,
        data: '',
    };

    beforeEach(() => {
        pipe = new ParsePasswordPipe();
    });

    describe('Hash password', () => {
        it('should hash the provided password properly', async () => {
            const password = 'password';
            const params = { password };
        
            const passwordObject = await pipe.transform(params, metadata);
            expect(passwordObject.password).not.toEqual(password);
        })
    })
})