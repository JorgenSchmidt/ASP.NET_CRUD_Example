using CRUD_Example.Core.Entities;
using CRUD_Example.Core.Responses;

namespace CRUD_Example.Core.Interfaces.Entities
{
    /// <summary>
    /// Description of acceptable methods for SurveyData entity
    /// </summary>
    public interface ISurveyData
    {
        /// <summary>
        /// To get all entities. Get method.
        /// </summary>
        public Task<Response> GetAll();
        /// <summary>
        /// To get target entity for displaying in frontend. Get method.
        /// </summary>
        public Task<Response> GetById(int ID);
        /// <summary>
        /// To add entity and return execution status. Post method.
        /// </summary>
        public Task<Response> AddEntity(SurveyData data);
        /// <summary>
        /// To update entity and return execution status. Post method.
        /// </summary>
        public Task<Response> UpdateEntity(SurveyData data);
        /// <summary>
        /// To delete entity and return execution status. Post method.
        /// </summary>
        public Task<Response> DeleteEntity(int ID);
    }
}
