import {Injectable, Request} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from './constants';

export interface JWTPayloadRequest extends Request {
    user: {
        id: string;
        email: string;
        name: string;
        office: string;
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {id: payload.id, email: payload.email, name: payload.name, office: payload.office}
    }
}