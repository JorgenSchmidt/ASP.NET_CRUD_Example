using CRUD_Example.Core.Enums;

namespace CRUD_Example.Core.Interfaces.Responses
{
    /// <summary>
    /// Base response interface with only one field for status of request
    /// </summary>
    public interface IBaseResponse
    {
        /// <summary>
        /// Status of response
        /// </summary>
        public ResponseStatus Status { get; set; }
    }
}