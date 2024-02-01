import { BackendErrorInterface } from "src/app/core/backendErrors.interface";
import { User } from "../models";

// For each single feature we will create a slice of State
export interface IAuthState {
    isSubmitting: boolean;
    currentUser: User | null | undefined;
    isLoading: boolean;         //Need later we will getting of the user
    validationErrors: BackendErrorInterface | null,
    submissionType: "login" | "join"
}