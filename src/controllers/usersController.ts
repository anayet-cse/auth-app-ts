import { Request, Response } from 'express';
import userService from '../services/usersService';
import ApiResponseMessage from '../utils/utils';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.createUser(req);
      res.status(response.status).send(response.message);
    } catch (error) {
      console.error(error);
      res.status(500).send({ 
        message: ApiResponseMessage.SYSTEM_ERROR 
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.loginUser(req);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: "Internal Server Error." 
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.updateUser(req);
      res.status(response.status).send(response.message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: "Internal Server Error." 
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.deleteUser(req);
      res.status(response.status).send(response.message);
    } catch (error) {
      console.error(error);
      res.status(500).send({ 
        message: "Internal Server Error." 
      });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.getUser(req);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ 
        message: "Internal Server Error." 
      });
    }
  }
}

export default new UserController();
