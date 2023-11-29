import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 1,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sunil",
          lastName: "Ballani",
          username: "sunil_ballani",
          avatarUrl:
            "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690958588/sexy-pic_tpdz49.jpg",
        },
      ],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        firstName: "Sunil",
        lastName: "Ballani",
        username: "sunil_ballani",
        avatarUrl:
          "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690958588/sexy-pic_tpdz49.jpg",
        text: "Nice pic!",
        createdAt: new Date("January 02 2023 09:09:09"),
      },
      {
        _id: uuid(),
        firstName: "Smriti",
        lastName: "Jain",
        username: "smriti_13",
        avatarUrl:
          "https://res.cloudinary.com/dp6uypw0c/image/upload/v1691255439/smriti-jain_h6m7gr.jpg",
        text: "Looking good!",
        createdAt: new Date("May 02 2023 09:09:09"),
      },
    ],
    fullName: "Adarsh Balika",
    username: "adarshbalika",
    mediaUrl:
      "https://res.cloudinary.com/dp6uypw0c/image/upload/v1687607536/samples/food/fish-vegetables.jpg",
    type: "image",
    createdAt: new Date("2023-06-05"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Hey everyone, welcome to TripTrails!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    fullName: "Sunil Ballani",
    username: "sunil_ballani",
    mediaUrl:
      "https://res.cloudinary.com/dp6uypw0c/image/upload/v1687607536/samples/food/fish-vegetables.jpg",
    type: "image",
    createdAt: new Date("2023-06-10"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Have a good time here!",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sunil",
          lastName: "Ballani",
          username: "sunil_ballani",
          avatarUrl:
            "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690958588/sexy-pic_tpdz49.jpg",
        },
        {
          _id: "5a9e29e2-b9ac-4d05-b766-4a34cb0f3279",
          firstName: "Adarsh",
          lastName: "Balika",
          username: "adarshbalika",
          avatarUrl:
            "https://res.cloudinary.com/dp6uypw0c/image/upload/v1691255323/adarsh-balika_qufkpu.jpg",
        }
      ],
      dislikedBy: [],
    },
    comments: [],
    fullName: "Smriti Jain",
    username: "smriti_13",
    mediaUrl:
      "https://res.cloudinary.com/dp6uypw0c/image/upload/v1687607536/samples/food/fish-vegetables.jpg",
    type: "image",
    createdAt: new Date("2023-06-17"),
    updatedAt: formatDate(),
  },
];
