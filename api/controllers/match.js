import Match from '../models/match.js';
import User from '../models/user.js'; // Import User model

const cooldown = new Set();

export const createMatch = async (req, res) => {
  try {
    const { matchname, field, description, reservationdate } = req.body;

    // Validate input
    if (!field || !description || !reservationdate || !matchname) {
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
    }, 1); // 10 seconds cooldown

    // Create match
    const match = await Match.create({
      
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


export const getmatchs = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const matchs = await Match.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.MatchId && { _id: req.query.matchId }),
        ...(req.query.reservationdate && { _id: req.query.reservationdate}),
        ...(req.query.searchTerm && {
          $or: [
            { description: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalMatch = await Match.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthMatch = await Match.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        matchs,
        totalMatch,
        lastMonthMatch,
      });
    } catch (error) {
      next(error);
    } };