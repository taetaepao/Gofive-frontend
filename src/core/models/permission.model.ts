export interface Permission {
    id: string;
    roleName: string;
    canRead: boolean;
    canWrite: boolean;  
    canDelete: boolean;
}