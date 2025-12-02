export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
    error?: string
    details?: any
}

export function successResponse<T>(data?: T, message = 'success'): ApiResponse<T> {
    return {
        success: true,
        message,
        data
    }
}

export function errorResponse(message: string, status?: number, details?: any): ApiResponse {
    return {
        success: false,
        message,
        error: details instanceof Error ? details.message : details,
        details
     };
}