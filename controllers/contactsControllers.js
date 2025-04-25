import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
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
  const contact = await contactsService.getContactById(id);
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
  const contact = await contactsService.removeContact(id);
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
  const { name, email, phone } = req.body;
  const new_contact = await contactsService.addContact(name, email, phone);
  res.status(201).json(new_contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updated_contact = await contactsService.updateContact(
    id,
    name,
    email,
    phone
  );
  if (updated_contact)
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  else throw HttpError(404, `Contact with id=${id} not found`);
};
