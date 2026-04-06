export interface Group{
    id: string;
    name: string;
    invite_code: string;
    created_at: string;
}

export interface Expense{
    id: string;
    group_id: string;
    description: string;
    amount: number;
    category: string;
    paid_by: string;
    created_at: string;
}