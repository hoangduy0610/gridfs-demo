export const SystemRoleEnum = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_USER: 'ROLE_USER',
} as const;

export type SystemRoleEnum = typeof SystemRoleEnum[keyof typeof SystemRoleEnum];