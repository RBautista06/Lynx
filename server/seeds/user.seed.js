import { config } from "dotenv";
config();

import { dbConnection } from "../lib/db.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

const seedUsers = [
  {
    fullName: "Alice Johnson",
    username: "alicej",
    email: "alice@example.com",
    password: bcrypt.hashSync("password123", 10),
    profilePic: "https://i.pravatar.cc/150?img=1",
    bio: "Frontend developer who loves cats 🐱",
  },
  {
    fullName: "Bob Smith",
    username: "bobsmith",
    email: "bob@example.com",
    password: bcrypt.hashSync("securepass456", 10),
    profilePic: "https://i.pravatar.cc/150?img=2",
    bio: "Backend engineer and open-source enthusiast",
  },
  {
    fullName: "Charlie Lee",
    username: "charlielee",
    email: "charlie@example.com",
    password: bcrypt.hashSync("charliepass789", 10),
    profilePic: "https://i.pravatar.cc/150?img=3",
    bio: "Full-stack dev & tech blogger",
  },
  {
    fullName: "Diana King",
    username: "dianak",
    email: "diana@example.com",
    password: bcrypt.hashSync("diana456", 10),
    profilePic: "https://i.pravatar.cc/150?img=4",
    bio: "UI/UX Designer who loves minimalism.",
  },
  {
    fullName: "Ethan Wright",
    username: "ethanw",
    email: "ethan@example.com",
    password: bcrypt.hashSync("ethanpass", 10),
    profilePic: "https://i.pravatar.cc/150?img=5",
    bio: "DevOps engineer automating everything.",
  },
  {
    fullName: "Fiona Carter",
    username: "fionac",
    email: "fiona@example.com",
    password: bcrypt.hashSync("fiona123", 10),
    profilePic: "https://i.pravatar.cc/150?img=6",
    bio: "React lover and indie hacker.",
  },
  {
    fullName: "George Hall",
    username: "georgeh",
    email: "george@example.com",
    password: bcrypt.hashSync("georgepass", 10),
    profilePic: "https://i.pravatar.cc/150?img=7",
    bio: "Cloud architect with a passion for learning.",
  },
  {
    fullName: "Hannah Brooks",
    username: "hannahb",
    email: "hannah@example.com",
    password: bcrypt.hashSync("hannahpass", 10),
    profilePic: "https://i.pravatar.cc/150?img=8",
    bio: "Mobile developer & coffee addict ☕",
  },
  {
    fullName: "Isaac Rivera",
    username: "isaacr",
    email: "isaac@example.com",
    password: bcrypt.hashSync("isaacsecure", 10),
    profilePic: "https://i.pravatar.cc/150?img=9",
    bio: "Security analyst & part-time gamer.",
  },
  {
    fullName: "Julia Scott",
    username: "julias",
    email: "julia@example.com",
    password: bcrypt.hashSync("juliastrong", 10),
    profilePic: "https://i.pravatar.cc/150?img=10",
    bio: "Tech writer & documentation queen 👑",
  },
];

const seedDatabase = async () => {
  try {
    await dbConnection();
    // await User.deleteMany(); // optional: clear existing users
    await User.insertMany(seedUsers);
    console.log("✅ Database seeded successfully with 10 users");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();
