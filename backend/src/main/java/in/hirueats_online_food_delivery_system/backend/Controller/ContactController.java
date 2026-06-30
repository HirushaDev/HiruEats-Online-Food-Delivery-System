package in.hirueats_online_food_delivery_system.backend.Controller;

import in.hirueats_online_food_delivery_system.backend.Entity.ContactEntity;
import in.hirueats_online_food_delivery_system.backend.IO.ContactRequest;
import in.hirueats_online_food_delivery_system.backend.IO.StatusUpdateRequest;
import in.hirueats_online_food_delivery_system.backend.Service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hirueats/contact")
@RequiredArgsConstructor
public class ContactController {

       private final ContactService contactService;

       @PostMapping
    public ResponseEntity<ContactEntity> createContact(@Valid @RequestBody ContactRequest request) {
        ContactEntity saved = contactService.saveContact(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ContactEntity>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactEntity> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ContactEntity> updateStatus(@PathVariable Long id,@Valid @RequestBody StatusUpdateRequest statusRequest) {
        ContactEntity updated = contactService.updateStatus(id, statusRequest.getStatus());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
}
