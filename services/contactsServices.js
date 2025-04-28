import Contact from "../db/models/contacts.js";
import { nanoid } from "nanoid";

export const listContacts = async (id) =>
  Contact.findAll({ where: { owner: id } });

export const getContactById = async (contactId) => Contact.findByPk(contactId);

export const removeContact = async (contactId) => {
  const contact = await Contact.findByPk(contactId);
  contact.destroy({
    where: {
      id: contactId,
    },
  });
  return contact;
};

export const addContact = async (body, userId) =>
  Contact.create({ id: nanoid(), ...body, owner: userId });

export const changeContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  return contact.update(body, {
    returning: true,
  });
};
