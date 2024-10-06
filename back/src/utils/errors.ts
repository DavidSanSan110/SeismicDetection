export default {
    // Success messages
    200: {
        PURCHASE_SAVED: 'Purchase saved successfully',
    },
    // Created messages
    201: {
    },
    // Bad request messages
    400: {
        MISSING_PARAMETERS: 'Missing parameters',
        USERNAME_ALREADY_EXISTS: 'Username already exists',
        USER_NOT_FOUND: 'User not found',
        INVALID_FILE_TYPE: 'Invalid file type',
        FILE_TOO_LARGE: 'File too large',
        INVALID_COST: 'Invalid cost',
    },
    // Unauthorized messages
    401: {
        NO_TOKEN_PROVIDED: 'No token provided',
        TOKEN_EXPIRED: 'Token expired',
        INVALID_TOKEN: 'Invalid token',
        ERROR_VERIFYING_TOKEN: 'Error verifying token',
        PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    },
    // Forbidden messages
    403: {
        UNAUTHORIZED: 'Unauthorized',
        INSUFFICIENT_CREDITS: 'Insufficient credits',
    },
    // Not found messages
    404: {
        MODEL_NOT_FOUND: 'Model not found',
        USER_NOT_FOUND: 'User not found',
    },
    // Conflict messages
    409: {
        PURCHASE_ALREADY_MADE: 'Purchase already made',
    },
    // Internal server error messages
    500: {
        ERROR_DOWNLOADING_FILE: 'Error uploading file',
        ERROR_SFPT_CLIENT_NOT_AVAILABLE: 'SFTP client not available',
        ERROR_SFPT_UPLOAD_FILE: 'Error uploading file to SFTP server',
        ERROR_POSTGRES_CLIENT_NOT_AVAILABLE: 'Postgres client not available',
        ERROR_HASHING_PASSWORD: 'Error hashing password',
        ERROR_VERIFYING_PASSWORD: 'Error verifying password',
        ERROR_INSERTING_USER: 'Error inserting user',
        ERROR_VERIFYING_USER: 'Error verifying user',
        ERROR_VERIFYING_MODEL: 'Error verifying model',
        ERROR_VERIFYING_MODEL_OWNERSHIP: 'Error verifying model ownership',
        ERROR_VERIFYING_CONVERSATION_OWNERSHIP: 'Error verifying conversation ownership',
        ERROR_INSERTING_CONVERSATION: 'Error inserting conversation',
        ERROR_INSERTING_MESSAGE: 'Error inserting message',
        ERROR_RETRIEVING_MODELS: 'Error retrieving models',
        ERROR_RETRIEVING_CONVERSATIONS: 'Error retrieving conversations',
        ERROR_RETRIEVING_MESSAGES: 'Error retrieving messages',
        ERROR_RETRIEVING_MODEL: 'Error retrieving model',
        ERROR_EXTRACTING_FORM_DATA: 'Error extracting form data',
        ERROR_UPLOADING_FILE: 'Error uploading file',
        ERROR_WRITING_FILE: 'Error writing file',
        ERROR_SAVING_LORA_CONFIG: 'Error saving Lora config',
        ERROR_SAVING_TRAINING_LOGS: 'Error saving training logs',
        ERROR_RETRIEVING_MODEL_CONFIG: 'Error retrieving model config',
        ERROR_RETRIEVING_LORA_CONFIG: 'Error retrieving Lora config',
        ERROR_RETRIEVING_TRAINING_DATA: 'Error retrieving training data',
        ERROR_RETRIEVING_EVALUATION_DATA: 'Error retrieving evaluation data',
        ERROR_RETRIEVING_COMPLETION_DATA: 'Error retrieving completion data',
        ERROR_RETRIEVING_USER: 'Error retrieving user',
        ERROR_UPDATING_USER_CREDIT: 'Error updating user credit',
        ERROR_INSERTING_PURCHASE: 'Error inserting purchase',
        ERROR_CHECKING_PURCHASE: 'Error checking purchase',
        ERROR_CHECKING_FREE_MESSAGES: 'Error checking free messages',
    },
}

export class CustomError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}
