using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;

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

        [HttpGet("{itensPagina}/{index}")]
        public IActionResult GetAll(int itensPagina, int index)
        {
            return Ok(ProdutoBLL.GetAll(Context, itensPagina, index));
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

        [HttpGet("{itensPagina}/{index}/{pesquisa}")]
        public IActionResult Filtrar(int itensPagina, int index, string pesquisa)
        {
            List<Produto> lista = ProdutoBLL.Filtrar(Context, itensPagina, index, pesquisa);

            return Ok(lista);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Produto produto)
        {
            bool salvo = ProdutoBLL.Post(Context, produto);

            if (salvo)
            {
                return Ok();
            }

            return Conflict();
        }

        [HttpPut]
        public IActionResult Put([FromBody]Produto produto)
        {
            bool salvo = ProdutoBLL.Put(Context, produto);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
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
