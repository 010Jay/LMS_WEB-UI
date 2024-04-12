export interface Issue {
     issueID?: number;
     userID?: number | null;
     bookID?: number | null;
     issueDate?: Date | null;
     period?: number | null;
     returnDate?: Date | null;
     fine?: number | null;
}