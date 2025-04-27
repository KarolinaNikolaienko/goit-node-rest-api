import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import isEmptyBody from "../middleware/isEmptyBody.js";
import validateBody from "../middleware/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import auth from "../middleware/authorization.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.get("/:id", auth, getOneContact);

contactsRouter.delete("/:id", auth, deleteContact);

contactsRouter.post(
  "/",
  auth,
  isEmptyBody,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  auth,
  isEmptyBody,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  auth,
  isEmptyBody,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

export default contactsRouter;
