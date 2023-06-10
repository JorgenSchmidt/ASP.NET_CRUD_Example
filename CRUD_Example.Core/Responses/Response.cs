using CRUD_Example.Core.Enums;

namespace CRUD_Example.Core.Responses
{
    public class Response 
    {
        public ResponseStatus Status { get ; set ; }
        public object? Body { get ; set ; }
    }
}