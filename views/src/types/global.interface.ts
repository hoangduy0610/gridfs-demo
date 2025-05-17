import { SystemRoleEnum } from "../enums/SystemRoleEnum";

export{}
declare global {
    interface IUser {
        id: string;
        email: string;
        name: string;
        role: SystemRoleEnum;
        iat: number;
        exp: number;
    }
    
}


