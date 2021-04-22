using Microsoft.AspNetCore.DataProtection;
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
        private readonly IDataProtectionProvider _dataProtectionProvider;
        private readonly Context Context;
        private readonly ConfiguracaoBLL ConfiguracaoBLL;

        public ConfiguracaoController(Context context, IDataProtectionProvider dataProtectionProvider)
        {
            _dataProtectionProvider = dataProtectionProvider;
            Context = context;
            ConfiguracaoBLL = new ConfiguracaoBLL();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(ConfiguracaoBLL.Get(Context));
        }

        [HttpPut]
        public IActionResult Put([FromBody]Configuracao configuracao)
        {
            ConfiguracaoBLL.Put(Context, configuracao, _dataProtectionProvider);
            return Ok();
        }
    }
}
