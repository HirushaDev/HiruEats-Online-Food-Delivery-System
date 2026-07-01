package in.hirueats_online_food_delivery_system.backend.Service;


import in.hirueats_online_food_delivery_system.backend.Entity.FeedbackEntity;
import in.hirueats_online_food_delivery_system.backend.IO.FeedbackRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FeedbackResponse;
import in.hirueats_online_food_delivery_system.backend.Repostory.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService{

     private final FeedbackRepository feedbackRepository;


    @Override
    public FeedbackResponse addFeedback(FeedbackRequest request) {
        FeedbackEntity entity = new FeedbackEntity();

        BeanUtils.copyProperties(request, entity);

        FeedbackEntity saved = feedbackRepository.save(entity);

        FeedbackResponse response = new FeedbackResponse();

        BeanUtils.copyProperties(saved, response);

        return response;
    }

    @Override
    public List<FeedbackResponse> getAllFeedbacks() {
        return feedbackRepository.findAll()
                .stream()
                .map(entity -> {
                    FeedbackResponse response = new FeedbackResponse();
                    BeanUtils.copyProperties(entity, response);
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public FeedbackResponse getFeedbackById(Long id) {
        FeedbackEntity entity = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        FeedbackResponse response = new FeedbackResponse();

        BeanUtils.copyProperties(entity, response);

        return response;
    }

    @Override
    public FeedbackResponse updateFeedback(Long id, FeedbackRequest request) {
        FeedbackEntity entity = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        entity.setCustomerName(request.getCustomerName());
        entity.setEmail(request.getEmail());
        entity.setRating(request.getRating());
        entity.setMessage(request.getMessage());

        FeedbackEntity updated = feedbackRepository.save(entity);

        FeedbackResponse response = new FeedbackResponse();

        BeanUtils.copyProperties(updated, response);

        return response;
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }


}
