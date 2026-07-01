package in.hirueats_online_food_delivery_system.backend.Controller;


import in.hirueats_online_food_delivery_system.backend.IO.FeedbackRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FeedbackResponse;
import in.hirueats_online_food_delivery_system.backend.Service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hirueats/feedback")
@RequiredArgsConstructor
public class FeedbackController {

     private final FeedbackService feedbackService;


     @PostMapping
    public FeedbackResponse addFeedback(@RequestBody FeedbackRequest request){
        return feedbackService.addFeedback(request);
    }

    @GetMapping
    public List<FeedbackResponse> getAllFeedbacks(){
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/{id}")
    public FeedbackResponse getFeedback(@PathVariable Long id){
        return feedbackService.getFeedbackById(id);
    }

    @PutMapping("/{id}")
    public FeedbackResponse updateFeedback(@PathVariable Long id,
                                           @RequestBody FeedbackRequest request){
        return feedbackService.updateFeedback(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable Long id){
        feedbackService.deleteFeedback(id);
        return "Feedback deleted successfully";
    }
}
