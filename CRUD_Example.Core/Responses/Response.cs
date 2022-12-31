using CRUD_Example.Core.Enums;
using CRUD_Example.Core.Interfaces.Responses;

namespace CRUD_Example.Core.Responses
{
    abstract public class Response : IBaseResponse
    {
        virtual public ResponseStatus Status { get ; set ; }
    }
}
