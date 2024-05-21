import Match from '../models/match.js';
import User from '../models/user.js'; 


const cooldown = new Set();

export const createMatch = async (req, res) => {
  try {
    const { matchname, field, description, reservationdate } = req.body;

    if (!field || !description || !reservationdate || !matchname) {
      throw new Error("All input fields are required");
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    const username = user.username;
    const userphoto = user.profilePicture;

    if (cooldown.has(userId)) {
      throw new Error("You are posting too frequently. Please try again shortly.");
    }

    cooldown.add(userId);

    setTimeout(() => {
      cooldown.delete(userId);
    }, 1); 

    // Create match
    const match = await Match.create({
      
      creator: userId,
      creatorusername: username,
      creatorpic:userphoto,
      field,
      reservationdate,
      description,
      matchname
    });

    res.json(match);
  } catch (err) {
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
            ...(req.query.matchId && { _id: req.query.matchId }),
            ...(req.query.reservationdate && { reservationdate: req.query.reservationdate }),
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
    }
};

export const JoinMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return next(errorHandler(404, 'Match not found'));
    }
    
    const userId = req.user.id;
    const user = await User.findById(userId);
    const username = user.username;

    const playerIndex = match.players.findIndex(player => player.username === username);
    if (playerIndex === -1) {
      match.numberOfPlayers += 1;
      match.players.push({ username });
    } else {
      match.numberOfPlayers -= 1;
      match.players.splice(playerIndex, 1);
    }
    
    await match.save();
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};
