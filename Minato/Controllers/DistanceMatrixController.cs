using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Minato.Contexts;
using Minato.Services;
using System.Net.Http;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceMatrixController : Controller
    {
        private readonly DistanceMatrixService DistanceMatrixService;

        public DistanceMatrixController(Context context, IHttpClientFactory clientFactory, IDataProtectionProvider dataProtectionProvider)
        {
            DistanceMatrixService = new DistanceMatrixService(context, clientFactory, dataProtectionProvider);
        }

        [HttpGet("{cepDestino}")]
        public IActionResult Get(string cepDestino)
        {
            var result = DistanceMatrixService.Get(cepDestino).Result;
            if (result != null) return Ok(result);
            return StatusCode(500);
        }
    }
}
