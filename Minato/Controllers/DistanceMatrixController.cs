﻿using Microsoft.AspNetCore.Mvc;
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

        public DistanceMatrixController(Context context, IHttpClientFactory clientFactory)
        {
            DistanceMatrixService = new DistanceMatrixService(context, clientFactory);
        }

        [HttpGet("{cepDestino}")]
        public IActionResult Get(string cepDestino)
        {
            return Ok(DistanceMatrixService.Get(cepDestino).Result);
        }
    }
}
