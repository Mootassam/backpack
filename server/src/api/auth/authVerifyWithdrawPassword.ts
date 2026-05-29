import ApiResponseHandler from '../apiResponseHandler';
import Error401 from '../../errors/Error401';
import User from '../../database/models/user';

export default async (req, res, next) => {
  try {
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error401(req.language);
    }

    const { password } = req.body;

    // Read directly from DB — never trust the cached JWT payload for sensitive checks
    const user = await User(req.database).findById(req.currentUser.id).select('+withdrawPassword');

    if (!user) {
      throw new Error401(req.language);
    }

    // User has no withdrawal password configured
    if (!user.withdrawPassword) {
      return res.status(200).json({ ok: false, reason: 'no_password_set' });
    }

    // Plain string comparison — withdrawal password is never hashed
    if (user.withdrawPassword !== password) {
      return res.status(200).json({ ok: false, reason: 'wrong_password' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
