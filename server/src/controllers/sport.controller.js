import { ApiResponse } from '../api-response/api-response.js';
import sportRatingRepository from '../repositories/SportRatingRepository.js';
import { isUndefinedOrNullOrWhiteSpace } from '../utils/string-utils.js';

class FontController {
  async getAllJudges(req, res) {
    try {
      const judges = await sportRatingRepository.getAllJudges();
      return res.status(200).json(new ApiResponse(200, { judges }));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getAllSportsmans(req, res) {
    try {
      const sportsmans = await sportRatingRepository.getAllSportsmans();
      return res.status(200).json(new ApiResponse(200, { sportsmans }));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getAllSportsmansWithRating(req, res) {
    try {
      const sportsmans =
        await sportRatingRepository.getAllSportsmansWithRating();
      return res.status(200).json(new ApiResponse(200, { sportsmans }));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async addPointToSportsman(req, res) {
    try {
      const { judge, sportsman, points } = req.body;

      if (
        isUndefinedOrNullOrWhiteSpace(judge) ||
        isUndefinedOrNullOrWhiteSpace(sportsman) ||
        isUndefinedOrNullOrWhiteSpace(points) ||
        isNaN(points)
      ) {
        return res
          .status(400)
          .json(
            ApiResponse.BadRequest('Некорректные данные для добавления баллов')
          );
      }

      await sportRatingRepository.addPointsToSportsman(
        judge,
        sportsman,
        points
      );
      return res.status(200).json(new ApiResponse(200));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }
}

export default new FontController();
