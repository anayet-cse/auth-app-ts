import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Request } from 'express';
import User from '../models/users';
import Auth from '../models/auth';
import ApiResponseMessage from '../utils/utils';

const SALT = 8;

class UserService {
  async createUser(req: Request) {
    const { email, password, firstName, lastName,
         nid, age, maritalStatus } = req.body;
    const profilePhoto = req.file?.path || '';

    const existingUser = await Auth.findOne({ where: { email } });
    if (existingUser) {
      return { status: 400, message: {
        message: "Already registered with this email account." 
      }};
    }

    const hashedPassword = bcrypt.hashSync(password, SALT);
    const authUser = await Auth.create({ 
      email, password: hashedPassword 
    });
    await User.create({ 
      auth_id: authUser.id, firstName, 
      lastName, nid, profilePhoto, age, maritalStatus 
    });

    return { status: 201, message: { 
      message: ApiResponseMessage.USER_CREATE 
    }};
  }


  async loginUser(req: Request) {
    const { email, password } = req.body;

    const user = await Auth.findOne({ 
      where: { 
        email 
      }
    });
    if (!user) {
      return { status: 400, data: { 
        message: 'There is no account with this email.' 
      }};
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return { status: 400, data: { 
        message: 'Invalid email or password.' 
      }};
    }
    const authToken = crypto.randomBytes(16).toString("hex");
    await Auth.update({ 
        auth_token: authToken 
    }, { 
        where: { email } 
    });
    return { status: 200, data: authToken };
  }


  async updateUser(req: Request) {
    const user = await Auth.findOne({ 
        where: { 
          auth_token: req.params.auth_token 
        }
    });
    if (!user) {
      return { status: 400, message: { 
        message: "Login First." 
      }};
    }

    await User.update(req.body, { 
      where: { 
        auth_id: user.id 
    }});
    return { status: 200, message: { 
        message: ApiResponseMessage.USER_UPDATE 
    }};
  }


  async deleteUser(req: Request) {
    const user = await Auth.findOne({ 
        where: { 
          auth_token: req.params.auth_token 
        }});
    if (!user) {
      return { status: 400, message: { 
        message: "Login First." 
      }};
    }

    await Auth.destroy({ where: { email: user.email } });
    await User.destroy({ where: { auth_id: user.id } });

    return { status: 200, message: { 
        message: "Successfully deleted your account." 
    }};
  }

  async getUser(req: Request) {
    const user = await Auth.findOne({ 
      where: { 
        auth_token: req.params.auth_token 
      }});
    if (!user) {
      return { status: 400, message: {
        message: "Login First." 
    }};
    }

    const userData = await User.findOne({ 
      where: { 
        auth_id: user.id 
      }});
    return { status: 200, data: userData };
  }
}

export default new UserService();
