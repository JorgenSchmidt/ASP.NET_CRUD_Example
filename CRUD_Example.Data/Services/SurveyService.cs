using CRUD_Example.Core.Entities;
using CRUD_Example.Core.Enums;
using CRUD_Example.Core.Interfaces.Entities;
using CRUD_Example.Core.Responses;
using CRUD_Example.DAL.NPGSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CRUD_Example.Data.PostgreeSQL.Services
{
    public class SurveyService : ISurveyData
    {
        readonly EfContext _context;

        private readonly ILogger<SurveyService> _logger;

        public SurveyService(ILogger<SurveyService> logger, EfContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<Response> GetAll()
        {
            try
            {
                _logger.LogInformation("(S): Response has been sent (GetAllMethod)");
                return new Response
                {
                    Status = ResponseStatus.Ok,
                    Body = await _context.SurveyDatas.Include(x => x.Values).ToListAsync()
                };
            }
            catch(Exception e)
            {
                _logger.LogInformation($"\n(E): Error in GetAllMethod method: {e}\n");
                return new Response
                {
                    Status = ResponseStatus.InternalServerError
                };
            }
        }

        public async Task<Response> GetById(int ID)
        {
            try
            {
                _logger.LogInformation("(S): Response has been sent(GetByIdMethod)");
                var data = _context.SurveyDatas
                        .Where(x => x.Id == ID)
                        .Include(x => x.Values);

                return new Response
                {
                    Status = ResponseStatus.Ok,
                    Body = await data.ToListAsync()
                };
            }
            catch (Exception e)
            {
                _logger.LogInformation($"\n(E): Error in GetById method: {e}\n");
                return new Response
                {
                    Status = ResponseStatus.InternalServerError
                };
            }
        }

        public async Task<Response> AddEntity(SurveyData data)
        {
            try
            {
                var dataSurvey = new SurveyData
                {
                    AnomalyType = data.AnomalyType,
                    Description = data.Description,
                    Values = data.Values
                };
                await _context.SurveyDatas.AddAsync(dataSurvey);
                await _context.SaveChangesAsync();
                _logger.LogInformation("(S): Response has been sent (AddEntity method)");
                return new Response
                {
                    Status = ResponseStatus.Ok
                };
            }
            catch (Exception e)
            {
                _logger.LogInformation($"\n(E): Error in AddEntity method: {e}\n");
                return new Response
                {
                    Status = ResponseStatus.InternalServerError
                };
            }
        }

        public Task<Response> UpdateEntity(object Input)
        {
            throw new NotImplementedException();
        }

        public Task<Response> DeleteEntity(int ID)
        {
            throw new NotImplementedException();
        }
    }
}