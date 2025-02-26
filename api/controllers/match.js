import Match from '../models/match.js';
import User from '../models/user.js'; 
import Field from '../models/field.js'; 


const cooldown = new Set();

export const createMatch = async (req, res) => {
  try {
    const { matchname, fieldId, description, reservationdate, dayofthweek, houroflocation } = req.body;

    if (!fieldId || !description || !matchname || !dayofthweek || !houroflocation) {
      throw new Error("All inputs are required");
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    const username = user.username;
    const userphoto = user.profilePicture;
    
    const field = await Field.findById(fieldId);
    const fieldn = field.name;

    if (cooldown.has(userId)) {
      throw new Error("You are posting too frequently. Please try again shortly.");
    }

    cooldown.add(userId);

    // Set a 60 seconds cooldown
    setTimeout(() => {
      cooldown.delete(userId);
    }, 60000); // 60 seconds cooldown

    // Create match
    const match = await Match.create({
      userId: userId,
      creatorusername: username,
      creatorpic: userphoto,
      fieldId,
      dayofthweek,
      description,
      matchname,
      houroflocation,
      reservationdate,
      fieldname: fieldn,
    });

    // Convert dayofthweek to a Date object and check if it is in the past
    const matchDate = new Date(dayofthweek);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight

    if (matchDate < today) {
      // Delete match if the date is in the past
      await Match.findByIdAndDelete(match._id);
      throw new Error("The match date is in the past. Match has been deleted.");
    }

    // Update the user's match count
    user.matchs = (user.matchs || 0) + 1;
    await user.save();

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
            ...(req.query.fieldId && { fieldId: req.query.fieldId }),
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

export const JoinMatchteam1 = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return next(errorHandler(404, 'Match not found'));
    }
    
    const userId = req.user.id;
    const user = await User.findById(userId);
    const username = user.username;
    const role = req.body.role; // Get the role from the request body

    // Check if the user is already in team2
    const isInTeam2 = match.team2.some(player => player.username === username);
    if (isInTeam2) {
      return next(errorHandler(400, 'User is already in Team 2'));
    }

    // Check if the user is already in team1
    const team1Index = match.team1.findIndex(player => player.username === username);
    if (team1Index !== -1) {
      // If the user is already in team1
      if (role) {
        // If a role is selected, update the user's role
        match.team1[team1Index].role = role;
        await match.save();
        return res.status(200).json(match);
      } else {
        // If no role is selected, remove the user from team1
        match.numberOfTeam1 -= 1;
        match.team1.splice(team1Index, 1);
        await match.save();
        return res.status(200).json(match);
      }
    }

    if (!role) {
      // If no role is selected, do nothing and return
      return res.status(200).json(match);
    }

    // Check if the team1 already has 6 players
    if (match.team1.length >= 6) {
      return next(errorHandler(400, 'Team 1 is full'));
    }

    // Add the user to team1 with the selected role
    match.numberOfPlayers += 1;
    match.team1.push({ username, role });
    await match.save();
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};



export const JoinMatchteam2 = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return next(errorHandler(404, 'Match not found'));
    }
    
    const userId = req.user.id;
    const user = await User.findById(userId);
    const username = user.username;
    const role = req.body.role; // Get the role from the request body

    // Check if the user is already in team1
    const isInTeam1 = match.team1.some(player => player.username === username);
    if (isInTeam1) {
      return next(errorHandler(400, 'User is already in Team 1'));
    }

    // Check if the user is already in team2
    const team2Index = match.team2.findIndex(player => player.username === username);
    if (team2Index !== -1) {
      // If the user is already in team2
      if (role) {
        // If a role is selected, update the user's role
        match.team2[team2Index].role = role;
        await match.save();
        return res.status(200).json(match);
      } else {
        // If no role is selected, remove the user from team2
        match.numberOfPlayers -= 1;
        match.team2.splice(team2Index, 1);
        await match.save();
        return res.status(200).json(match);
      }
    }

    if (!role) {
      // If no role is selected, do nothing and return
      return res.status(200).json(match);
    }

    // Check if the team2 already has 6 players
    if (match.team2.length >= 6) {
      return next(errorHandler(400, 'Team 2 is full'));
    }

    // Add the user to team2 with the selected role
    match.numberOfTeam2 += 1;
    match.team2.push({ username, role });
    await match.save();
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};





export const deleteMatch = async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this match'));
  }
  
  try {
    await Match.findByIdAndDelete(req.params.matchId);
    res.status(200).json({ message: 'The match has been deleted' });
  } catch (error) {
    next(error);
  }
};

export const getAvailableTimeSlots = async (req, res) => {
  const { day, fieldId } = req.query;

  try {
    const matches = await Match.find({ fieldId, dayofthweek: day });

    const occupiedSlots = matches.map(match => match.houroflocation);

    const timeSlots = [
      "07:00 AM", "08:30 AM", "10:00 AM", "11:30 AM",
      "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM",
      "07:00 PM", "08:30 PM", "10:00 PM"
    ];

    const availableTimeSlots = timeSlots.filter(slot => !occupiedSlots.includes(slot));

    res.json({ timeSlots: availableTimeSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch available time slots' });
  }
};

export const deletePlayerFromMatch = async (req, res, next) => {
  try {
    const { matchId, playerId } = req.params;
    const userId = req.user.id; // Get the authenticated user's ID

    const match = await Match.findById(matchId);
    if (!match) {
      return next(errorHandler(404, 'Match not found'));
    }

    // Check if the authenticated user is the match creator
    if (userId !== match.userId.toString()) {
      return next(errorHandler(403, 'You are not allowed to delete players from this match'));
    }

    // Check if the player is in team1
    const team1Index = match.team1.findIndex(player => player._id.toString() === playerId);
    if (team1Index !== -1) {
      match.team1.splice(team1Index, 1);
      await match.save();
      return res.status(200).json(match);
    }

    // Check if the player is in team2
    const team2Index = match.team2.findIndex(player => player._id.toString() === playerId);
    if (team2Index !== -1) {
      match.team2.splice(team2Index, 1);
      await match.save();
      return res.status(200).json(match);
    }

    // If player not found in either team
    return next(errorHandler(404, 'Player not found in the match'));
  } catch (error) {
    next(error);
  }
};
