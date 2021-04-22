using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Minato.Enums;

namespace Minato
{
    public class ExceptionFilter : ExceptionFilterAttribute, IExceptionFilter
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception.GetBaseException();
            if (exception.Message.Contains("A instrução DELETE conflitou com a restrição do REFERENCE"))
            {
                context.Result = new ConflictObjectResult(new { code = TipoExcecao.LigadoOutraEntidade }); 
            }
            else
            {
                context.Result = new StatusCodeResult(500);
            }
        }
    }
}
