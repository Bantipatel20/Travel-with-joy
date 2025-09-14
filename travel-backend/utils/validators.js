import { check } from "express-validator";

export const registerValidator = [
  check("name").notEmpty().withMessage("Name required"),
  check("email").isEmail().withMessage("Valid email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  check("email").isEmail().withMessage("Valid email required"),
  check("password").exists().withMessage("Password required"),
];


export const destinationValidator = [
  check("name").notEmpty().withMessage("Destination name required"),
  check("location").notEmpty().withMessage("Location required"),
  check("priceRange.min")
    .optional()
    .isNumeric()
    .withMessage("Minimum price must be a number"),
  check("priceRange.max")
    .optional()
    .isNumeric()
    .withMessage("Maximum price must be a number"),
];


export const hotelValidator = [
  check("name").notEmpty().withMessage("Hotel name required"),
  check("location").notEmpty().withMessage("Location required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
];


export const packageValidator = [
  check("name").notEmpty().withMessage("Package name required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("destinationid").notEmpty().withMessage("Destination ID required"),
];


export const bookingValidator = [
  check("packageid").notEmpty().withMessage("Package ID required"),
  check("amount").isNumeric().withMessage("Amount must be a number"),
];
