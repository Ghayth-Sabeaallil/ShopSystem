export type AuthContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    setAuthenticated: (value: boolean) => void;
    verifyAuth: () => Promise<void>;
    userId: string;
    setUserId: (id: string) => void;
};