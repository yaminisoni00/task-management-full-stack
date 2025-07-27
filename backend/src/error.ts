export const ERROR_TYPES = {
    USER_ALREADY_EXISTS: {
        code: 400,
        message: 'User already exists'
    },
    ENTITY_NOT_FOUND: {
        code: 404,
        message: 'Entity not found'
    },
    ENTITY_DOES_NOT_EXIST: {
        code: 404,
        message: 'Entity does not exist'
    },
    NO_USERS_FOUND: {
        code: 404,
        message: 'No users found'
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: 'Internal server error'    
    },
    USER_DOES_NOT_EXIST: {
        code: 404,
        message: 'User does not exist'
    },
    ACCESS_DENIED: {
        code: 403,
        message: 'Access denied'
    }
}