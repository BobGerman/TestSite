export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export const customers: Customer[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "234-567-8901"
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        phone: "345-678-9012"
    },
    {
        id: 4,
        name: "Alice Williams",
        email: "alice.williams@example.com",
        phone: "456-789-0123"
    },
    {
        id: 5,
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        phone: "567-890-1234"
    }
];