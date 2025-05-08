import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("Request body:", req.body);
  // Perform login logic here
  if (username === "admin" && password === "password") {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
export { login };
