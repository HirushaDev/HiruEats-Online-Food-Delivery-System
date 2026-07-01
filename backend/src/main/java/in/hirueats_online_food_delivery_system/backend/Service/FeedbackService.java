package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.IO.FeedbackRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FeedbackResponse;

import java.util.List;

public interface FeedbackService {

    FeedbackResponse addFeedback(FeedbackRequest request);

    List<FeedbackResponse> getAllFeedbacks();

    FeedbackResponse getFeedbackById(Long id);

    FeedbackResponse updateFeedback(Long id, FeedbackRequest request);

    void deleteFeedback(Long id);
}
