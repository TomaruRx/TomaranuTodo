export type Todo = {
    id: string;
    name: string;
    tag?: string;
    isDone: boolean;
    priority: number;
    deadline: Date | null; // 注意
};
