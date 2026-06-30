package in.hirueats_online_food_delivery_system.backend.Service;


import in.hirueats_online_food_delivery_system.backend.Entity.ContactEntity;
import in.hirueats_online_food_delivery_system.backend.IO.ContactRequest;

import java.util.List;

public interface ContactService {

    ContactEntity saveContact(ContactRequest request);        // save from DTO

    List<ContactEntity> getAllContacts();

    ContactEntity getContactById(Long id);

    ContactEntity updateStatus(Long id, String status);

    void deleteContact(Long id);
}
