import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    profileImg:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    bannerImg:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFubmVyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    quote: "Hn mere title balika hai 😅",
    username: "adarshbalika",
    password: "adarshBalika123",
    portfolioURL: "",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Julie",
    lastName: "lee",
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8iaIG1J9qtnDEzyU48IhR4vXwEu8ctQgDCQ&usqp=CAU",
    bannerImg:
      "data:image/jpeg;base64,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",
    username: "julie",
    password: "123",
    portfolioURL: "",
    quote: "Opportunities don't happen, you create them.",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Jack",
    lastName: "duke",
    profileImg:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bannerImg:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29vZCUyMGJnfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    quote: "Progress not perfection",
    portfolioURL: "",
    username: "jack",
    password: "1223242",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "William",
    lastName: "Taylor",
    profileImg:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    bannerImg:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlJTIwYXQlMjB3b3JrfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    quote: "",
    portfolioURL: "",
    username: "william",
    password: "123",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];