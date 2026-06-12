/**
 * Shape of the Add/Edit WHAM data set. Typing the test data means a typo or
 * missing field is caught at compile time instead of failing mid-test.
 */
export interface WhamAddEditDataShape {
    assignedUser: string;
    category: string;
    type: string;
    level: string;
    message: string;
    expirationDate: string;
    reminder: string;
    confidential: boolean;
    confidentialMessage: string;
    updatedCategory: string;
    updatedType: string;
    updatedLevel: string;
    updatedMessage: string;
    updatedExpirationDate: string;
    updatedReminder: string;
}

export const WhamAddEditData: WhamAddEditDataShape = {

    // =====================================================
    // ADD DATA
    // =====================================================

    assignedUser:
        "Admin",

    category:
        "General",

    type:
        "Reminder",

    level:
        "Normal",

    message:
        "Automation WHAM Message",

    expirationDate:
        "12/31/2026 11:59 PM",

    reminder:
        "1 Day",

    confidential:
        true,
     
    confidentialMessage:
        "Confidential WHAM Automation Message",    

    // =====================================================
    // EDIT DATA
    // =====================================================

    updatedCategory:
        "Collections",

    updatedType:
        "Information",

    updatedLevel:
        "High",

    updatedMessage:
        "Updated Automation WHAM Message",

    updatedExpirationDate:
        "01/31/2027 10:00 PM",

    updatedReminder:
        "7 Days"
};