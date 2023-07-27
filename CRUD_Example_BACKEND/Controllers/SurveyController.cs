using CRUD_Example.Core.Entities;
using CRUD_Example.Core.Interfaces.Entities;
using CRUD_Example.Core.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCaching;

namespace CRUD_Example.WEB_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SurveyController
    {
        private ISurveyData _service;

        public SurveyController (ISurveyData service)
        {
            _service = service;
        }

        [HttpGet("get-all")]
        public async Task<Response> GetAll()
        {
            return await _service.GetAll();
        }

        [HttpGet("get-by-id/{ID}")]
        public async Task<Response> GetById(int ID)
        {
            return await _service.GetById(ID);
        }

        [HttpPost("add-entity")]
        public async Task<Response> AddEntity([FromBody]SurveyData data)
        {
            return await _service.AddEntity(data);
        }

        [HttpPost("update-entity")]
        public async Task<Response> UpdateEntity([FromBody]SurveyData data)
        {
            return await _service.UpdateEntity(data);
        }

        [HttpDelete("delete-entity/{ID}")]
        public async Task<Response> DeleteEntity(int ID)
        {
            return await _service.DeleteEntity(ID);
        }

    }
}