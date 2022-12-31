using CRUD_Example.Core.Enums;
using CRUD_Example.Core.Interfaces.Responses;

namespace CRUD_Example.Core.Responses
{
    public class GoodResponse<T> : Response, IListResponse<T>
    {
        public override ResponseStatus Status { get; set; }
        public List<T>? Body { get; set; }
    }
}