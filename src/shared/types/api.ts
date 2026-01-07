export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string; // Fallback for network-level errors
}