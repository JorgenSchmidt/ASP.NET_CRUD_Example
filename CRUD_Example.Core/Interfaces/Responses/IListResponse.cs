namespace CRUD_Example.Core.Interfaces.Responses
{
    /// <summary>
    /// Response interface with field for list, need for OK (200) status of response
    /// </summary>
    /// <typeparam name="T">Any type of target entity which must be present as list</typeparam>
    public interface IListResponse<T> 
    {
        /// <summary>
        /// Body of response
        /// </summary>
        public List<T> Body { get; set; }
    }
}