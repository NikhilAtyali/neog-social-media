import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const newPosts = [
  {
    _id: uuid(),
    content: "Finally joined hangout.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    mediaURL: {
      images: {
        imageURL: "https://media.tenor.com/Kh3ZR5hJ-AUAAAAM/dancing-so.gif",
        deleteToken: "",
      },
      video: { videoURL: "", deleteToken: "" },
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "I got myself a setup from my first salary And my parents were so happy What did you do with you first salary? 👀",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    mediaURL: {
      images: {
        imageURL:
          "https://pbs.twimg.com/media/FzuPGHBaQAABIqb?format=jpg&name=small",
        deleteToken: "",
      },
      video: { videoURL: "", deleteToken: "" },
    },
    username: "julie",
    createdAt: formatDate(),
    updatedAt: "2022-01-10T10:55:06+05:30",
  },
  {
    _id: uuid(),
    content: "bangalore these days 🍃🌥🕊💚",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    mediaURL: {
      images: {
        imageURL:
          "https://pbs.twimg.com/media/FzyvXIYakAEUcjz?format=jpg&name=small",
        deleteToken: "",
      },
      video: { videoURL: "", deleteToken: "" },
    },
    username: "julie",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "a little aurora in Southern Manitoba around midnight😊",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    mediaURL: {
      images: {
        imageURL:
          "https://images.unsplash.com/photo-1528155124528-06c125d81e89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVyb3JhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        deleteToken: "",
      },
      video: { videoURL: "", deleteToken: "" },
    },
    username: "jack",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Nature reveals the mystery of the universe to those who seek it with pure curiosity. ✨",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    mediaURL: {
      images: {
        imageURL:
          "https://pbs.twimg.com/media/Fz1kKxrakAIB9EI?format=jpg&name=900x900",
        deleteToken: "",
      },
      video: { videoURL: "", deleteToken: "" },
    },
    username: "julie",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "May your coffee be strong and your Monday be short.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    mediaURL: {
      images: {
        imageURL:
          "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8em9vbSUyMG1lZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        deleteToken: "",
      },
      video: { videoURL: "", deleteToken: "" },
    },
    username: "william",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Mood today",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    mediaURL: {
      images: {
        imageURL:
          "https://media.tenor.com/xjIYN3WkB4wAAAAM/smile-person-akirambow.gif",
        deleteToken: "",
      },
      video: { videoURL: "", deleteToken: "" },
    },
    username: "julie",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];