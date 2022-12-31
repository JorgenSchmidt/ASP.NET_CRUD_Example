using CRUD_Example.Core.Enums;

namespace CRUD_Example.Core.Interfaces.Responses
{
    public interface IBaseResponse
    {
        /// <summary>
        /// Status of response
        /// </summary>
        public ResponseStatus Status { get; set; }
    }
}