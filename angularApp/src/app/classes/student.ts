import { Address } from "./address";
import { Course } from "./course";

export class Student {
    id!: string;
    name!: string;
    surname!: string;
    gender!: string;
    birthDate!: string;
    email!: string | null;
    phoneNumber!: string | null;
    address!: Address;
    courses!: Array<Course>;
}