import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "5a9e29e2-b9ac-4d05-b766-4a34cb0f3279",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    profileAvatar:
      "https://res.cloudinary.com/dp6uypw0c/image/upload/v1691255323/adarsh-balika_qufkpu.jpg",
    about:
      "Passionate traveler 🌍 | Book lover 📚 | Aspiring photographer 📷 | Living life to the fullest ✨",
    website: "https://book-bazaar-sunil.netlify.app/",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sunil",
    lastName: "Ballani",
    username: "sunil_ballani",
    password: "sunil123",
    profileAvatar:
      "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690958588/sexy-pic_tpdz49.jpg",
    about:
      "Tech enthusiast 📱💻 | Gaming aficionado 🎮🕹️ | Coffee lover ☕ | Aspiring coder 👨‍💻🌟 | Always learning 📚🌐",
    website: "https://github-finder-react-snowy.vercel.app/",
    followers: [],
    following: [
      {
        _id: "d05165bf-1238-43b9-9258-989469a4a6be",
        fullName: "Smriti Jain",
        username: "smriti_13",
        avatarUrl:
          "https://res.cloudinary.com/dp6uypw0c/image/upload/v1691255439/smriti-jain_h6m7gr.jpg",
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "d05165bf-1238-43b9-9258-989469a4a6be",
    firstName: "Smriti",
    lastName: "Jain",
    username: "smriti_13",
    password: "smriti123",
    profileAvatar:
      "https://res.cloudinary.com/dp6uypw0c/image/upload/v1691255439/smriti-jain_h6m7gr.jpg",
    about:
      "Dreamer | Explorer | Nature lover 🌿🍃 | Seeking adventures ✨ | Spreading positivity 🌞💕",
    website: "https://house-marketplace-sunil.vercel.app/",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
