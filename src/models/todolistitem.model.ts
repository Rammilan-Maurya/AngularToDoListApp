export interface Item{
    id: string;
    name: string;
    done: boolean;
    editOn: boolean;
}

export interface ToDoListItem extends Item{
    tasks:Item[];
}