export default interface Card {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    imageUrl: string;
    imageAlt: string;
    state?: string;
    city: string;
    country: string;
    street: string;
    houseNumber: number;
    zip?: number;
    userId?: string;
}