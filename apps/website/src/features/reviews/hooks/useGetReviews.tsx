import { supabase } from "./supabase";

import {
  formatGlobalRatingsLabel,
  GLOBAL_REVIEW_AVERAGE,
  GLOBAL_REVIEW_COUNT,
} from "@/features/reviews/productReviewStats";

export async function getReviews() {
  const { data, error } = await supabase.from("reviews").select();
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
  return { number: GLOBAL_REVIEW_COUNT, average: GLOBAL_REVIEW_AVERAGE };
}
