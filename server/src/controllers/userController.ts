import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

export const userController = {
  // Get user information
  async getUserInfo(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // TODO: Replace with Telegram API call to get user info
      res.status(501).json({ 
        message: 'Not implemented: migrate to Telegram API',
        error: 'This endpoint needs to be updated to use Telegram API instead of database'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error getting user info', error });
    }
  },

  // Update user information
  async updateUserInfo(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { email, walletAddress, walletType } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // TODO: Replace with Telegram API call to update user info
      res.status(501).json({ 
        message: 'Not implemented: migrate to Telegram API',
        error: 'This endpoint needs to be updated to use Telegram API instead of database',
        updatedData: {
          email,
          walletAddress,
          walletType
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user info', error });
    }
  }
}; 