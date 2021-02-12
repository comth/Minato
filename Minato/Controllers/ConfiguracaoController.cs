using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfiguracaoController : Controller
    {
        private readonly Context Context;
        private readonly ConfiguracaoBLL ConfiguracaoBLL;

        public ConfiguracaoController(Context context)
        {
            Context = context;
            ConfiguracaoBLL = new ConfiguracaoBLL();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(ConfiguracaoBLL.Get(Context));
        }

        [HttpPut]
        public IActionResult Put([FromBody] Configuracao configuracao)
        {
            bool salvo = ConfiguracaoBLL.Put(Context, configuracao);

            if (salvo)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
