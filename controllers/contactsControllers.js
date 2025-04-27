import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  changeContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact)
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  else throw HttpError(404, `Contact with id=${id} not found`);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact)
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  else throw HttpError(404, `Contact with id=${id} not found`);
};

export const createContact = async (req, res) => {
  const new_contact = await addContact(req.body);
  res.status(201).json(new_contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const updated_contact = await changeContact(id, req.body);
  if (updated_contact) {
    res.json({
      status: "success",
      code: 200,
      data: {
        updated_contact,
      },
    });
  } else throw HttpError(404, `Contact with id=${id} not found`);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updated_contact = await changeContact(id, req.body);
  if (updated_contact) {
    res.json({
      status: "success",
      code: 200,
      data: {
        updated_contact,
      },
    });
  } else throw HttpError(404, `Contact with id=${id} not found`);
};
