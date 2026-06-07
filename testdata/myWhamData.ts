/*/ myWhamData.ts

export const WhamSearchData = {
  // ==========================================
  // VALID DATE RANGES
  // ==========================================
  reminderStartDate: "01/02/2026",
  reminderEndDate: "06/02/2026",

  expirationStartDate: "06/02/2026",
  expirationEndDate: "12/31/2026",

  createdStartDate: "06/02/2026",
  createdEndDate: "06/02/2026",

  updatedStartDate: "06/02/2026",
  updatedEndDate: "06/02/2026",

  // ==========================================
  // INVALID DATE RANGES (For Validation tests)
  // ==========================================
  invalidStartDate: "13/45/2026", 
  invalidEndDate: "00/00/0000",

  // ==========================================
  // DROPDOWN FILTERS
  // ==========================================
  category: "2",
  type: "3",
  level: "3",
  status: "1",
  invalidCategory: "999",

  // ==========================================
  // TEXT SEARCH STRINGS
  // ==========================================
  message: "test",
  partialMessage: "tes",
  uppercaseMessage: "TEST",
  specialCharacterMessage: "test!@#",
  whitespaceMessage: "   test   ",
  invalidMessage: "invalid data no records"
};

export const AddWhamData = {
  // ==========================================
  // ADD WHAM FORM DATA
  // ==========================================
  assignedUser: "32",
  level: "1",
  type: "7",
  message: "test",
  confidentialMessage: "confidential test message",
  expirationDate: "12/31/2026",
  reminder: "15",

  // ==========================================
  // EDIT WHAM FORM DATA
  // ==========================================
  updatedMessage: "updated test message",
  updatedLevel: "2",
  updatedType: "4",
  updatedExpirationDate: "11/30/2026",
  updatedReminder: "30",

  // ==========================================
  // PROPERTY SEARCH DATA
  // ==========================================
  realEstateProperty: "https://dev-qa1-cp.test.landnav.com/",
  personalProperty: "Personal Prop 001", // Adjust to match a valid personal property in your env
  invalidProperty: "HTTPS://DEV-QA1-CP.TESTDMSKMFs.LANDNAV.COM/"
};

export const WhamPropertyData = {
  // ==========================================
  // PROPERTY SEARCH DATA
  // ==========================================
  realEstateProperty: "https://dev-qa1-cp.test.landnav.com/",
  personalProperty: "Personal Prop 001", // Adjust to match a valid personal property in your env
  invalidRealEstateProperty: "HTTPS://DEV-QA1-CP.TESTDMSKMFs.LANDNAV.COM/",
  invalidPersonalProperty: "Invalid Personal Prop"
};

*/