namespace CRUD_Example.Core.Interfaces.Responses
{
    public interface IListResponse<T> 
    {
        /// <summary>
        /// Body of response
        /// </summary>
        public List<T> Body { get; set; }
    }
}