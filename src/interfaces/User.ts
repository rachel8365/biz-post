import Card from "./Card";

export default interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    email: string;
    password: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    city?: string;
    country?: string;
    street?: string;
    houseNumber?: number;
    zip?: number;
    role?: string;
    favCards?: number[];
}