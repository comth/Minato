using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Minato
{
    public class ExceptionFilter : ExceptionFilterAttribute, IExceptionFilter
    {
        public override void OnException(ExceptionContext context)
        {
            var error = new 
            {
                StatusCode = 500,
                Message = "Something went wrong! Internal Server Error."
            };

            context.Result = new JsonResult(error);
        }
    }
}
