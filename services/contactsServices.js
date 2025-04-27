import Contact from "../db/models/contacts.js";
// import fs from "fs/promises";
// import * as path from "path";
// import * as _ from "lodash-es";
// import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

// const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => Contact.findAll();

// export async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     throw err;
//   }
// }

export const getContactById = async (contactId) => Contact.findByPk(contactId);

// export async function getContactById(contactId) {
//   const data = await listContacts();
//   return data.find((contact) => contact.id === contactId) ?? null;
// }

export const removeContact = async (contactId) =>
  Contact.destroy({
    where: {
      id: contactId,
    },
  });

// export async function removeContact(contactId) {
//   const data = await listContacts();
//   if (data) {
//     const deleted = _.remove(data, (contact) => contact.id === contactId);
//     if (deleted) {
//       fs.writeFile(contactsPath, JSON.stringify(data), function (err) {
//         if (err) throw err;
//       });
//     }
//     return deleted.length ? deleted[0] : null;
//   } else return null;
// }

export const addContact = async (body) =>
  Contact.create({ id: nanoid(), ...body });

// export async function addContact(body) {
//   const new_contact = { id: nanoid(), ...body};
//   let data = (await listContacts()) ?? [];
//   data.push(new_contact);
//   fs.writeFile(contactsPath, JSON.stringify(data), function (err) {
//     if (err) throw err;
//   });
//   return new_contact;
// }

export const changeContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  return contact.update(body, {
    returning: true,
  });
};

// export async function changeContact(contactId, body) {
//   let data = await listContacts();
//   const index = data.findIndex((contact) => contact.id === contactId);
//   if (index === -1) return null;

//   data[index] = { ...data[index], ...body };
//   fs.writeFile(contactsPath, JSON.stringify(data), function (err) {
//     if (err) throw err;
//   });

//   return data[index];
// }
