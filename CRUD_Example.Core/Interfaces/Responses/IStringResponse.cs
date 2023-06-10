namespace CRUD_Example.Core.Interfaces.Responses
{
    /// <summary>
    /// Rsponse interface with string field, need for 400 or 500 (not OK) statuses of response
    /// </summary>
    public interface IStringResponse
    {
        /// <summary>
        /// Body of response
        /// </summary>
        public string Body { get; set; }
    }
}