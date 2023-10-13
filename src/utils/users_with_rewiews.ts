import { T_review, T_user } from "@/types/user.type";

export function usersWithReviews(users:T_user[],reviews: T_review[]) {

    // Create a type for the usersMap
type TUsersMap = { [userId: string]: T_user };

    // Create an object to map users by their _id
const usersMap: TUsersMap = {};
users.forEach(user => {
  usersMap[user._id] = user;
});

// Create a new array by matching users to reviews
const mergedData: (T_user & { reviews: T_review[] })[] = reviews.map(review => {
  const user = usersMap[review.userId._id];
  if (user) {
    // Create a new object that includes user properties and reviews
    return {
      ...(user as T_user),
      reviews: [review],
    };
  }
    return {
        ...(user as T_user),
        reviews: [],
  };
});

// Filter out null values from mergedData
    const usersWithReviewsFiltered: (T_user & { reviews: T_review[] })[] = mergedData.filter(
        data => data.reviews.length > 0);
    return usersWithReviewsFiltered;
}