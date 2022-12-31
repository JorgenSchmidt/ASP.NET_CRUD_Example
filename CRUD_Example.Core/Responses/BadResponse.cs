using CRUD_Example.Core.Enums;
using CRUD_Example.Core.Interfaces.Responses;

namespace CRUD_Example.Core.Responses
{
    public class BadResponse : Response, IStringResponse
    {
        public override ResponseStatus Status { get; set; }
        public string? Body { get; set ; }
    }
}