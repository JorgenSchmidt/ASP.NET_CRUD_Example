using CRUD_Example.Core.Entities;
using CRUD_Example.Core.Enums;
using CRUD_Example.Core.Interfaces.Entities;
using CRUD_Example.Core.Responses;
using Microsoft.Extensions.Logging;

namespace CRUD_Example.Data.PostgreeSQL.Services
{
    public class SurveyService : ISurveyData
    {

        private readonly ILogger<SurveyService> _logger;

        public SurveyService(ILogger<SurveyService> logger)
        {
            _logger = logger;
        }

        public async Task<Response> GetAll()
        {
            try
            {
                _logger.LogInformation("(S) GetAll method: Response has been sent");
                return new GoodResponse<SurveyData>
                {
                    Body = new List<SurveyData> 
                    { 
                        new SurveyData { Id = 1, AnomalyType = "Gravity", Description = "13", Values = new List<SurveyValues> { new SurveyValues { Coord_X = 1.2, Coord_Y = 40.2, Value = 0.131 }, new SurveyValues { Coord_X = 8.3, Coord_Y = 42.1, Value = 0.171 } } } 
                    },
                    Status = ResponseStatus.Ok
                };
            }
            catch (Exception ex)
            {
                _logger.LogInformation("(E) SurveyService.GetAll method: Error has been detected: " + ex);
                return new BadResponse
                {
                    Body = await Task.Run(() => "Internal server error"),
                    Status = ResponseStatus.InternalErrorServer
                };
            }
        }

        public Task<Response> GetById(int ID)
        {
            throw new NotImplementedException();
        }

        public Task<Response> AddEntity(object Input)
        {
            throw new NotImplementedException();
        }

        public Task<Response> UpdateEntity(object Input)
        {
            throw new NotImplementedException();
        }

        public Task<Response> DeleteEntity(object Input)
        {
            throw new NotImplementedException();
        }
    }
}