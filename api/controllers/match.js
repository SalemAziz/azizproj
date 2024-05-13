import Match from '../models/match.js';
import User from '../models/user.js'; // Import User model

const cooldown = new Set();

export const createMatch = async (req, res) => {
  try {
    const { matchname,fees, field, description, reservationdate } = req.body;

    // Validate input
    if (!fees || !field || !description || !reservationdate || !matchname) {
      throw new Error("All input fields are required");
    }

    const userId = req.user.id;

    // Retrieve user details
    const user = await User.findById(userId);
    const username = user.username;

    // Check cooldown
    if (cooldown.has(userId)) {
      throw new Error("You are posting too frequently. Please try again shortly.");
    }

    // Add user to cooldown set
    cooldown.add(userId);

    // Remove user from cooldown after 10 seconds
    setTimeout(() => {
      cooldown.delete(userId);
    }, 10000); // 10 seconds cooldown

    // Create match
    const match = await Match.create({
      fees,
      creator: userId,
      creatorusername: username,
      field,
      reservationdate,
      description,
      matchname
    });

    // Return match details
    res.json(match);
  } catch (err) {
    // Handle errors
    return res.status(400).json({ error: "Failed to create match", message: err.message });
  }
};


export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};