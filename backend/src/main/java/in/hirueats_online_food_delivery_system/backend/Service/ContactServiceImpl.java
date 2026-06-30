package in.hirueats_online_food_delivery_system.backend.Service;
import in.hirueats_online_food_delivery_system.backend.Entity.ContactEntity;
import in.hirueats_online_food_delivery_system.backend.Exception.ResourceNotFoundException;
import in.hirueats_online_food_delivery_system.backend.IO.ContactRequest;
import in.hirueats_online_food_delivery_system.backend.Repostory.ContactRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;


    @Override
    public ContactEntity saveContact(ContactRequest request) {
        ContactEntity entity = new ContactEntity();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setMessage(request.getMessage());
        // status defaults to "PENDING"
        return contactRepository.save(entity);
    }

    @Override
    public List<ContactEntity> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public ContactEntity getContactById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
    }

    @Override
    public ContactEntity updateStatus(Long id, String status) {
        ContactEntity entity = getContactById(id);
        entity.setStatus(status);
        return contactRepository.save(entity);
    }

    @Override
    public void deleteContact(Long id) {
        ContactEntity entity = getContactById(id);
        contactRepository.delete(entity);
    }


}
