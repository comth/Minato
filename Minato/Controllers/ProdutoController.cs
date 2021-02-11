using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutoController : Controller
    {
        private readonly Context Context;
        private readonly ProdutoBLL ProdutoBLL;

        public ProdutoController(Context context)
        {
            Context = context;
            ProdutoBLL = new ProdutoBLL();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(ProdutoBLL.GetAll(Context));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Produto produto = ProdutoBLL.Get(Context, id);

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Produto produto)
        {
            bool salvo = ProdutoBLL.Post(Context, produto);

            if (salvo)
            {
                return Ok();
            }

            return Conflict();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Produto produto)
        {
            if (!ProdutoBLL.ExistsIdBanco(Context, produto.IdBanco)) return NotFound();

            bool salvo = ProdutoBLL.Put(Context, produto);

            if (salvo)
            {
                return Ok();
            }

            return Conflict();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool salvo = ProdutoBLL.Delete(Context, id);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
