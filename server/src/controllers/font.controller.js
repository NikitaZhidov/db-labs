import { ApiResponse } from '../api-response/api-response.js';
import userFontRepository from '../repositories/UserFontRepository.js';
import { isUndefinedOrNullOrWhiteSpace } from '../utils/string-utils.js';

class FontController {
  async createUser(req, res) {
    try {
      const { userName, fontSettings } = req.body;
      const candidate = await userFontRepository.getUserFontSettings(userName);
      if (candidate) {
        return res
          .status(400)
          .json(
            ApiResponse.BadRequest('Пользователь уже существует в системе')
          );
      }

      if (
        isUndefinedOrNullOrWhiteSpace(fontSettings) ||
        isUndefinedOrNullOrWhiteSpace(userName)
      ) {
        return res
          .status(400)
          .json(ApiResponse.BadRequest('Некорректные данные о пользователе'));
      }

      await userFontRepository.createUser(userName, fontSettings);

      return res.status(200).json(new ApiResponse(200));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userFontRepository.getAllUsers();
      return res.status(200).json(new ApiResponse(200, { users }));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getUserFontSettings(req, res) {
    try {
      const settings = await userFontRepository.getUserFontSettings(
        req.params.name
      );
      if (settings == null) {
        return res
          .status(400)
          .json(
            ApiResponse.BadRequest(
              'Не существует настроек для этого пользователя'
            )
          );
      }
      return res.status(200).json(new ApiResponse(200, settings));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async updateFontSettings(req, res) {
    try {
      const { fontSettings } = req.body;
      const userName = req.params.name;
      const candidate = await userFontRepository.getUserFontSettings(userName);
      if (!candidate) {
        return res
          .status(400)
          .json(ApiResponse.BadRequest('Пользователь не существует в системе'));
      }

      if (
        isUndefinedOrNullOrWhiteSpace(fontSettings) ||
        isUndefinedOrNullOrWhiteSpace(userName)
      ) {
        return res
          .status(400)
          .json(ApiResponse.BadRequest('Некорректные данные о пользователе'));
      }

      await userFontRepository.updateUser(userName, fontSettings);

      return res.status(200).json(new ApiResponse(200));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }
}

export default new FontController();
