export interface Issue {
     issueID?: number;
     userID?: number;
     bookID?: number;
     issueDate?: Date | null;
     period?: number;
     returnDate?: Date | null;
     fine?: number | null;
}