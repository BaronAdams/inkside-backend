import { JWTVerifyResult } from "jose";

export type SessionPayload = {
    userId: string;
}

export type LoginErrorFields = {
    email?: string;
    password?: string;
}

export type RegistrationErrorFields = {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
}