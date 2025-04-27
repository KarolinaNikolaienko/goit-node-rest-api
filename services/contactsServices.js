import Contact from "../db/models/contacts.js";
import { nanoid } from "nanoid";

export const listContacts = async () => Contact.findAll();

export const getContactById = async (contactId) => Contact.findByPk(contactId);

export const removeContact = async (contactId) =>
  Contact.destroy({
    where: {
      id: contactId,
    },
  });

export const addContact = async (body) =>
  Contact.create({ id: nanoid(), ...body });

export const changeContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  return contact.update(body, {
    returning: true,
  });
};
