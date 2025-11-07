import { Course } from "./course";

export class Student {
    id!: string;
    name!: string;
    surname!: string;
    courses!: Array<Course>;
}