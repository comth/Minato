using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : Controller
    {
        private readonly Context Context;
        private readonly PedidoBLL PedidoBLL;

        public PedidoController(Context context, PedidoBLL pedidoBLL)
        {
            Context = context;
            PedidoBLL = pedidoBLL;
        }

        [HttpGet("{itensPagina}/{index}")]
        public IActionResult GetAll(int itensPagina, int index)
        {
            return Ok(PedidoBLL.GetAll(Context, itensPagina, index));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Pedido pedido = PedidoBLL.Get(Context, id);

            if (pedido == null)
            {
                return NotFound();
            }

            return Ok(pedido);
        }

        [HttpGet("filtrar/{itensPagina}/{index}/{pesquisa}")]
        public IActionResult Filtrar(int itensPagina, int index, string pesquisa)
        {
            List<Pedido> lista = PedidoBLL.Filtrar(Context, itensPagina, index, pesquisa);

            return Ok(lista);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Pedido pedido)
        {
            bool salvo = PedidoBLL.Post(Context, pedido);

            if (salvo)
            {
                return Ok();
            }

            return Conflict(); //por telefone????
        }

        [HttpPut]
        public IActionResult Put([FromBody] Pedido pedido)
        {
            bool salvo = PedidoBLL.Put(Context, pedido);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool salvo = PedidoBLL.Delete(Context, id);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
