import { Tabs, TabsContent, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import { reviews } from "./content/all";

type ReviewType = {
  type: "patient" | "athlete" | "clinician";
  // ... other review properties
};

function ReviewsByType() {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Reviews</TabsTrigger>
        <TabsTrigger value="patient">Patients</TabsTrigger>
        <TabsTrigger value="athlete">Athletes</TabsTrigger>
        <TabsTrigger value="clinician">Clinicians</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </TabsContent>

      <TabsContent value="patient">
        {reviews
          .filter((r) => r.type === "patient")
          .map((review, index) => <ReviewCard key={index} review={review} />)}
      </TabsContent>

      <TabsContent value="athlete">
        {reviews
          .filter((r) => r.type === "athlete")
          .map((review, index) => <ReviewCard key={index} review={review} />)}
      </TabsContent>

      <TabsContent value="clinician">
        {reviews
          .filter((r) => r.type === "clinician")
          .map((review, index) => <ReviewCard key={index} review={review} />)}
      </TabsContent>
    </Tabs>
  );
}

// You'll need to create this component to display individual reviews
function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <div className="mb-4 p-4 border rounded-sm">
      {/* Add your review card content here */}
      {review.type}
    </div>
  );
}

export default ReviewsByType;
