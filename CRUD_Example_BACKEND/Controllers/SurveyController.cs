using CRUD_Example.Core.Entities;
using CRUD_Example.Core.Interfaces.Entities;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<object> GetAll()
        {
            return await _service.GetAll();
        }

    }
}