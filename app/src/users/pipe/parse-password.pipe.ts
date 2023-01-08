import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// To be fair, the hashing should be implemented in the users service 
// but hey I just wanted to try writing a custom pipe 

type Password = Record<'password', string>;

@Injectable()
export class ParsePasswordPipe implements PipeTransform<Password, any> {
    async transform(passwordObject: Password, metadata: ArgumentMetadata): Promise<Password> {
        const saltRounds = 5; // adding salt to the hashed password
        const salt = await bcrypt.genSalt(saltRounds);
        passwordObject.password = await bcrypt.hash(passwordObject.password, salt);

        
        return passwordObject;
    }
}
