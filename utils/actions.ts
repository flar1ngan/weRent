"use server"

import { profileSchema } from "./schemas";

export const signupAction = async (prevState:unknown, formData:FormData) => {
    try {
        const data = Object.fromEntries(formData);
        const validatedData = profileSchema.parse(data);
        console.log(validatedData);
        return {message: "konts ir izveidots"};
    } catch (error) {
        console.log(error);
        return {message: "kļūda"};
    }
}